// src/hooks/usePoolStand.js
import { useMemo } from "react";
import { berekenPoolStand } from "../logic/puntenberekening";
import { DEELNEMERS } from "../data/deelnemers";

export function usePoolStand(races, kwalis, sprints) {
  return useMemo(
    () => berekenPoolStand(DEELNEMERS, races, kwalis, sprints),
    [races, kwalis, sprints]
  );
}
