// src/pages/StatistiekenPage.jsx
import { useState, useEffect } from "react";
import { getCoureurStand, getConstructeurStand } from "../api/jolpica";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import ErrorBanner from "../components/UI/ErrorBanner";
import { Search, Trophy } from "lucide-react";

const TEAM_KLEUREN = {
  "mclaren":       "#FF8000",
  "mercedes":      "#00D2BE",
  "ferrari":       "#E8002D",
  "williams":      "#005AFF",
  "rb":            "#6692FF",
  "haas":          "#B6BABD",
  "aston_martin":  "#358C75",
  "audi":          "#C9A227",
  "alpine":        "#FF87BC",
  "kick_sauber":   "#52E252",
  "red_bull":      "#3671C6",
};

function PodiumBadge({ pos }) {
  if (pos === "1") return <span className="text-gold">🥇</span>;
  if (pos === "2") return <span className="text-f1silver">🥈</span>;
  if (pos === "3") return <span className="text-amber-600">🥉</span>;
  return <span className="text-gray-500 dark:text-gray-400 font-bold">{pos}</span>;
}

export default function StatistiekenPage() {
  const [coureurs, setCoureurs]         = useState([]);
  const [constructeurs, setConstructeurs] = useState([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(null);
  const [zoek, setZoek]                 = useState("");
  const [tab, setTab]                   = useState("coureurs");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const [c, co] = await Promise.all([getCoureurStand(), getConstructeurStand()]);
        setCoureurs(c);
        setConstructeurs(co);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const gefilterdeRijders = coureurs.filter(c =>
    `${c.Driver.givenName} ${c.Driver.familyName}`.toLowerCase().includes(zoek.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="font-heading text-3xl font-bold text-gray-900 dark:text-white">F1 Statistieken</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Officiële F1 kampioenschapsstand 2026</p>
      </div>

      {loading && <LoadingSpinner text="Statistieken laden..." />}
      {error && <ErrorBanner message={error} />}

      {!loading && !error && (
        <>
          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            {["coureurs", "constructeurs"].map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                  tab === t
                    ? "bg-f1red text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {t === "coureurs" ? "Rijders" : "Constructeurs"}
              </button>
            ))}
          </div>

          {tab === "coureurs" && (
            <>
              {/* Zoekbalk */}
              <div className="relative mb-4 max-w-sm">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Zoek coureur..."
                  value={zoek}
                  onChange={e => setZoek(e.target.value)}
                  className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg pl-9 pr-4 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-f1red"
                />
              </div>

              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-100/80 dark:bg-gray-800/80">
                      <th className="px-4 py-3 text-center text-xs text-gray-500 dark:text-gray-400 uppercase w-10">#</th>
                      <th className="px-4 py-3 text-left text-xs text-gray-500 dark:text-gray-400 uppercase">Coureur</th>
                      <th className="px-4 py-3 text-left text-xs text-gray-500 dark:text-gray-400 uppercase hidden sm:table-cell">Team</th>
                      <th className="px-4 py-3 text-center text-xs text-gray-500 dark:text-gray-400 uppercase">Punten</th>
                      <th className="px-4 py-3 text-center text-xs text-gray-500 dark:text-gray-400 uppercase hidden md:table-cell">Wins</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gefilterdeRijders.map((c, i) => {
                      const kleur = TEAM_KLEUREN[c.Constructors?.[0]?.constructorId] || "#666";
                      return (
                        <tr key={c.Driver.driverId} className={`${i % 2 === 1 ? "bg-gray-100/40 dark:bg-gray-800/40" : ""} hover:bg-gray-100 dark:hover:bg-gray-700/30 transition-colors border-b border-gray-100 dark:border-gray-800`}>
                          <td className="px-4 py-3 text-center">
                            <PodiumBadge pos={c.position} />
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-1 h-8 rounded-full" style={{ backgroundColor: kleur }} />
                              <div>
                                <div className="text-gray-900 dark:text-white font-medium">
                                  {c.Driver.givenName} {c.Driver.familyName}
                                </div>
                                <div className="text-gray-500 text-xs">{c.Driver.nationality}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-gray-500 dark:text-gray-400 hidden sm:table-cell">
                            {c.Constructors?.[0]?.name}
                          </td>
                          <td className="px-4 py-3 text-center font-bold text-gray-900 dark:text-white">{c.points}</td>
                          <td className="px-4 py-3 text-center text-gray-500 dark:text-gray-400 hidden md:table-cell">{c.wins}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {gefilterdeRijders.length === 0 && (
                  <div className="text-center text-gray-500 py-8">Geen coureurs gevonden.</div>
                )}
              </div>
            </>
          )}

          {tab === "constructeurs" && (
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-100/80 dark:bg-gray-800/80">
                    <th className="px-4 py-3 text-center text-xs text-gray-500 dark:text-gray-400 uppercase w-10">#</th>
                    <th className="px-4 py-3 text-left text-xs text-gray-500 dark:text-gray-400 uppercase">Constructor</th>
                    <th className="px-4 py-3 text-center text-xs text-gray-500 dark:text-gray-400 uppercase">Punten</th>
                    <th className="px-4 py-3 text-center text-xs text-gray-500 dark:text-gray-400 uppercase hidden md:table-cell">Wins</th>
                  </tr>
                </thead>
                <tbody>
                  {constructeurs.map((c, i) => {
                    const kleur = TEAM_KLEUREN[c.Constructor?.constructorId] || "#666";
                    return (
                      <tr key={c.Constructor.constructorId} className={`${i % 2 === 1 ? "bg-gray-100/40 dark:bg-gray-800/40" : ""} hover:bg-gray-100 dark:hover:bg-gray-700/30 transition-colors border-b border-gray-100 dark:border-gray-800`}>
                        <td className="px-4 py-3 text-center">
                          <PodiumBadge pos={c.position} />
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: kleur }} />
                            <span className="text-gray-900 dark:text-white font-medium">{c.Constructor.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center font-bold text-gray-900 dark:text-white">{c.points}</td>
                        <td className="px-4 py-3 text-center text-gray-500 dark:text-gray-400 hidden md:table-cell">{c.wins}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {constructeurs.length === 0 && (
                <div className="text-center text-gray-500 py-8">Geen data beschikbaar.</div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
