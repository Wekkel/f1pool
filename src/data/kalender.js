// src/data/kalender.js
// Sprintvlaggen conform de werkelijke sprintweekenden 2026 (en het
// officiële Excel-bestand van de pool): China, Miami, Canada,
// Groot-Brittannië, Nederland en Singapore.
// Bahrein en Saoedi-Arabië zijn afgelast; de pool telt daardoor 22 races.
export const KALENDER_2026 = [
  { nr: 1,  code: "AUS", naam: "Australië",        circuit: "Albert Park",             datum: "2026-03-08", sprint: false },
  { nr: 2,  code: "CHN", naam: "China",            circuit: "Shanghai International",  datum: "2026-03-15", sprint: true  },
  { nr: 3,  code: "JPN", naam: "Japan",            circuit: "Suzuka",                  datum: "2026-03-29", sprint: false },
  { nr: 4,  code: "BHR", naam: "Bahrein",          circuit: "Bahrain International",   datum: "2026-04-12", sprint: false, afgelast: true },
  { nr: 5,  code: "SAU", naam: "Saoedi-Arabië",    circuit: "Jeddah",                  datum: "2026-04-19", sprint: false, afgelast: true },
  { nr: 6,  code: "MIA", naam: "Miami",            circuit: "Miami International",     datum: "2026-05-03", sprint: true  },
  { nr: 7,  code: "CAN", naam: "Canada",           circuit: "Gilles Villeneuve",       datum: "2026-05-24", sprint: true  },
  { nr: 8,  code: "MON", naam: "Monaco",           circuit: "Circuit de Monaco",       datum: "2026-06-07", sprint: false },
  { nr: 9,  code: "ESP", naam: "Catalonië",        circuit: "Circuit de Catalunya",    datum: "2026-06-14", sprint: false },
  { nr: 10, code: "AUT", naam: "Oostenrijk",       circuit: "Red Bull Ring",           datum: "2026-06-28", sprint: false },
  { nr: 11, code: "GBR", naam: "Groot-Brittannië", circuit: "Silverstone",             datum: "2026-07-05", sprint: true  },
  { nr: 12, code: "BEL", naam: "België",           circuit: "Spa-Francorchamps",       datum: "2026-07-19", sprint: false },
  { nr: 13, code: "HUN", naam: "Hongarije",        circuit: "Hungaroring",             datum: "2026-07-26", sprint: false },
  { nr: 14, code: "NED", naam: "Nederland",        circuit: "Zandvoort",               datum: "2026-08-23", sprint: true  },
  { nr: 15, code: "ITA", naam: "Italië",           circuit: "Monza",                   datum: "2026-09-06", sprint: false },
  { nr: 16, code: "MAD", naam: "Spanje (Madrid)",  circuit: "Circuito de Madrid",      datum: "2026-09-13", sprint: false },
  { nr: 17, code: "AZE", naam: "Azerbeidzjan",     circuit: "Baku City Circuit",       datum: "2026-09-26", sprint: false },
  { nr: 18, code: "SGP", naam: "Singapore",        circuit: "Marina Bay",              datum: "2026-10-11", sprint: true  },
  { nr: 19, code: "USA", naam: "Verenigde Staten", circuit: "Circuit of the Americas", datum: "2026-10-25", sprint: false },
  { nr: 20, code: "MEX", naam: "Mexico Stad",      circuit: "Hermanos Rodríguez",      datum: "2026-11-01", sprint: false },
  { nr: 21, code: "BRA", naam: "São Paulo",        circuit: "Interlagos",              datum: "2026-11-08", sprint: false },
  { nr: 22, code: "LVG", naam: "Las Vegas",        circuit: "Las Vegas Strip",         datum: "2026-11-21", sprint: false },
  { nr: 23, code: "QAT", naam: "Qatar",            circuit: "Lusail International",    datum: "2026-11-29", sprint: false },
  { nr: 24, code: "ABU", naam: "Abu Dhabi",        circuit: "Yas Marina",              datum: "2026-12-06", sprint: false },
];

// Alleen de races die daadwerkelijk verreden worden (poolnummering 1-22)
export const GEPLANDE_RACES = KALENDER_2026.filter(r => !r.afgelast);

// Landcodes voor vlaggen (flagcdn.com formaat)
export const VLAG_CODES = {
  AUS: "au", CHN: "cn", JPN: "jp", BHR: "bh", SAU: "sa",
  MIA: "us", CAN: "ca", MON: "mc", ESP: "es", AUT: "at",
  GBR: "gb", BEL: "be", HUN: "hu", NED: "nl", ITA: "it",
  MAD: "es", AZE: "az", SGP: "sg", USA: "us", MEX: "mx",
  BRA: "br", LVG: "us", QAT: "qa", ABU: "ae",
};
