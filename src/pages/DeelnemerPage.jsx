// src/pages/DeelnemerPage.jsx
import { useParams, Link } from "react-router-dom";
import { useMemo } from "react";
import { ArrowLeft } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { DEELNEMERS } from "../data/deelnemers";
import { berekenPunten } from "../logic/puntenberekening";
import { useRaceData } from "../hooks/useRaceData";
import CoureurKaart from "../components/Deelnemer/CoureurKaart";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import ErrorBanner from "../components/UI/ErrorBanner";

export default function DeelnemerPage() {
  const { id } = useParams();
  const { races, kwalis, sprints, loading, error } = useRaceData();

  const deelnemer = DEELNEMERS.find(d => d.id === Number(id));
  const resultaat = useMemo(
    () => deelnemer ? berekenPunten(deelnemer, races, kwalis, sprints) : null,
    [deelnemer, races, kwalis, sprints]
  );

  if (!deelnemer) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-6">
        <ErrorBanner message="Deelnemer niet gevonden." />
        <Link to="/" className="text-f1red hover:underline flex items-center gap-1 mt-4">
          <ArrowLeft size={16} /> Terug naar stand
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <Link to="/" className="flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-6 text-sm">
        <ArrowLeft size={16} /> Terug naar stand
      </Link>

      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 mb-6">
        <h1 className="font-heading text-2xl font-bold text-gray-900 dark:text-white">{deelnemer.teamnaam}</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">{deelnemer.deelnemer}</p>
        {resultaat && (
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-4xl font-heading font-bold text-gray-900 dark:text-white">{resultaat.totaal}</span>
            <span className="text-gray-500 dark:text-gray-400">punten totaal</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Coureurskeuzes */}
        <div>
          <h2 className="font-heading font-semibold text-lg text-gray-900 dark:text-white mb-3">Gekozen coureurs</h2>
          <div className="flex flex-col gap-2">
            {deelnemer.coureurs.map(c => (
              <CoureurKaart key={c.nr} coureur={c} />
            ))}
          </div>
        </div>

        {/* Cumulatief puntenverloop */}
        <div>
          <h2 className="font-heading font-semibold text-lg text-gray-900 dark:text-white mb-3">Puntenverloop</h2>
          {loading && <LoadingSpinner text="Data laden..." />}
          {error && <ErrorBanner message={error} />}
          {!loading && !error && resultaat?.perRace.length === 0 && (
            <p className="text-gray-500 dark:text-gray-400 text-sm">Nog geen race-data.</p>
          )}
          {!loading && !error && resultaat?.perRace.length > 0 && (
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={resultaat.perRace} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#38383F" />
                <XAxis dataKey="raceNr" stroke="#666" tick={{ fill: "#999", fontSize: 11 }} />
                <YAxis stroke="#666" tick={{ fill: "#999", fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#15151E", border: "1px solid #38383F", borderRadius: 8 }}
                  labelStyle={{ color: "#fff" }}
                  formatter={(v) => [v, "Cumulatief"]}
                  labelFormatter={l => `Race ${l}`}
                />
                <Line type="monotone" dataKey="cumulatief" stroke="#6366F1" strokeWidth={2} dot={{ fill: "#6366F1", r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Per-race breakdown */}
      {!loading && !error && resultaat?.perRace.length > 0 && (
        <div>
          <h2 className="font-heading font-semibold text-lg text-gray-900 dark:text-white mb-3">Punten per race</h2>
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-100/80 dark:bg-gray-800/80">
                    <th className="px-4 py-2 text-left text-xs text-gray-500 dark:text-gray-400 uppercase">Race</th>
                    <th className="px-4 py-2 text-center text-xs text-gray-500 dark:text-gray-400 uppercase">Race</th>
                    <th className="px-4 py-2 text-center text-xs text-gray-500 dark:text-gray-400 uppercase">Kwali</th>
                    <th className="px-4 py-2 text-center text-xs text-gray-500 dark:text-gray-400 uppercase">Sprint</th>
                    <th className="px-4 py-2 text-center text-xs text-gray-500 dark:text-gray-400 uppercase">Totaal</th>
                    <th className="px-4 py-2 text-center text-xs text-gray-500 dark:text-gray-400 uppercase">Cumul.</th>
                  </tr>
                </thead>
                <tbody>
                  {resultaat.perRace.map((r, i) => (
                    <tr key={r.raceNr} className={`${i % 2 === 1 ? "bg-gray-100/40 dark:bg-gray-800/40" : ""} border-b border-gray-100 dark:border-gray-800`}>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300 font-medium">{r.racenaam || `Race ${r.raceNr}`}</td>
                      <td className="px-4 py-2 text-center text-gray-900 dark:text-white">{r.racePunten}</td>
                      <td className="px-4 py-2 text-center text-blue-600 dark:text-blue-400">{r.kwaliPunten}</td>
                      <td className="px-4 py-2 text-center text-purple-600 dark:text-purple-400">{r.sprintPunten}</td>
                      <td className="px-4 py-2 text-center font-bold text-gray-900 dark:text-white">{r.totaalRace}</td>
                      <td className="px-4 py-2 text-center text-gray-500 dark:text-gray-400">{r.cumulatief}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
