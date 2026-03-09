// src/pages/HomePage.jsx
import { useMemo } from "react";
import { useRaceData } from "../hooks/useRaceData";
import { usePoolStand } from "../hooks/usePoolStand";
import PoolStand from "../components/Stand/PoolStand";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import ErrorBanner from "../components/UI/ErrorBanner";
import GrandPrixBadge from "../components/UI/GrandPrixBadge";
import { KALENDER_2026 } from "../data/kalender";
import { Calendar, Flag } from "lucide-react";

function VolgendeRace() {
  const vandaag = new Date();
  const volgende = KALENDER_2026.find(r => new Date(r.datum) >= vandaag);
  if (!volgende) return null;

  const datum = new Date(volgende.datum);
  const datumStr = datum.toLocaleDateString("nl-NL", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-lg">
      <div className="flex items-center gap-2 text-f1red text-xs font-bold uppercase tracking-widest mb-3">
        <Calendar size={14} />
        Volgende race
      </div>
      <GrandPrixBadge race={volgende} size="lg" />
      <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">{volgende.circuit}</p>
      <p className="text-gray-500 text-xs mt-1 capitalize">{datumStr}</p>
      <div className="mt-3 text-xs text-gray-500">
        Race {volgende.nr} van 24
      </div>
    </div>
  );
}

function GereedRaces({ races }) {
  if (races.length === 0) return null;
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-lg">
      <div className="flex items-center gap-2 text-f1red text-xs font-bold uppercase tracking-widest mb-3">
        <Flag size={14} />
        Seizoensvoortgang
      </div>
      <div className="flex items-center gap-3">
        <div className="text-3xl font-heading font-bold text-gray-900 dark:text-white">{races.length}</div>
        <div className="text-gray-500 dark:text-gray-400 text-sm">van 24 races gereden</div>
      </div>
      <div className="mt-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div
          className="bg-f1red h-2 rounded-full transition-all"
          style={{ width: `${(races.length / 24) * 100}%` }}
        />
      </div>
    </div>
  );
}

export default function HomePage() {
  const { races, kwalis, sprints, loading, error } = useRaceData();
  const stand = usePoolStand(races, kwalis, sprints);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="font-heading text-3xl font-bold text-gray-900 dark:text-white">
          Pool Stand
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Max F1 Competitie — Jaargang XXIV (2026)</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          {loading && <LoadingSpinner text="Race data ophalen..." />}
          {error && <ErrorBanner message={`Kon race data niet ophalen: ${error}`} />}
          {!loading && !error && <PoolStand stand={stand} />}
        </div>
        <div className="flex flex-col gap-4">
          <VolgendeRace />
          {!loading && <GereedRaces races={races} />}
        </div>
      </div>
    </div>
  );
}
