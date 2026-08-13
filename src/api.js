const API_BASE = "http://localhost:8020";

export async function startScrape(query) {
  const res = await fetch(`${API_BASE}/scrape`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query}),
  });
  if (!res.ok) throw new Error("Failed to start scrape job");
  return res.json();
}

export async function getScrapeStatus(jobId) {
  const res = await fetch(`${API_BASE}/scrape/${jobId}`);
  if (!res.ok) throw new Error("Failed to fetch job status");
  return res.json();
}
