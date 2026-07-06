// src/components/Stand/PoolStand.jsx
import { useMemo } from "react";
import StandRij, { COMPONENT_KLEUREN } from "./StandRij";

/**
 * Berekent de ranglijst zoals die was ná de vorige race, zodat we per
 * deelnemer een stijging/daling (▲/▼) kunnen tonen. Gedeelde plaatsen
 * volgen dezelfde RANK-logica als de hoofdstand.
 */
function berekenVorigePosities(stand) {
  const nRaces = stand[0]?.perRace.length ?? 0;
  if (nRaces < 2) return {};
  const idx = nRaces - 2;
  const cum = stand.map(d => ({
    id: d.id,
    punten: (d.perRace[idx]?.cumulatief ?? 0) + (d.correctie || 0),
  }));
  const posities = {};
  cum.forEach(d => {
    posities[d.id] = 1 + cum.filter(x => x.punten > d.punten).length;
  });
  return posities;
}

function LegendaStip({ kleur, label }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: kleur }} />
      {label}
    </span>
  );
}

export default function PoolStand({ stand }) {
  const leiderPunten = stand[0]?.totaal ?? 0;
  const vorigePosities = useMemo(() => berekenVorigePosities(stand), [stand]);

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-lg">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-100/80 dark:bg-gray-800/80 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              <th className="px-3 py-3 text-center w-12">#</th>
              <th className="px-1 py-3 text-center w-10 hidden sm:table-cell" title="Positieverandering t.o.v. vorige race">±</th>
              <th className="px-3 py-3 text-left">Team / Deelnemer</th>
              <th className="px-3 py-3 text-left hidden md:table-cell">Opbouw</th>
              <th className="px-3 py-3 text-right">Punten</th>
              <th className="px-3 py-3 text-right w-16">Gat</th>
            </tr>
          </thead>
          <tbody>
            {stand.map(d => (
              <StandRij
                key={d.id}
                deelnemer={d}
                leiderPunten={leiderPunten}
                vorigePositie={vorigePosities[d.id] ?? null}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="hidden md:flex items-center gap-4 px-4 py-2.5 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-500 dark:text-gray-400">
        <span className="uppercase tracking-wider text-[10px] font-semibold">Opbouw</span>
        <LegendaStip kleur={COMPONENT_KLEUREN.race} label="race" />
        <LegendaStip kleur={COMPONENT_KLEUREN.sprint} label="sprint" />
        <LegendaStip kleur={COMPONENT_KLEUREN.bonus} label="kwali-bonussen" />
      </div>
    </div>
  );
}
