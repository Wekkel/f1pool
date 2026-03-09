// src/pages/GrafiekPage.jsx
import { useRaceData } from "../hooks/useRaceData";
import { usePoolStand } from "../hooks/usePoolStand";
import SeizoenGrafiek from "../components/Grafiek/SeizoenGrafiek";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import ErrorBanner from "../components/UI/ErrorBanner";

export default function GrafiekPage() {
  const { races, kwalis, sprints, loading, error } = useRaceData();
  const stand = usePoolStand(races, kwalis, sprints);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="font-heading text-3xl font-bold text-gray-900 dark:text-white">Seizoensgrafiek</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Cumulatieve punten per deelnemer over het seizoen</p>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-lg">
        {loading && <LoadingSpinner text="Race data laden..." />}
        {error && <ErrorBanner message={error} />}
        {!loading && !error && <SeizoenGrafiek stand={stand} />}
      </div>
    </div>
  );
}
