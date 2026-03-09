// src/api/jolpica.js
const BASE = "https://api.jolpi.ca/ergast/f1";
const CACHE_TTL = 5 * 60 * 1000; // 5 minuten

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

async function fetchJSON(url, cacheKey) {
  const cached = cacheGet(cacheKey);
  if (cached) return cached;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`API fout: ${res.status}`);
  const json = await res.json();
  cacheSet(cacheKey, json);
  return json;
}

export async function getRaceUitslagen(seizoen = 2026) {
  const json = await fetchJSON(
    `${BASE}/${seizoen}/results.json?limit=500`,
    `races_${seizoen}`
  );
  return json.MRData.RaceTable.Races;
}

export async function getKwaliUitslagen(seizoen = 2026) {
  const json = await fetchJSON(
    `${BASE}/${seizoen}/qualifying.json?limit=500`,
    `kwalis_${seizoen}`
  );
  return json.MRData.RaceTable.Races;
}

export async function getSprintUitslagen(seizoen = 2026) {
  const json = await fetchJSON(
    `${BASE}/${seizoen}/sprint.json?limit=500`,
    `sprints_${seizoen}`
  );
  return json.MRData.RaceTable.Races;
}

export async function getCoureurStand(seizoen = 2026) {
  const json = await fetchJSON(
    `${BASE}/${seizoen}/driverStandings.json`,
    `coureurstand_${seizoen}`
  );
  return json.MRData.StandingsTable.StandingsLists[0]?.DriverStandings || [];
}

export async function getConstructeurStand(seizoen = 2026) {
  const json = await fetchJSON(
    `${BASE}/${seizoen}/constructorStandings.json`,
    `constructeurstand_${seizoen}`
  );
  return json.MRData.StandingsTable.StandingsLists[0]?.ConstructorStandings || [];
}

export async function getRace(seizoen = 2026, ronde) {
  const json = await fetchJSON(
    `${BASE}/${seizoen}/${ronde}/results.json`,
    `race_${seizoen}_${ronde}`
  );
  return json.MRData.RaceTable.Races[0] || null;
}
