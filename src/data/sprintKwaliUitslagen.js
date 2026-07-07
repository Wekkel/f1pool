// src/data/sprintKwaliUitslagen.js
//
// Sprintkwalificatie-uitslagen, handmatig overgenomen uit het officiële
// Excel-bestand (tabblad Uitslagen, blok "Sprint Kwalificatie").
// Deze data is NIET beschikbaar via de Jolpica/Ergast API en moet na elk
// sprintweekend handmatig worden aangevuld.
//
// Sleutel: circuitId zoals Jolpica die teruggeeft in race.Circuit.circuitId.
// Coureurs op driverId (Jolpica/Ergast), consistent met deelnemers.js.
// Dit is bewust GEEN racenummer: de pool telt races 1-22 (Bahrein en
// Saoedi-Arabië afgelast), terwijl de API-roundnummers daarvan kunnen
// afwijken. Het circuitId is in beide werelden ondubbelzinnig.
//
// Coureurs zonder tijd (GT), niet gestart of gediskwalificeerd worden
// weggelaten; afwezig in de lijst = 0 punten, conform de Excel-telling.
//
// Sprintweekenden 2026: China (shanghai), Miami (miami), Canada (villeneuve),
// Groot-Brittannië (silverstone), Nederland (zandvoort), Singapore (marina_bay).

