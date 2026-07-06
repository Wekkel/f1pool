// src/components/Grafiek/SeizoenGrafiek.jsx
import { useState, useMemo } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ReferenceLine, ResponsiveContainer,
} from "recharts";
import { useTheme } from "../../context/ThemeContext";

// Circuits met een sprintweekend (Ergast/Jolpica circuitId's)
const SPRINT_CIRCUITS = new Set([
  "shanghai", "miami", "villeneuve", "silverstone", "zandvoort", "marina_bay",
]);

// Kleuren voor uitgelichte lijnen, toegekend op volgorde van selectie
const HIGHLIGHT_KLEUREN = [
  "#6366F1", "#10B981", "#F97316", "#EC4899", "#0EA5E9",
  "#EAB308", "#8B5CF6", "#14B8A6",
];

export default function SeizoenGrafiek({ stand }) {
  const { isDark } = useTheme();

  // Standaard: nummer 1 en 2 uitgelicht; klikken op een chip wisselt
  const [uitgelicht, setUitgelicht] = useState(() =>
    stand.slice(0, 2).map(d => d.id)
  );
  const [weergave, setWeergave] = useState("cumulatief"); // of "achterstand"

  const chartData = useMemo(() => {
    const maxRaces = Math.max(...stand.map(d => d.perRace.length), 0);
    return Array.from({ length: maxRaces }, (_, i) => {
      const cums = stand.map(d => d.perRace[i]?.cumulatief ?? null);
      const leider = Math.max(...cums.filter(v => v !== null), 0);
      const obj = {
        race: i + 1,
        sprint: SPRINT_CIRCUITS.has(stand[0]?.perRace[i]?.raceCode),
      };
      stand.forEach((d, j) => {
        const v = cums[j];
        obj[d.id] = v === null ? null : (weergave === "achterstand" ? v - leider : v);
      });
      return obj;
    });
  }, [stand, weergave]);

  if (chartData.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 py-12">
        Nog geen race-data beschikbaar.
      </div>
    );
  }

  const laatsteIdx = chartData.length - 1;
  const grijs = isDark ? "#4B5563" : "#D1D5DB";
  const gridKleur = isDark ? "#38383F" : "#E5E7EB";
  const asKleur = isDark ? "#9CA3AF" : "#6B7280";

  const kleurVan = (id) => {
    const i = uitgelicht.indexOf(id);
    return i === -1 ? grijs : HIGHLIGHT_KLEUREN[i % HIGHLIGHT_KLEUREN.length];
  };

  const toggle = (id) =>
    setUitgelicht(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );

  // Label aan het lijneinde, alleen voor uitgelichte teams
  const EindLabel = ({ x, y, index, deelnemer, kleur }) => {
    if (index !== laatsteIdx || x == null || y == null) return null;
    return (
      <text x={x + 8} y={y + 4} fill={kleur} fontSize={12} fontWeight={600}>
        {deelnemer}
      </text>
    );
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex flex-wrap gap-1.5">
          {stand.map(d => {
            const actief = uitgelicht.includes(d.id);
            const kleur = kleurVan(d.id);
            return (
              <button
                key={d.id}
                onClick={() => toggle(d.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-all ${
                  actief
                    ? "text-gray-900 dark:text-white"
                    : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500"
                }`}
                style={actief ? { backgroundColor: kleur + "22", borderColor: kleur } : {}}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: actief ? kleur : grijs }} />
                {d.deelnemer.split(" ")[0]}
              </button>
            );
          })}
        </div>
        <div className="flex rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden text-xs font-medium">
          {[["cumulatief", "Cumulatief"], ["achterstand", "Gat tot leider"]].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setWeergave(key)}
              className={`px-3 py-1.5 transition-colors ${
                weergave === key
                  ? "bg-f1red text-white"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={440}>
        <LineChart data={chartData} margin={{ top: 8, right: 90, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridKleur} vertical={false} />
          <XAxis
            dataKey="race"
            stroke={asKleur}
            tick={{ fill: asKleur, fontSize: 12 }}
            tickLine={false}
            label={{ value: "Grand Prix", position: "insideBottom", offset: -2, fill: asKleur, fontSize: 12 }}
          />
          <YAxis
            stroke={asKleur}
            tick={{ fill: asKleur, fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            width={44}
            label={{
              value: weergave === "achterstand" ? "Punten achter leider" : "Punten",
              angle: -90, position: "insideLeft", fill: asKleur, fontSize: 12,
            }}
          />
          {chartData.filter(d => d.sprint).map(d => (
            <ReferenceLine
              key={`sprint-${d.race}`}
              x={d.race}
              stroke="#A78BFA"
              strokeDasharray="4 4"
              strokeOpacity={0.6}
              label={{ value: "S", position: "top", fill: "#A78BFA", fontSize: 11, fontWeight: 700 }}
            />
          ))}
          {weergave === "achterstand" && (
            <ReferenceLine y={0} stroke={asKleur} strokeWidth={1} />
          )}
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? "#15151E" : "#FFFFFF",
              border: `1px solid ${gridKleur}`,
              borderRadius: 8,
            }}
            labelStyle={{ color: isDark ? "#fff" : "#111827", fontWeight: "bold" }}
            itemStyle={{ padding: "1px 0" }}
            itemSorter={item => -item.value}
            formatter={(val, name) => {
              const d = stand.find(s => s.id === Number(name));
              return [val, d?.deelnemer || name];
            }}
            labelFormatter={(label) => {
              const punt = chartData[label - 1];
              return `Race ${label}${punt?.sprint ? " · sprintweekend" : ""}`;
            }}
          />
          {/* Eerst de grijze lijnen, daarna de uitgelichte er bovenop */}
          {stand.filter(d => !uitgelicht.includes(d.id)).map(d => (
            <Line
              key={d.id}
              type="monotone"
              dataKey={d.id}
              stroke={grijs}
              strokeWidth={1.25}
              strokeOpacity={0.55}
              dot={false}
              activeDot={{ r: 3 }}
              connectNulls
              isAnimationActive={false}
            />
          ))}
          {stand.filter(d => uitgelicht.includes(d.id)).map(d => (
            <Line
              key={d.id}
              type="monotone"
              dataKey={d.id}
              stroke={kleurVan(d.id)}
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 4 }}
              connectNulls
              isAnimationActive={false}
              label={<EindLabel deelnemer={d.deelnemer.split(" ")[0]} kleur={kleurVan(d.id)} />}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
        Klik op een naam om die lijn uit te lichten. Gestippelde lijnen markeren sprintweekenden.
      </p>
    </div>
  );
}
