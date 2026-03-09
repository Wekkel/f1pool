// src/logic/puntenberekening.js
import {
  COMPETITIE_RACE_PUNTEN,
  COMPETITIE_SPRINT_PUNTEN,
  KWALI_BONUS_PUNTEN,
} from "../data/puntensysteem";

/**
 * Bereken de totale pool-punten voor één deelnemer.
 *
 * @param {Object} deelnemer - Object uit DEELNEMERS array
 * @param {Array}  races     - Jolpica race resultaten array
 * @param {Array}  kwalis    - Jolpica kwalificatie resultaten array
 * @param {Array}  sprints   - Jolpica sprint resultaten array
 * @returns {{ totaal: number, perRace: Array }}
 */
export function berekenPunten(deelnemer, races, kwalis, sprints) {
  const coureurNummers = deelnemer.coureurs.map(c => String(c.nr));
  const perRace = [];
  let totaal = 0;
  let cumulatief = 0;

  races.forEach(race => {
    const raceNr = Number(race.round);
    let racePunten = 0;
    let kwaliPunten = 0;
    let sprintPunten = 0;

    // Race punten
    race.Results?.forEach(result => {
      if (coureurNummers.includes(result.number)) {
        const pos = Number(result.position);
        racePunten += COMPETITIE_RACE_PUNTEN[pos] || 0;
      }
    });

    // Kwalificatie bonus
    const kwaliRace = kwalis.find(k => Number(k.round) === raceNr);
    if (kwaliRace) {
      kwaliRace.QualifyingResults?.forEach(result => {
        if (coureurNummers.includes(result.number)) {
          const actuelePos = Number(result.position);
          const coureur = deelnemer.coureurs.find(c => String(c.nr) === result.number);
          if (coureur && actuelePos === coureur.kwaliPositie) {
            kwaliPunten += KWALI_BONUS_PUNTEN;
          }
        }
      });
    }

    // Sprint punten
    const sprintRace = sprints.find(s => Number(s.round) === raceNr);
    if (sprintRace) {
      sprintRace.SprintResults?.forEach(result => {
        if (coureurNummers.includes(result.number)) {
          const pos = Number(result.position);
          sprintPunten += COMPETITIE_SPRINT_PUNTEN[pos] || 0;
        }
      });
    }

    const totaalRace = racePunten + kwaliPunten + sprintPunten;
    totaal += totaalRace;
    cumulatief += totaalRace;

    perRace.push({
      raceNr,
      raceCode: race.Circuit?.circuitId || "",
      racenaam: race.raceName || "",
      racePunten,
      kwaliPunten,
      sprintPunten,
      totaalRace,
      cumulatief,
    });
  });

  return { totaal, perRace };
}

/**
 * Bereken de stand van alle deelnemers, gesorteerd op punten.
 */
export function berekenPoolStand(deelnemers, races, kwalis, sprints) {
  return deelnemers
    .map(d => ({
      ...d,
      ...berekenPunten(d, races, kwalis, sprints),
    }))
    .sort((a, b) => b.totaal - a.totaal)
    .map((d, i) => ({ ...d, positie: i + 1 }));
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
