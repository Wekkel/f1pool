// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import HomePage from "./pages/HomePage";
import DeelnemerPage from "./pages/DeelnemerPage";
import GrafiekPage from "./pages/GrafiekPage";
import StatistiekenPage from "./pages/StatistiekenPage";
import ScenarioPage from "./pages/ScenarioPage";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter basename="/f1-pool">
        <div className="min-h-screen bg-gray-50 dark:bg-f1dark flex flex-col transition-colors duration-200">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/"                element={<HomePage />} />
              <Route path="/deelnemer/:id"   element={<DeelnemerPage />} />
              <Route path="/grafiek"         element={<GrafiekPage />} />
              <Route path="/statistieken"    element={<StatistiekenPage />} />
              <Route path="/scenario"        element={<ScenarioPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}
