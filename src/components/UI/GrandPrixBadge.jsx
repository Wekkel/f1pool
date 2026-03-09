// src/components/UI/GrandPrixBadge.jsx
import { VLAG_CODES } from "../../data/kalender";

export default function GrandPrixBadge({ race, size = "sm" }) {
  const vlag = VLAG_CODES[race.code];
  const isSmall = size === "sm";

  return (
    <div className={`flex items-center gap-2 ${isSmall ? "text-sm" : "text-base"}`}>
      {vlag && (
        <img
          src={`https://flagcdn.com/w20/${vlag}.png`}
          alt={race.naam}
          className="w-5 h-auto rounded-sm"
        />
      )}
      <span className="font-medium text-gray-900 dark:text-white">{race.naam}</span>
      {race.sprint && (
        <span className="bg-purple-700 text-purple-100 text-xs px-1.5 py-0.5 rounded font-bold">
          S
        </span>
      )}
    </div>
  );
}
