// src/components/Scenario/ScenarioSimulator.jsx
import { useState, useMemo } from "react";
import { berekenScenario } from "../../logic/puntenberekening";
import { DEELNEMERS } from "../../data/deelnemers";
import { GEPLANDE_RACES } from "../../data/kalender";

// Alle unieke coureurs uit de pool, op driverId
const ALLE_COUREURS = Array.from(
  new Map(
    DEELNEMERS.flatMap(d => d.coureurs).map(c => [c.driverId, c])
  ).values()
).sort((a, b) => a.naam.localeCompare(b.naam));

function buildScenarioRace(kalenderNr, topTien) {
  // topTien = array van driverId's (positie 1 t/m 10).
  // Rondenummer 900+ voorkomt botsingen met echte API-rondes: anders
  // zouden kwali/sprint-uitslagen van een bestaande ronde per ongeluk
  // óók aan de scenario-race worden toegerekend.
  return {
    round: String(900 + kalenderNr),
    raceName: `Scenario Race ${kalenderNr}`,
    Circuit: { circuitId: "scenario" },
    Results: topTien.map((driverId, i) => ({
      position: String(i + 1),
      positionText: String(i + 1),
      Driver: { driverId },
    })),
  };
}

export default function ScenarioSimulator({ races, kwalis, sprints }) {
  const vandaag = new Date();
  const toekomstigeRaces = GEPLANDE_RACES.filter(r => new Date(r.datum) >= vandaag);

  const [geselecteerdeRace, setGeselecteerdeRace] = useState(null);
  const effectieveRace = geselecteerdeRace ?? toekomstigeRaces[0]?.nr ?? null;
  const [topTien, setTopTien] = useState(Array(10).fill(""));

  const scenarioStand = useMemo(() => {
    const gevuld = topTien.filter(Boolean);
    if (gevuld.length < 3) return null;

    const scenarioRace = buildScenarioRace(effectieveRace, gevuld);
    return berekenScenario(DEELNEMERS, races, kwalis, sprints, [scenarioRace]);
  }, [topTien, effectieveRace, races, kwalis, sprints]);

  const huidigeStand = useMemo(
    () => berekenScenario(DEELNEMERS, races, kwalis, sprints, []),
    [races, kwalis, sprints]
  );

  if (toekomstigeRaces.length === 0) {
    return <p className="text-gray-400">Alle races zijn gereden. Geen scenario mogelijk.</p>;
  }

  return (
    <div className="space-y-6">
      {/* Race selectie */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Selecteer een toekomstige race</label>
        <select
          value={effectieveRace || ""}
          onChange={e => setGeselecteerdeRace(Number(e.target.value))}
          className="bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-f1red"
        >
          {toekomstigeRaces.map(r => (
            <option key={r.nr} value={r.nr}>{r.naam}{r.sprint ? " (sprint)" : ""} — {new Date(r.datum).toLocaleDateString("nl-NL")}</option>
          ))}
        </select>
      </div>

      {/* Top 10 invullen */}
      <div>
        <p className="text-sm font-medium text-gray-300 mb-3">Stel de race-uitslag in (top 10)</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-gray-400 text-sm font-bold w-8 text-right shrink-0">P{i + 1}</span>
              <select
                value={topTien[i] || ""}
                onChange={e => {
                  const nieuw = [...topTien];
                  nieuw[i] = e.target.value;
                  setTopTien(nieuw);
                }}
                className="flex-1 bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-f1red"
              >
                <option value="">— selecteer coureur —</option>
                {ALLE_COUREURS
                  .filter(c => !topTien.includes(c.driverId) || topTien[i] === c.driverId)
                  .map(c => (
                    <option key={c.driverId} value={c.driverId}>#{c.nr} {c.naam}</option>
                  ))}
              </select>
            </div>
          ))}
        </div>
        <p className="text-gray-500 text-xs mt-3">Vul minimaal 3 posities in voor een berekening.</p>
      </div>

      {/* Resultaat */}
      {scenarioStand && (
        <div>
          <h3 className="font-heading font-semibold text-white mb-3">Scenario stand</h3>
          <div className="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700 bg-gray-800/80">
                  <th className="px-4 py-2 text-center text-xs text-gray-400 uppercase w-10">#</th>
                  <th className="px-4 py-2 text-left text-xs text-gray-400 uppercase">Deelnemer</th>
                  <th className="px-4 py-2 text-center text-xs text-gray-400 uppercase">Punten</th>
                  <th className="px-4 py-2 text-center text-xs text-gray-400 uppercase">+/−</th>
                </tr>
              </thead>
              <tbody>
                {scenarioStand.map((d, i) => {
                  const huidig = huidigeStand.find(h => h.id === d.id);
                  const delta = d.totaal - (huidig?.totaal || 0);
                  return (
                    <tr key={d.id} className={`${i % 2 === 1 ? "bg-gray-800/40" : ""} border-b border-gray-800`}>
                      <td className="px-4 py-2 text-center text-gray-400 font-bold">{d.positie}</td>
                      <td className="px-4 py-2">
                        <div className="text-white font-medium text-xs">{d.teamnaam}</div>
                        <div className="text-gray-500 text-xs">{d.deelnemer}</div>
                      </td>
                      <td className="px-4 py-2 text-center font-bold text-white">{d.totaal}</td>
                      <td className="px-4 py-2 text-center">
                        <span className={`text-xs font-medium ${delta > 0 ? "text-green-400" : delta < 0 ? "text-red-400" : "text-gray-500"}`}>
                          {delta > 0 ? `+${delta}` : delta === 0 ? "—" : delta}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
