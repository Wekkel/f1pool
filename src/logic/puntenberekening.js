// src/logic/puntenberekening.js
import {
  COMPETITIE_RACE_PUNTEN,
  COMPETITIE_SPRINT_PUNTEN,
  KWALI_BONUS_PUNTEN,
  SPRINT_KWALI_BONUS_PUNTEN,
} from "../data/puntensysteem";

import { SPRINT_KWALI_UITSLAGEN } from "../data/sprintKwaliUitslagen";

/**
 * Handmatige correcties conform het officiële Excel-bestand.
 * Sleutel: deelnemer.id (pas aan naar jouw DEELNEMERS-structuur).
 * Robin Vermeulen: -1 punt (correctie beheerder, race 1, v3.0 Excel).
 */
export const HANDMATIGE_CORRECTIES = {
  7: -1, // Robin Vermeulen — correctie beheerder, race 1
};

/**
 * Geeft de numerieke klassering terug, of null als de coureur niet
 * geklasseerd is (DSQ, DNF, DNS, ...).
 *
 * Jolpica/Ergast geeft ELKE deelnemer een numerieke `position`
 * (volgorde in de classificatie), ook uitvallers en gediskwalificeerden.
 * De status zit in `positionText`: een cijfer voor geklasseerden,
 * of "R" (retired), "D" (disqualified), "E", "W", "F".
 * De Excel-telling geeft D/NC/NS altijd 0 punten, dus alleen een
 * zuiver numerieke positionText telt mee.
 */
function geklasseerdePositie(result) {
  const txt = result.positionText ?? result.position;
  if (!/^\d+$/.test(String(txt))) return null;
  return Number(txt);
}

/**
 * Bereken de totale pool-punten voor één deelnemer.
 *
 * @param {Object} deelnemer    - Object uit DEELNEMERS array
 * @param {Array}  races        - Jolpica race resultaten array
 * @param {Array}  kwalis       - Jolpica kwalificatie resultaten array
 * @param {Array}  sprints      - Jolpica sprint resultaten array
 * @param {Array}  sprintKwalis - Sprint-kwalificatie uitslagen array
 *                                (zelfde vorm als kwalis: [{ round,
 *                                SprintKwaliResults: [{ number, position }] }]).
 *                                Niet beschikbaar via Jolpica/Ergast;
 *                                aanleveren via OpenF1 of eigen databestand.
 * @returns {{ totaal: number, perRace: Array }}
 */
export function berekenPunten(deelnemer, races, kwalis, sprints, sprintKwalis = []) {
  const coureurNummers = deelnemer.coureurs.map(c => String(c.nr));
  const perRace = [];
  let totaal = 0;
  let cumulatief = 0;

  races.forEach(race => {
    const raceNr = Number(race.round);
    let racePunten = 0;
    let kwaliPunten = 0;
    let sprintPunten = 0;
    let sprintKwaliPunten = 0;

    // Race punten (competitietabel 12-10-8-7-6-5-4-3-2-1)
    race.Results?.forEach(result => {
      if (coureurNummers.includes(result.number)) {
        const pos = geklasseerdePositie(result);
        if (pos !== null) {
          racePunten += COMPETITIE_RACE_PUNTEN[pos] || 0;
        }
      }
    });

    // Kwalificatie bonus: 2 pt bij exact voorspelde positie
    const kwaliRace = kwalis.find(k => Number(k.round) === raceNr);
    kwaliRace?.QualifyingResults?.forEach(result => {
      if (coureurNummers.includes(result.number)) {
        const actuelePos = geklasseerdePositie(result);
        const coureur = deelnemer.coureurs.find(c => String(c.nr) === result.number);
        if (coureur && actuelePos !== null && actuelePos === coureur.kwaliPositie) {
          kwaliPunten += KWALI_BONUS_PUNTEN;
        }
      }
    });

    // Sprint punten (8-7-6-5-4-3-2-1 voor P1-P8)
    const sprintRace = sprints.find(s => Number(s.round) === raceNr);
    sprintRace?.SprintResults?.forEach(result => {
      if (coureurNummers.includes(result.number)) {
        const pos = geklasseerdePositie(result);
        if (pos !== null) {
          sprintPunten += COMPETITIE_SPRINT_PUNTEN[pos] || 0;
        }
      }
    });

   // Sprint-kwalificatie bonus: 1 pt bij exact dezelfde voorspelde
    // positie als voor de GP-kwalificatie
    const sprintKwaliResults = SPRINT_KWALI_UITSLAGEN[race.Circuit?.circuitId];
    sprintKwaliResults?.forEach(result => {
      if (coureurNummers.includes(String(result.number))) {
        const actuelePos = geklasseerdePositie(result);
        const coureur = deelnemer.coureurs.find(c => String(c.nr) === String(result.number));
        if (coureur && actuelePos !== null && actuelePos === coureur.kwaliPositie) {
          sprintKwaliPunten += SPRINT_KWALI_BONUS_PUNTEN;
        }
      }
    });

    const totaalRace = racePunten + kwaliPunten + sprintPunten + sprintKwaliPunten;
    totaal += totaalRace;
    cumulatief += totaalRace;

    perRace.push({
      raceNr,
      raceCode: race.Circuit?.circuitId || "",
      racenaam: race.raceName || "",
      racePunten,
      kwaliPunten,
      sprintPunten,
      sprintKwaliPunten,
      totaalRace,
      cumulatief,
    });
  });

  // Handmatige correcties (bijv. Robin Vermeulen -1)
  const correctie = HANDMATIGE_CORRECTIES[deelnemer.id] || 0;
  totaal += correctie;

  return { totaal, correctie, perRace };
}

/**
 * Bereken de stand van alle deelnemers, gesorteerd op punten.
 * Plaatsen worden gedeeld bij gelijke punten (RANK-gedrag, zoals in
 * de Excel): twee spelers met evenveel punten delen dezelfde plaats
 * en de eerstvolgende plaats wordt overgeslagen.
 */
export function berekenPoolStand(deelnemers, races, kwalis, sprints, sprintKwalis = []) {
  const gesorteerd = deelnemers
    .map(d => ({
      ...d,
      ...berekenPunten(d, races, kwalis, sprints, sprintKwalis),
    }))
    .sort((a, b) => b.totaal - a.totaal);

  let vorigePunten = null;
  let vorigePositie = 0;
  return gesorteerd.map((d, i) => {
    const positie = d.totaal === vorigePunten ? vorigePositie : i + 1;
    vorigePunten = d.totaal;
    vorigePositie = positie;
    return { ...d, positie };
  });
}

/**
 * Scenario: bereken stand inclusief hypothetische toekomstige races.
 */
export function berekenScenario(
  deelnemers,
  bestaandeRaces,
  bestaandeKwalis,
  bestaandeSprints,
  scenarioRaces,
  sprintKwalis = []
) {
  const alleRaces = [...bestaandeRaces, ...scenarioRaces];
  return berekenPoolStand(deelnemers, alleRaces, bestaandeKwalis, bestaandeSprints, sprintKwalis);
}
