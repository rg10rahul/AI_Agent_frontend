import { useState } from "react";

export default function SearchForm({ onSubmit, disabled }) {
  const [query, setQuery] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (!query.trim()) return;
    onSubmit(query.trim());
  }

  return (
    <form className="bg-surface border border-border rounded-xl shadow-sm p-6" onSubmit={handleSubmit}>
      <label className="block text-sm font-medium text-text mb-4" htmlFor="query">
        What are you looking for?
      </label>
      <input
        id="query"
        className="w-full px-3.5 py-4 rounded-lg border border-border-strong bg-bg text-text font-mono text-[15px]
                   focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary-soft transition-colors
                   disabled:opacity-60"
        placeholder="cars below 15L, best mileage under 10L, Honda City under 12L…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        disabled={disabled}
      />
      <div className="mt-6 flex justify-center">
        <button
          className="mt-4 px-6 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-lg
                    text-sm font-semibold shadow-sm transition-colors
                    disabled:opacity-55 disabled:cursor-not-allowed"
          type="submit"
          disabled={disabled}
        >
          {disabled ? "Searching…" : "Find the best deal"}
        </button>
      </div>
    </form>
  );
}