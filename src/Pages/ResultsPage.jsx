import ResultsTable from "../components/ResultsTable";
import VerdictCard from "../components/VerdictCard";

export default function ResultsPage({ result }) {
  const hasResults = result !== null;

  return (
    <>
      <h2 className="m-0 mb-1 text-2xl font-bold tracking-tight">Results</h2>
      <p className="m-0 mb-6 text-text-muted max-w-[56ch]">
        Ranked by what matches your search — the top card is the agent's pick.
      </p>

      {hasResults ? (
        <>
          <VerdictCard verdict={result.verdict} />
          <ResultsTable
            cars={result.cars}
            bestBuyCar={result.verdict?.best_buy_car}
          />
          {result.failed_sites?.length > 0 && (
            <p className="mt-4 text-sm text-text-muted">
              Could not fetch: {result.failed_sites.join(", ")}
            </p>
          )}
        </>
      ) : (
        <div className="bg-surface border border-dashed border-border-strong rounded-xl px-6 py-10 text-center text-text-muted">
          Run a search first — results will land here.
        </div>
      )}
    </>
  );
}