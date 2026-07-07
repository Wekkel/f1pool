// src/api/jolpica.js
const BASE = "https://api.jolpi.ca/ergast/f1";
const CACHE_TTL = 5 * 60 * 1000; // 5 minuten
const PAGE_SIZE = 100; // Jolpica accepteert maximaal limit=100 per verzoek

function cacheGet(key) {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw);
    if (Date.now() - ts > CACHE_TTL) {
      sessionStorage.removeItem(key);
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

function cacheSet(key, data) {
  try {
    sessionStorage.setItem(key, JSON.stringify({ data, ts: Date.now() }));
  } catch {
    // sessionStorage vol — negeer
  }
}

async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`API fout: ${res.status}`);
  return res.json();
}

/**
 * Voegt races uit meerdere pagina's samen. Eén race kan over een
 * paginagrens heen geknipt zijn (bijv. P1-P12 op pagina 1, P13-P22 op
 * pagina 2); in dat geval worden de resultaatlijsten aaneengeplakt.
 */
function mergeRaces(doel, nieuw, resultKey) {
  nieuw.forEach(race => {
    const bestaand = doel.find(r => r.round === race.round);
    if (bestaand) {
      bestaand[resultKey] = [...(bestaand[resultKey] || []), ...(race[resultKey] || [])];
    } else {
      doel.push(race);
    }
  });
  return doel;
}

/**
 * Haalt ALLE resultaten van een endpoint op, in pagina's van 100.
 * Jolpica plafonneert limit op 100, dus zonder paginering krijg je
 * slechts de eerste ~4,5 races van het seizoen binnen.
 */
async function fetchAllPages(path, resultKey, cacheKey) {
  const cached = cacheGet(cacheKey);
  if (cached) return cached;

  let races = [];
  let offset = 0;
  let totaal = Infinity;

  while (offset < totaal) {
    const json = await fetchJSON(`${BASE}${path}?limit=${PAGE_SIZE}&offset=${offset}`);
    totaal = Number(json.MRData.total);
    races = mergeRaces(races, json.MRData.RaceTable.Races, resultKey);
    offset += PAGE_SIZE;
  }

  cacheSet(cacheKey, races);
  return races;
}

export async function getRaceUitslagen(seizoen = 2026) {
  return fetchAllPages(`/${seizoen}/results.json`, "Results", `races_v2_${seizoen}`);
}

export async function getKwaliUitslagen(seizoen = 2026) {
  return fetchAllPages(`/${seizoen}/qualifying.json`, "QualifyingResults", `kwalis_v2_${seizoen}`);
}

export async function getSprintUitslagen(seizoen = 2026) {
  return fetchAllPages(`/${seizoen}/sprint.json`, "SprintResults", `sprints_v2_${seizoen}`);
}

export async function getCoureurStand(seizoen = 2026) {
  const cacheKey = `coureurstand_v2_${seizoen}`;
  const cached = cacheGet(cacheKey);
  if (cached) return cached;
  const json = await fetchJSON(`${BASE}/${seizoen}/driverStandings.json`);
  const data = json.MRData.StandingsTable.StandingsLists[0]?.DriverStandings || [];
  cacheSet(cacheKey, data);
  return data;
}

export async function getConstructeurStand(seizoen = 2026) {
  const cacheKey = `constructeurstand_v2_${seizoen}`;
  const cached = cacheGet(cacheKey);
  if (cached) return cached;
  const json = await fetchJSON(`${BASE}/${seizoen}/constructorStandings.json`);
  const data = json.MRData.StandingsTable.StandingsLists[0]?.ConstructorStandings || [];
  cacheSet(cacheKey, data);
  return data;
}

export async function getRace(seizoen = 2026, ronde) {
  const cacheKey = `race_v2_${seizoen}_${ronde}`;
  const cached = cacheGet(cacheKey);
  if (cached) return cached;
  const json = await fetchJSON(`${BASE}/${seizoen}/${ronde}/results.json?limit=${PAGE_SIZE}`);
  const data = json.MRData.RaceTable.Races[0] || null;
  cacheSet(cacheKey, data);
  return data;
}
