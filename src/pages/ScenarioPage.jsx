// src/pages/ScenarioPage.jsx
import { useRaceData } from "../hooks/useRaceData";
import ScenarioSimulator from "../components/Scenario/ScenarioSimulator";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import ErrorBanner from "../components/UI/ErrorBanner";

export default function ScenarioPage() {
  const { races, kwalis, sprints, loading, error } = useRaceData();

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="font-heading text-3xl font-bold text-gray-900 dark:text-white">Scenario Simulator</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
          Stel een hypothetische race-uitslag in en zie hoe de poolstand verandert.
        </p>
      </div>

      {loading && <LoadingSpinner text="Data laden..." />}
      {error && <ErrorBanner message={error} />}
      {!loading && !error && (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-lg">
          <ScenarioSimulator races={races} kwalis={kwalis} sprints={sprints} />
        </div>
      )}
    </div>
  );
}
