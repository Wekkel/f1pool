// src/data/puntensysteem.js

// Competitie-eigen puntensysteem (afwijkend van F1!)
export const COMPETITIE_RACE_PUNTEN = {
  1: 12, 2: 10, 3: 8, 4: 7, 5: 6,
  6: 5,  7: 4,  8: 3, 9: 2, 10: 1,
};

export const COMPETITIE_SPRINT_PUNTEN = {
  1: 8, 2: 7, 3: 6, 4: 5, 5: 4, 6: 3, 7: 2, 8: 1,
};

// 2 punten als coureur EXACT op de voorspelde kwali-positie staat
export const KWALI_BONUS_PUNTEN = 2;

// 1 punt als coureur op juiste positie in sprint-kwali
export const SPRINT_KWALI_BONUS_PUNTEN = 1;

// F1 officieel puntensysteem (voor referentie/weergave F1 stand)
export const F1_RACE_PUNTEN = {
  1: 25, 2: 18, 3: 15, 4: 12, 5: 10,
  6: 8,  7: 6,  8: 4,  9: 2,  10: 1,
};

export const F1_SPRINT_PUNTEN = {
  1: 8, 2: 7, 3: 6, 4: 5, 5: 4, 6: 3, 7: 2, 8: 1,
};
