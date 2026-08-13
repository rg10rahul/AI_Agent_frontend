import { NavLink } from "react-router-dom";

function SearchIcon() {
  return (
    <svg className="w-[18px] h-[18px] flex-shrink-0" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7">
      <circle cx="8.5" cy="8.5" r="5.5" />
      <line x1="17" y1="17" x2="13" y2="13" strokeLinecap="round" />
    </svg>
  );
}

function ResultsIcon() {
  return (
    <svg className="w-[18px] h-[18px] flex-shrink-0" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7">
      <rect x="3" y="3.5" width="14" height="13" rx="2" />
      <line x1="6" y1="7.5" x2="14" y2="7.5" strokeLinecap="round" />
      <line x1="6" y1="10.5" x2="14" y2="10.5" strokeLinecap="round" />
      <line x1="6" y1="13.5" x2="10.5" y2="13.5" strokeLinecap="round" />
    </svg>
  );
}

const linkBase =
  "flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors border-l-[3px]";
const linkActive = "bg-primary-soft text-primary border-primary";
const linkInactive = "text-text-muted hover:bg-surface-muted hover:text-text border-transparent";
const linkBlocked = "text-text-muted border-transparent cursor-not-allowed";

export default function Sidebar({ resultCount, hasResults }) {
  return (
    <aside className="row-start-2 col-start-1 max-md:row-start-2 bg-surface border-r border-border max-md:border-r-0 max-md:border-b p-4 max-md:p-3 flex flex-col max-md:flex-row gap-1">
      <nav className="flex flex-col max-md:flex-row gap-1 w-full">
        <NavLink
          to="/search"
          className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkInactive}`}
        >
          <SearchIcon />
          Search
        </NavLink>
        <NavLink
          to="/results"
          className={({ isActive }) =>
            `${linkBase} ${!hasResults ? linkBlocked : isActive ? linkActive : linkInactive}`
          }
          onClick={(e) => {
            if (!hasResults) e.preventDefault();
          }}
          title={hasResults ? "" : "Run a search to see results"}
        >
          <ResultsIcon />
          Results
          {hasResults && (
            <span className="ml-auto text-[11px] font-mono px-1.5 py-0.5 rounded-full bg-primary text-white">
              {resultCount}
            </span>
          )}
        </NavLink>
      </nav>
    </aside>
  );
}