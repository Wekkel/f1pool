// src/components/UI/LoadingSpinner.jsx
export default function LoadingSpinner({ text = "Laden..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3">
      <div className="w-10 h-10 border-4 border-f1gray border-t-f1red rounded-full animate-spin" />
      <p className="text-gray-500 dark:text-gray-400 text-sm">{text}</p>
    </div>
  );
}
