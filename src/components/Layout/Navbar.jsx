// src/components/Layout/Navbar.jsx
import { NavLink } from "react-router-dom";
import { Flag, BarChart2, TrendingUp, Shuffle, Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const links = [
  { to: "/",             label: "Stand",        icon: Flag },
  { to: "/grafiek",      label: "Grafiek",      icon: TrendingUp },
  { to: "/statistieken", label: "Statistieken", icon: BarChart2 },
  { to: "/scenario",     label: "Scenario",     icon: Shuffle },
];

export default function Navbar() {
  const { isDark, toggle } = useTheme();

  return (
    <nav className="bg-white dark:bg-f1dark border-b border-gray-200 dark:border-f1gray sticky top-0 z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2 font-heading font-bold text-lg text-gray-900 dark:text-white">
          <span className="text-f1red text-2xl">&#9873;</span>
          <span className="hidden sm:block">Max F1 Competitie</span>
          <span className="sm:hidden">F1 Pool</span>
          <span className="text-gray-400 dark:text-f1silver text-sm font-normal hidden md:block">— Jaargang XXIV</span>
        </NavLink>

        <div className="flex items-center gap-1">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-2 rounded text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-f1red text-white"
                    : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-f1gray"
                }`
              }
            >
              <Icon size={15} />
              <span className="hidden sm:block">{label}</span>
            </NavLink>
          ))}

          {/* Light/dark toggle */}
          <button
            onClick={toggle}
            aria-label={isDark ? "Licht thema" : "Donker thema"}
            className="ml-1 p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-f1gray hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
