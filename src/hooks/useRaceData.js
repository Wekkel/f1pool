// src/hooks/useRaceData.js
import { useState, useEffect } from "react";
import { getRaceUitslagen, getKwaliUitslagen, getSprintUitslagen } from "../api/jolpica";

export function useRaceData(seizoen = 2026) {
  const [races, setRaces]     = useState([]);
  const [kwalis, setKwalis]   = useState([]);
  const [sprints, setSprints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const [r, k, s] = await Promise.all([
          getRaceUitslagen(seizoen),
          getKwaliUitslagen(seizoen),
          getSprintUitslagen(seizoen),
        ]);
        if (!cancelled) {
          setRaces(r);
          setKwalis(k);
          setSprints(s);
        }
      } catch (e) {
        if (!cancelled) setError(e.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [seizoen]);

  return { races, kwalis, sprints, loading, error };
}
