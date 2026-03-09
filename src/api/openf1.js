// src/api/openf1.js
// Gebruik alleen tijdens live events — anders Jolpica
const BASE = "https://api.openf1.org/v1";

export async function getLatestSession() {
  const res = await fetch(`${BASE}/sessions?year=2026&session_name=Race`);
  if (!res.ok) throw new Error(`OpenF1 fout: ${res.status}`);
  const data = await res.json();
  return data[data.length - 1] || null;
}

export async function getLivePosities(sessionKey) {
  const res = await fetch(`${BASE}/position?session_key=${sessionKey}`);
  if (!res.ok) throw new Error(`OpenF1 fout: ${res.status}`);
  return await res.json();
}
