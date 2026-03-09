// src/components/Deelnemer/CoureurKaart.jsx
const TEAM_KLEUREN = {
  "McLaren":          "#FF8000",
  "Mercedes":         "#00D2BE",
  "Scuderia Ferrari": "#E8002D",
  "Williams":         "#005AFF",
  "Racing Bulls":     "#6692FF",
  "Haas":             "#B6BABD",
  "Aston Martin":     "#358C75",
  "Audi":             "#C9A227",
  "Alpine":           "#FF87BC",
  "Kick Sauber":      "#52E252",
  "Red Bull":         "#3671C6",
};

export default function CoureurKaart({ coureur }) {
  const kleur = TEAM_KLEUREN[coureur.team] || "#666";

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700 flex items-center gap-3"
      style={{ borderLeftColor: kleur, borderLeftWidth: 3 }}
    >
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
        style={{ backgroundColor: kleur + "33", color: kleur }}
      >
        {coureur.nr}
      </div>
      <div className="min-w-0">
        <div className="font-semibold text-gray-900 dark:text-white text-sm truncate">{coureur.naam}</div>
        <div className="text-gray-500 dark:text-gray-400 text-xs">{coureur.team}</div>
      </div>
      <div className="ml-auto text-right shrink-0">
        <div className="text-xs text-gray-500">Kwali</div>
        <div className="text-sm font-bold text-gray-700 dark:text-gray-300">P{coureur.kwaliPositie}</div>
      </div>
    </div>
  );
}
