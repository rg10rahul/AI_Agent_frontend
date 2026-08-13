const MARKER_BASE = "w-[10px] h-[10px] mt-[3px] rounded-full border-2 z-10 flex-shrink-0";

const MARKER_STYLES = {
  done: "bg-primary border-primary",
  active: "bg-white border-primary animate-pulse-ring",
  pending: "bg-white border-border-strong",
  failed: "bg-danger border-danger",
};

const LABEL_STYLES = {
  done: "text-text",
  active: "text-text font-medium",
  pending: "text-text-faint",
  failed: "text-danger",
};

function Step({ status, label, note, isLast }) {
  return (
    <li className="relative flex gap-3.5 pb-5 last:pb-0">
      {!isLast && (
        <span className="absolute left-[4px] top-4 bottom-[-4px] w-px bg-border" />
      )}
      <span className={`${MARKER_BASE} ${MARKER_STYLES[status]}`} />
      <div>
        <span className={`text-[13.5px] ${LABEL_STYLES[status]}`}>{label}</span>
        {note && <span className="block text-xs text-text-muted mt-0.5">{note}</span>}
      </div>
    </li>
  );
}

export default function AgentProgress({ progress, status }) {
  if (status !== "running") return null;

  const sites = progress?.sites ?? [];
  const sitesKnown = sites.length > 0;
  const allSitesSettled =
    sitesKnown && sites.every((s) => s.status !== "pending" && s.status !== "active");
  const rankingStatus = allSitesSettled ? "active" : "pending";

  return (
    <ol className="mt-6 bg-surface border border-border rounded-xl shadow-sm px-5 pl-7 py-5">
      <Step status="done" label="Reading your request" />
      <Step status={sitesKnown ? "done" : "active"} label="Locating listings to check" />
      {sites.map((site) => (
        <Step
          key={site.url}
          status={site.status}
          label={`Checking ${site.domain}`}
          note={site.status === "failed" ? "Couldn't get usable data — skipped" : null}
        />
      ))}
      <Step status={rankingStatus} label="Comparing & ranking results" isLast />
    </ol>
  );
}