// src/components/Grafiek/SeizoenGrafiek.jsx
import { useState, useMemo } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer,
} from "recharts";

// Genereer unieke kleuren voor elk team
const KLEUREN = [
  "#E10600", "#00D2BE", "#FF8000", "#005AFF", "#358C75",
  "#6692FF", "#B6BABD", "#C9A227", "#FF87BC", "#52E252",
  "#3671C6", "#FFD700", "#E8002D", "#8B5CF6",
];

export default function SeizoenGrafiek({ stand }) {
  const [zichtbaar, setZichtbaar] = useState(() =>
    Object.fromEntries(stand.map(d => [d.id, true]))
  );

  // Bouw data array: één object per race, met cumulatief per deelnemer
  const chartData = useMemo(() => {
    const maxRaces = Math.max(...stand.map(d => d.perRace.length), 0);
    return Array.from({ length: maxRaces }, (_, i) => {
      const obj = { race: i + 1 };
      stand.forEach(d => {
        obj[d.id] = d.perRace[i]?.cumulatief ?? null;
      });
      return obj;
    });
  }, [stand]);

  if (chartData.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 py-12">
        Nog geen race-data beschikbaar.
      </div>
    );
  }

  const toggle = (id) =>
    setZichtbaar(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <div>
      {/* Klikbare legende */}
      <div className="flex flex-wrap gap-2 mb-4">
        {stand.map((d, i) => (
          <button
            key={d.id}
            onClick={() => toggle(d.id)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-all ${
              zichtbaar[d.id]
                ? "border-transparent text-gray-900 dark:text-white"
                : "border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-500 bg-transparent"
            }`}
            style={zichtbaar[d.id] ? { backgroundColor: KLEUREN[i % KLEUREN.length] + "33", borderColor: KLEUREN[i % KLEUREN.length] } : {}}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: zichtbaar[d.id] ? KLEUREN[i % KLEUREN.length] : "#555" }}
            />
            {d.deelnemer}
          </button>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={420}>
        <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#38383F" />
          <XAxis
            dataKey="race"
            stroke="#666"
            tick={{ fill: "#999", fontSize: 12 }}
            label={{ value: "Grand Prix", position: "insideBottom", offset: -2, fill: "#666", fontSize: 12 }}
          />
          <YAxis
            stroke="#666"
            tick={{ fill: "#999", fontSize: 12 }}
            label={{ value: "Punten", angle: -90, position: "insideLeft", fill: "#666", fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{ backgroundColor: "#15151E", border: "1px solid #38383F", borderRadius: 8 }}
            labelStyle={{ color: "#fff", fontWeight: "bold" }}
            itemStyle={{ color: "#ccc" }}
            formatter={(val, name) => {
              const d = stand.find(s => s.id === Number(name));
              return [val, d?.deelnemer || name];
            }}
            labelFormatter={label => `Race ${label}`}
          />
          {stand.map((d, i) => (
            zichtbaar[d.id] && (
              <Line
                key={d.id}
                type="monotone"
                dataKey={d.id}
                stroke={KLEUREN[i % KLEUREN.length]}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
                connectNulls
              />
            )
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
