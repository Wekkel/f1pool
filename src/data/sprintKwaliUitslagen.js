// src/data/sprintKwaliUitslagen.js
//
// Sprintkwalificatie-uitslagen, handmatig overgenomen uit het officiële
// Excel-bestand (tabblad Uitslagen, blok "Sprint Kwalificatie").
// Deze data is NIET beschikbaar via de Jolpica/Ergast API en moet na elk
// sprintweekend handmatig worden aangevuld.
//
// Sleutel: circuitId zoals Jolpica die teruggeeft in race.Circuit.circuitId.
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
    { position: 1,  number: "63", naam: "George Russell" },
    { position: 2,  number: "12", naam: "Kimi Antonelli" },
    { position: 3,  number: "1",  naam: "Lando Norris" },
    { position: 4,  number: "44", naam: "Lewis Hamilton" },
    { position: 5,  number: "81", naam: "Oscar Piastri" },
    { position: 6,  number: "16", naam: "Charles Leclerc" },
    { position: 7,  number: "10", naam: "Pierre Gasly" },
    { position: 8,  number: "3",  naam: "Max Verstappen" },
    { position: 9,  number: "87", naam: "Oliver Bearman" },
    { position: 10, number: "6",  naam: "Isack Hadjar" },
    { position: 11, number: "27", naam: "Nico Hülkenberg" },
    { position: 12, number: "31", naam: "Esteban Ocon" },
    { position: 13, number: "30", naam: "Liam Lawson" },
    { position: 14, number: "5",  naam: "Gabriel Bortoleto" },
    { position: 15, number: "41", naam: "Arvid Lindblad" },
    { position: 16, number: "43", naam: "Franco Colapinto" },
    { position: 17, number: "55", naam: "Carlos Sainz Jr." },
    { position: 18, number: "23", naam: "Alexander Albon" },
    { position: 19, number: "14", naam: "Fernando Alonso" },
    { position: 20, number: "18", naam: "Lance Stroll" },
    { position: 21, number: "77", naam: "Valtteri Bottas" },
    // Sergio Pérez (11): GT — geen tijd, telt niet mee
  ],

  // Pool-race 4 — Crypto.com Grand Prix MIAMI
  miami: [
    { position: 1,  number: "1",  naam: "Lando Norris" },
    { position: 2,  number: "12", naam: "Kimi Antonelli" },
    { position: 3,  number: "81", naam: "Oscar Piastri" },
    { position: 4,  number: "16", naam: "Charles Leclerc" },
    { position: 5,  number: "3",  naam: "Max Verstappen" },
    { position: 6,  number: "63", naam: "George Russell" },
    { position: 7,  number: "44", naam: "Lewis Hamilton" },
    { position: 8,  number: "43", naam: "Franco Colapinto" },
    { position: 9,  number: "6",  naam: "Isack Hadjar" },
    { position: 10, number: "10", naam: "Pierre Gasly" },
    { position: 11, number: "5",  naam: "Gabriel Bortoleto" },
    { position: 12, number: "27", naam: "Nico Hülkenberg" },
    { position: 13, number: "87", naam: "Oliver Bearman" },
    { position: 14, number: "55", naam: "Carlos Sainz Jr." },
    { position: 15, number: "41", naam: "Arvid Lindblad" },
    { position: 16, number: "30", naam: "Liam Lawson" },
    { position: 17, number: "31", naam: "Esteban Ocon" },
    { position: 18, number: "11", naam: "Sergio Pérez" },
    { position: 19, number: "23", naam: "Alexander Albon" },
    { position: 20, number: "77", naam: "Valtteri Bottas" },
    { position: 21, number: "14", naam: "Fernando Alonso" },
    // Lance Stroll (18): GT — geen tijd, telt niet mee
  ],

  // Pool-race 5 — Lenovo Grand Prix CANADA
  villeneuve: [
    { position: 1,  number: "63", naam: "George Russell" },
    { position: 2,  number: "12", naam: "Kimi Antonelli" },
    { position: 3,  number: "1",  naam: "Lando Norris" },
    { position: 4,  number: "81", naam: "Oscar Piastri" },
    { position: 5,  number: "44", naam: "Lewis Hamilton" },
    { position: 6,  number: "16", naam: "Charles Leclerc" },
    { position: 7,  number: "3",  naam: "Max Verstappen" },
    { position: 8,  number: "6",  naam: "Isack Hadjar" },
    { position: 9,  number: "41", naam: "Arvid Lindblad" },
    { position: 10, number: "55", naam: "Carlos Sainz Jr." },
    { position: 11, number: "27", naam: "Nico Hülkenberg" },
    { position: 12, number: "5",  naam: "Gabriel Bortoleto" },
    { position: 13, number: "43", naam: "Franco Colapinto" },
    { position: 14, number: "31", naam: "Esteban Ocon" },
    { position: 15, number: "87", naam: "Oliver Bearman" },
    { position: 16, number: "14", naam: "Fernando Alonso" },
    { position: 17, number: "11", naam: "Sergio Pérez" },
    { position: 18, number: "18", naam: "Lance Stroll" },
    { position: 19, number: "10", naam: "Pierre Gasly" },
    { position: 20, number: "77", naam: "Valtteri Bottas" },
    // Alexander Albon (23): GT — geen tijd, telt niet mee
    // Liam Lawson (30): GT — geen tijd, telt niet mee
  ],

  // Pool-race 9 — Pirelli Grand Prix GROOT-BRITTANNIË
  silverstone: [
    { position: 1,  number: "12", naam: "Kimi Antonelli" },
    { position: 2,  number: "44", naam: "Lewis Hamilton" },
    { position: 3,  number: "3",  naam: "Max Verstappen" },
    { position: 4,  number: "16", naam: "Charles Leclerc" },
    { position: 5,  number: "63", naam: "George Russell" },
    { position: 6,  number: "1",  naam: "Lando Norris" },
    { position: 7,  number: "81", naam: "Oscar Piastri" },
    { position: 8,  number: "6",  naam: "Isack Hadjar" },
    { position: 9,  number: "30", naam: "Liam Lawson" },
    { position: 10, number: "41", naam: "Arvid Lindblad" },
    { position: 11, number: "10", naam: "Pierre Gasly" },
    { position: 12, number: "5",  naam: "Gabriel Bortoleto" },
    { position: 13, number: "27", naam: "Nico Hülkenberg" },
    { position: 14, number: "43", naam: "Franco Colapinto" },
    { position: 15, number: "55", naam: "Carlos Sainz Jr." },
    { position: 16, number: "23", naam: "Alexander Albon" },
    { position: 17, number: "87", naam: "Oliver Bearman" },
    { position: 18, number: "31", naam: "Esteban Ocon" },
    { position: 19, number: "11", naam: "Sergio Pérez" },
    { position: 20, number: "77", naam: "Valtteri Bottas" },
    { position: 21, number: "14", naam: "Fernando Alonso" },
    { position: 22, number: "18", naam: "Lance Stroll" },
  ],

  // Pool-race 12 — Heineken Grand Prix NEDERLAND (Zandvoort)
  // zandvoort: [ ... ],  // invullen na het sprintweekend

  // Pool-race 16 — Singapore Airlines Grand Prix SINGAPORE
  // marina_bay: [ ... ],  // invullen na het sprintweekend
};
