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
 * Sleutel: deelnemer.id uit deelnemers.js.
 */
export const HANDMATIGE_CORRECTIES = {
  7: -1, // Robin Vermeulen — correctie beheerder, race 1 (Excel v3.0)
};

/**
 * Geeft de numerieke klassering terug, of null als de coureur niet
 * geklasseerd is (DSQ, DNF, DNS, ...). Jolpica/Ergast geeft ELKE
 * deelnemer een numerieke `position`; de status zit in `positionText`
 * (cijfer voor geklasseerden, of "R", "D", "E", "W", "F"). De
 * Excel-telling geeft niet-geklasseerden altijd 0 punten.
 */
function geklasseerdePositie(result) {
  const txt = result.positionText ?? result.position;
  if (!/^\d+$/.test(String(txt))) return null;
  return Number(txt);
}

/**
 * Bereken de totale pool-punten voor één deelnemer.
 * Coureurs worden gematcht op result.Driver.driverId — autonummers
 * kunnen per seizoen wisselen, driverId's niet.
 *
 * @param {Object} deelnemer - Object uit DEELNEMERS array
 * @param {Array}  races     - Jolpica race resultaten array
 * @param {Array}  kwalis    - Jolpica kwalificatie resultaten array
 * @param {Array}  sprints   - Jolpica sprint resultaten array
 * @returns {{ totaal: number, correctie: number, perRace: Array }}
 */
export function berekenPunten(deelnemer, races, kwalis, sprints) {
  const coureurIds = deelnemer.coureurs.map(c => c.driverId);
  const vindCoureur = (result) =>
    deelnemer.coureurs.find(c => c.driverId === result.Driver?.driverId);

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
      if (coureurIds.includes(result.Driver?.driverId)) {
        const pos = geklasseerdePositie(result);
        if (pos !== null) {
          racePunten += COMPETITIE_RACE_PUNTEN[pos] || 0;
        }
      }
    });

    // Kwalificatie bonus: 2 pt bij exact voorspelde positie
    const kwaliRace = kwalis.find(k => Number(k.round) === raceNr);
    kwaliRace?.QualifyingResults?.forEach(result => {
      const coureur = vindCoureur(result);
      if (coureur) {
        const actuelePos = geklasseerdePositie(result);
        if (actuelePos !== null && actuelePos === coureur.kwaliPositie) {
          kwaliPunten += KWALI_BONUS_PUNTEN;
        }
      }
    });

    // Sprint punten (8-7-6-5-4-3-2-1 voor P1-P8)
    const sprintRace = sprints.find(s => Number(s.round) === raceNr);
    sprintRace?.SprintResults?.forEach(result => {
      if (coureurIds.includes(result.Driver?.driverId)) {
        const pos = geklasseerdePositie(result);
        if (pos !== null) {
          sprintPunten += COMPETITIE_SPRINT_PUNTEN[pos] || 0;
        }
      }
    });

    // Sprint-kwalificatie bonus: 1 pt bij exact dezelfde voorspelde
    // positie als voor de GP-kwalificatie (handmatige data per circuit)
    const sprintKwaliResults = SPRINT_KWALI_UITSLAGEN[race.Circuit?.circuitId];
    sprintKwaliResults?.forEach(result => {
      const coureur = deelnemer.coureurs.find(c => c.driverId === result.driverId);
      if (coureur && result.position === coureur.kwaliPositie) {
        sprintKwaliPunten += SPRINT_KWALI_BONUS_PUNTEN;
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
 * de Excel).
 */
export function berekenPoolStand(deelnemers, races, kwalis, sprints) {
  const gesorteerd = deelnemers
    .map(d => ({
      ...d,
      ...berekenPunten(d, races, kwalis, sprints),
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
  scenarioRaces
) {
  const alleRaces = [...bestaandeRaces, ...scenarioRaces];
  return berekenPoolStand(deelnemers, alleRaces, bestaandeKwalis, bestaandeSprints);
}
