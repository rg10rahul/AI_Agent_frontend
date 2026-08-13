import AgentProgress from "../components/Agentprogress";
import SearchForm from "../components/SearchForm";

export default function SearchPage({ onSubmit, status, progress, error }) {
  return (
    <>
      <h2 className="m-0 mb-1 text-2xl font-bold tracking-tight">Search</h2>
      <p className="m-0 mb-6 text-text-muted max-w-[56ch]">
        Search new cars across CarDekho, CarWale, and ZigWheels by budget,
        mileage, or a specific model.
      </p>

      <SearchForm onSubmit={onSubmit} disabled={status === "running"} />

      <AgentProgress progress={progress} status={status} />

      {status === "failed" && error && (
        <p className="mt-4 text-sm text-danger">{error}</p>
      )}
    </>
  );
}