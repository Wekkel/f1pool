// src/components/Stand/StandRij.jsx
import { Link } from "react-router-dom";
import { Trophy, TrendingUp } from "lucide-react";

function PositieBadge({ pos }) {
  if (pos === 1) return <span className="text-gold font-bold text-lg">🥇</span>;
  if (pos === 2) return <span className="text-f1silver font-bold text-lg">🥈</span>;
  if (pos === 3) return <span className="text-amber-600 font-bold text-lg">🥉</span>;
  return <span className="text-gray-500 dark:text-gray-400 font-bold w-6 text-center">{pos}</span>;
}

export default function StandRij({ deelnemer, leiderPunten, isEven }) {
  const delta = deelnemer.totaal - leiderPunten;
  const deltaStr = delta === 0 ? "—" : delta.toString();

  return (
    <tr className={`${isEven ? "bg-gray-100/50 dark:bg-gray-800/50" : ""} hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-colors`}>
      <td className="px-4 py-3 text-center w-12">
        <PositieBadge pos={deelnemer.positie} />
      </td>
      <td className="px-4 py-3">
        <Link
          to={`/deelnemer/${deelnemer.id}`}
          className="group"
        >
          <div className="font-heading font-semibold text-gray-900 dark:text-white group-hover:text-f1red transition-colors">
            {deelnemer.teamnaam}
          </div>
          <div className="text-gray-500 dark:text-gray-400 text-sm">{deelnemer.deelnemer}</div>
        </Link>
      </td>
      <td className="px-4 py-3 text-center">
        <span className="font-heading font-bold text-lg text-gray-900 dark:text-white">
          {deelnemer.totaal}
        </span>
        <span className="text-gray-500 text-xs ml-1">pts</span>
      </td>
      <td className="px-4 py-3 text-center">
        <span className={`text-sm font-medium ${delta === 0 ? "text-gold" : "text-gray-500 dark:text-gray-400"}`}>
          {deltaStr}
        </span>
      </td>
      <td className="px-4 py-3 text-right">
        <Link
          to={`/deelnemer/${deelnemer.id}`}
          className="text-gray-500 dark:text-gray-400 hover:text-f1red transition-colors"
          title="Bekijk detail"
        >
          <TrendingUp size={16} />
        </Link>
      </td>
    </tr>
  );
}