export const SPRINT_KWALI_UITSLAGEN = {
  // Pool-race 2 — Heineken Grand Prix CHINA
  shanghai: [
    { position:  1, driverId: "russell",         naam: "George Russell" },
    { position:  2, driverId: "antonelli",       naam: "Kimi Antonelli" },
    { position:  3, driverId: "norris",          naam: "Lando Norris" },
    { position:  4, driverId: "hamilton",        naam: "Lewis Hamilton" },
    { position:  5, driverId: "piastri",         naam: "Oscar Piastri" },
    { position:  6, driverId: "leclerc",         naam: "Charles Leclerc" },
    { position:  7, driverId: "gasly",           naam: "Pierre Gasly" },
    { position:  8, driverId: "max_verstappen",  naam: "Max Verstappen" },
    { position:  9, driverId: "bearman",         naam: "Oliver Bearman" },
    { position: 10, driverId: "hadjar",          naam: "Isack Hadjar" },
    { position: 11, driverId: "hulkenberg",      naam: "Nico Hülkenberg" },
    { position: 12, driverId: "ocon",            naam: "Esteban Ocon" },
    { position: 13, driverId: "lawson",          naam: "Liam Lawson" },
    { position: 14, driverId: "bortoleto",       naam: "Gabriel Bortoleto" },
    { position: 15, driverId: "arvid_lindblad",  naam: "Arvid Lindblad" },
    { position: 16, driverId: "colapinto",       naam: "Franco Colapinto" },
    { position: 17, driverId: "sainz",           naam: "Carlos Sainz Jr." },
    { position: 18, driverId: "albon",           naam: "Alexander Albon" },
    { position: 19, driverId: "alonso",          naam: "Fernando Alonso" },
    { position: 20, driverId: "stroll",          naam: "Lance Stroll" },
    { position: 21, driverId: "bottas",          naam: "Valtteri Bottas" },
    // Sergio Pérez (11): GT — geen tijd, telt niet mee
  ],

  // Pool-race 4 — Crypto.com Grand Prix MIAMI
  miami: [
    { position:  1, driverId: "norris",          naam: "Lando Norris" },
    { position:  2, driverId: "antonelli",       naam: "Kimi Antonelli" },
    { position:  3, driverId: "piastri",         naam: "Oscar Piastri" },
    { position:  4, driverId: "leclerc",         naam: "Charles Leclerc" },
    { position:  5, driverId: "max_verstappen",  naam: "Max Verstappen" },
    { position:  6, driverId: "russell",         naam: "George Russell" },
    { position:  7, driverId: "hamilton",        naam: "Lewis Hamilton" },
    { position:  8, driverId: "colapinto",       naam: "Franco Colapinto" },
    { position:  9, driverId: "hadjar",          naam: "Isack Hadjar" },
    { position: 10, driverId: "gasly",           naam: "Pierre Gasly" },
    { position: 11, driverId: "bortoleto",       naam: "Gabriel Bortoleto" },
    { position: 12, driverId: "hulkenberg",      naam: "Nico Hülkenberg" },
    { position: 13, driverId: "bearman",         naam: "Oliver Bearman" },
    { position: 14, driverId: "sainz",           naam: "Carlos Sainz Jr." },
    { position: 15, driverId: "arvid_lindblad",  naam: "Arvid Lindblad" },
    { position: 16, driverId: "lawson",          naam: "Liam Lawson" },
    { position: 17, driverId: "ocon",            naam: "Esteban Ocon" },
    { position: 18, driverId: "perez",           naam: "Sergio Pérez" },
    { position: 19, driverId: "albon",           naam: "Alexander Albon" },
    { position: 20, driverId: "bottas",          naam: "Valtteri Bottas" },
    { position: 21, driverId: "alonso",          naam: "Fernando Alonso" },
    // Lance Stroll (18): GT — geen tijd, telt niet mee
  ],

  // Pool-race 5 — Lenovo Grand Prix CANADA
  villeneuve: [
    { position:  1, driverId: "russell",         naam: "George Russell" },
    { position:  2, driverId: "antonelli",       naam: "Kimi Antonelli" },
    { position:  3, driverId: "norris",          naam: "Lando Norris" },
    { position:  4, driverId: "piastri",         naam: "Oscar Piastri" },
    { position:  5, driverId: "hamilton",        naam: "Lewis Hamilton" },
    { position:  6, driverId: "leclerc",         naam: "Charles Leclerc" },
    { position:  7, driverId: "max_verstappen",  naam: "Max Verstappen" },
    { position:  8, driverId: "hadjar",          naam: "Isack Hadjar" },
    { position:  9, driverId: "arvid_lindblad",  naam: "Arvid Lindblad" },
    { position: 10, driverId: "sainz",           naam: "Carlos Sainz Jr." },
    { position: 11, driverId: "hulkenberg",      naam: "Nico Hülkenberg" },
    { position: 12, driverId: "bortoleto",       naam: "Gabriel Bortoleto" },
    { position: 13, driverId: "colapinto",       naam: "Franco Colapinto" },
    { position: 14, driverId: "ocon",            naam: "Esteban Ocon" },
    { position: 15, driverId: "bearman",         naam: "Oliver Bearman" },
    { position: 16, driverId: "alonso",          naam: "Fernando Alonso" },
    { position: 17, driverId: "perez",           naam: "Sergio Pérez" },
    { position: 18, driverId: "stroll",          naam: "Lance Stroll" },
    { position: 19, driverId: "gasly",           naam: "Pierre Gasly" },
    { position: 20, driverId: "bottas",          naam: "Valtteri Bottas" },
    // Alexander Albon (23): GT — geen tijd, telt niet mee
    // Liam Lawson (30): GT — geen tijd, telt niet mee
  ],

  // Pool-race 9 — Pirelli Grand Prix GROOT-BRITTANNIË
  silverstone: [
    { position:  1, driverId: "antonelli",       naam: "Kimi Antonelli" },
    { position:  2, driverId: "hamilton",        naam: "Lewis Hamilton" },
    { position:  3, driverId: "max_verstappen",  naam: "Max Verstappen" },
    { position:  4, driverId: "leclerc",         naam: "Charles Leclerc" },
    { position:  5, driverId: "russell",         naam: "George Russell" },
    { position:  6, driverId: "norris",          naam: "Lando Norris" },
    { position:  7, driverId: "piastri",         naam: "Oscar Piastri" },
    { position:  8, driverId: "hadjar",          naam: "Isack Hadjar" },
    { position:  9, driverId: "lawson",          naam: "Liam Lawson" },
    { position: 10, driverId: "arvid_lindblad",  naam: "Arvid Lindblad" },
    { position: 11, driverId: "gasly",           naam: "Pierre Gasly" },
    { position: 12, driverId: "bortoleto",       naam: "Gabriel Bortoleto" },
    { position: 13, driverId: "hulkenberg",      naam: "Nico Hülkenberg" },
    { position: 14, driverId: "colapinto",       naam: "Franco Colapinto" },
    { position: 15, driverId: "sainz",           naam: "Carlos Sainz Jr." },
    { position: 16, driverId: "albon",           naam: "Alexander Albon" },
    { position: 17, driverId: "bearman",         naam: "Oliver Bearman" },
    { position: 18, driverId: "ocon",            naam: "Esteban Ocon" },
    { position: 19, driverId: "perez",           naam: "Sergio Pérez" },
    { position: 20, driverId: "bottas",          naam: "Valtteri Bottas" },
    { position: 21, driverId: "alonso",          naam: "Fernando Alonso" },
    { position: 22, driverId: "stroll",          naam: "Lance Stroll" },
  ],

  // Pool-race 12 — Heineken Grand Prix NEDERLAND (Zandvoort)
  // zandvoort: [ ... ],  // invullen na het sprintweekend

  // Pool-race 16 — Singapore Airlines Grand Prix SINGAPORE
  // marina_bay: [ ... ],  // invullen na het sprintweekend
};
