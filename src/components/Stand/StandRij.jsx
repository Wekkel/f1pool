// src/components/Stand/StandRij.jsx
import { Link } from "react-router-dom";

// Vaste componentkleuren, overal in de app gelijk:
// race = emerald, sprint = orange, bonussen (kwali + sprintkwali) = indigo
export const COMPONENT_KLEUREN = {
  race:   "#10B981",
  sprint: "#F97316",
  bonus:  "#6366F1",
};

function PositieBadge({ pos }) {
  const stijl = {
    1: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400",
    2: "bg-gray-200 text-gray-600 dark:bg-gray-500/20 dark:text-gray-300",
    3: "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400",
  }[pos];

  if (stijl) {
    return (
      <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full font-heading font-bold text-sm ${stijl}`}>
        {pos}
      </span>
    );
  }
  return <span className="text-gray-500 dark:text-gray-400 font-semibold tabular-nums">{pos}</span>;
}

function Trend({ verschil }) {
  if (verschil === null) return <span className="text-gray-400 dark:text-gray-600">–</span>;
  if (verschil > 0)
    return <span className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold">▲{verschil}</span>;
  if (verschil < 0)
    return <span className="text-red-500 dark:text-red-400 text-xs font-semibold">▼{-verschil}</span>;
  return <span className="text-gray-400 dark:text-gray-600">–</span>;
}

function OpbouwBalk({ race, sprint, bonus }) {
  const totaal = race + sprint + bonus;
  if (totaal === 0) return null;
  const pct = (x) => `${(x / totaal) * 100}%`;
  return (
    <div
      className="flex h-2 w-full max-w-[110px] rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800"
      title={`Race ${race} · Sprint ${sprint} · Bonussen ${bonus}`}
    >
      <div style={{ width: pct(race),   backgroundColor: COMPONENT_KLEUREN.race }} />
      <div style={{ width: pct(sprint), backgroundColor: COMPONENT_KLEUREN.sprint }} />
      <div style={{ width: pct(bonus),  backgroundColor: COMPONENT_KLEUREN.bonus }} />
    </div>
  );
}

export default function StandRij({ deelnemer, leiderPunten, vorigePositie }) {
  const delta = deelnemer.totaal - leiderPunten;
  const isLeider = delta === 0;
  const trend = vorigePositie == null ? null : vorigePositie - deelnemer.positie;

  const opbouw = deelnemer.perRace.reduce(
    (acc, r) => ({
      race:   acc.race   + (r.racePunten || 0),
      sprint: acc.sprint + (r.sprintPunten || 0),
      bonus:  acc.bonus  + (r.kwaliPunten || 0) + (r.sprintKwaliPunten || 0),
    }),
    { race: 0, sprint: 0, bonus: 0 }
  );

  return (
    <tr
      className={`border-b border-gray-100 dark:border-gray-800 last:border-0 transition-colors
        hover:bg-gray-50 dark:hover:bg-gray-800/60
        ${isLeider ? "bg-indigo-50/60 dark:bg-indigo-500/5" : ""}`}
    >
      <td className="px-3 py-3 text-center w-12">
        <PositieBadge pos={deelnemer.positie} />
      </td>
      <td className="px-1 py-3 text-center w-10 hidden sm:table-cell">
        <Trend verschil={trend} />
      </td>
      <td className="px-3 py-3">
        <Link to={`/deelnemer/${deelnemer.id}`} className="group block">
          <span className="font-heading font-semibold text-gray-900 dark:text-white group-hover:text-f1red transition-colors">
            {deelnemer.teamnaam}
          </span>
          <span className="block text-gray-500 dark:text-gray-400 text-xs mt-0.5">
            {deelnemer.deelnemer}
            {deelnemer.correctie ? (
              <span
                className="ml-1.5 text-[10px] text-gray-400 dark:text-gray-500"
                title="Handmatige correctie beheerder"
              >
                ({deelnemer.correctie > 0 ? "+" : ""}{deelnemer.correctie})
              </span>
            ) : null}
          </span>
        </Link>
      </td>
      <td className="px-3 py-3 hidden md:table-cell">
        <OpbouwBalk {...opbouw} />
      </td>
      <td className="px-3 py-3 text-right">
        <span className="font-heading font-bold text-lg text-gray-900 dark:text-white tabular-nums">
          {deelnemer.totaal}
        </span>
      </td>
      <td className="px-3 py-3 text-right w-16">
        <span className={`text-sm tabular-nums ${isLeider ? "text-amber-500 font-semibold" : "text-gray-500 dark:text-gray-400"}`}>
          {isLeider ? "—" : `−${-delta}`}
        </span>
      </td>
    </tr>
  );
}
