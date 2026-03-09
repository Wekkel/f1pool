// src/components/Stand/PoolStand.jsx
import StandRij from "./StandRij";

export default function PoolStand({ stand }) {
  const leiderPunten = stand[0]?.totaal ?? 0;

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-lg">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-100/80 dark:bg-gray-800/80">
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-12">#</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Team / Deelnemer</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Punten</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Verschil</th>
              <th className="px-4 py-3 w-10" />
            </tr>
          </thead>
          <tbody>
            {stand.map((d, i) => (
              <StandRij
                key={d.id}
                deelnemer={d}
                leiderPunten={leiderPunten}
                isEven={i % 2 === 1}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
