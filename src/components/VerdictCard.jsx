function CheckBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 bg-success-soft text-success text-xs font-semibold px-2.5 py-1 rounded-full">
      <svg width="12" height="12" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.4">
        <path d="M4 10.5 8 14.5 16 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Best deal
    </span>
  );
}

export default function VerdictCard({ verdict }) {
  if (!verdict) return null;

  return (
    <div className="bg-surface border border-border rounded-xl shadow-sm px-7 py-6 mb-6">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-semibold uppercase tracking-wide text-text-muted">Top pick</span>
        <CheckBadge />
      </div>
      <h2 className="mt-1 mb-0.5 text-[26px] font-bold tracking-tight">{verdict.best_buy_car}</h2>
      <p className="font-mono mono text-[15px] text-text-muted mb-3.5">
        ₹{(verdict.effective_price / 100000).toFixed(2)} L ex-showroom on{" "}
        <span className="text-primary">{verdict.best_buy_site}</span>
      </p>
      <p className="m-0 max-w-[60ch] text-text">{verdict.reason}</p>

      {verdict.runner_up && (
        <p className="mt-2.5 text-[13px] text-text-muted">Runner-up: {verdict.runner_up}</p>
      )}
      {verdict.avoid && (
        <p className="mt-2.5 text-[13px] text-danger">Avoid: {verdict.avoid}</p>
      )}
    </div>
  );
}