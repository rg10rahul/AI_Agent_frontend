import { useEffect, useRef, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import { getScrapeStatus, startScrape } from "./api";
import ResultsPage from "./Pages/ResultsPage";
import SearchPage from "./Pages/SearchPage";
import Sidebar from "./components/Sidebar";


const APP_NAME = "AutoCompare";

const STATUS_STYLES = {
  idle: "border-white/15 text-white/50",
  running: "border-amber-400/30 text-amber-300",
  done: "border-emerald-400/30 text-emerald-300",
  failed: "border-red-400/30 text-red-300",
};

const STATUS_DOT = {
  idle: "bg-white/30",
  running: "bg-amber-400 animate-pulse-dot",
  done: "bg-emerald-400",
  failed: "bg-red-400",
};

const STATUS_LABEL = {
  idle: "Idle",
  running: "Searching…",
  done: "Done",
  failed: "Failed",
};

function Logo() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="6" fill="#4F46E5" />
      <path
        d="M6 15.5 9 9h6l3 6.5M6 15.5h12M6 15.5v2a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1M18 15.5v2a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1"
        stroke="white"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function App() {
  const [jobId, setJobId] = useState(null);
  const [status, setStatus] = useState("idle");
  const [progress, setProgress] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const pollRef = useRef(null);
  const navigate = useNavigate();

  async function handleSubmit(query) {
    setError(null);
    setResult(null);
    setProgress(null);
    setStatus("running");
    try {
      const { job_id } = await startScrape(query);
      setJobId(job_id);
    } catch (err) {
      setError(err.message);
      setStatus("failed");
    }
  }

  useEffect(() => {
    if (!jobId || status !== "running") return;

    pollRef.current = setInterval(async () => {
      try {
        const job = await getScrapeStatus(jobId);
        if (job.status === "done") {
          setResult(job.result);
          setStatus("done");
          navigate("/results");
          clearInterval(pollRef.current);
        } else if (job.status === "failed") {
          setError(job.error || "Search failed");
          setStatus("failed");
          clearInterval(pollRef.current);
        } else if (job.status === "running") {
          setProgress(job.progress ?? null);
        }
      } catch (err) {
        setError(err.message);
        setStatus("failed");
        clearInterval(pollRef.current);
      }
    }, 1500);

    return () => clearInterval(pollRef.current);
  }, [jobId, status, navigate]);

  const hasResults = result !== null;

  return (
    <div
      className="min-h-screen grid bg-bg
                 grid-cols-[224px_1fr] grid-rows-[60px_1fr]
                 max-md:grid-cols-1 max-md:grid-rows-[60px_auto_1fr]"
    >
      <header className="col-span-2 max-md:col-span-1 flex items-center justify-between px-6 bg-header border-b border-header-border">
        <div className="flex items-center gap-2.5">
          <Logo />
          <span className="font-bold text-[17px] tracking-tight text-white">{APP_NAME}</span>
          <span className="hidden md:inline text-[13px] text-white/40 ml-1">
            car price comparison
          </span>
        </div>
        <span
          className={`flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full border ${STATUS_STYLES[status]}`}
        >
          <span className={`w-[7px] h-[7px] rounded-full ${STATUS_DOT[status]}`} />
          {STATUS_LABEL[status]}
        </span>
      </header>

      <Sidebar hasResults={hasResults} resultCount={result?.cars?.length ?? 0} />

      <main className="row-start-2 col-start-2 max-md:col-start-1 max-md:row-start-3 p-8 max-md:p-5 max-w-[960px]">
        <Routes>
          <Route path="/" element={<Navigate to="/search" replace />} />
          <Route
            path="/search"
            element={
              <SearchPage
                onSubmit={handleSubmit}
                status={status}
                progress={progress}
                error={error}
              />
            }
          />
          <Route
            path="/results"
            element={hasResults ? <ResultsPage result={result} /> : <Navigate to="/search" replace />}
          />
        </Routes>
      </main>
    </div>
  );
}