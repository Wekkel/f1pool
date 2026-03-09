// src/components/UI/ErrorBanner.jsx
import { AlertTriangle } from "lucide-react";

export default function ErrorBanner({ message }) {
  return (
    <div className="flex items-center gap-3 bg-red-50 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg p-4 my-4">
      <AlertTriangle size={20} className="text-f1red shrink-0" />
      <p className="text-red-700 dark:text-red-300 text-sm">{message}</p>
    </div>
  );
}
