export default function ResultsTable({ cars, bestBuyCar }) {
  if (!cars || cars.length === 0) return null;

  return (
    <div className="bg-surface border border-border rounded-xl shadow-sm overflow-x-auto">
      <table className="w-full border-collapse text-[13.5px]">
        <thead>
          <tr>
            {["Car / Variant", "Best price", "Best site", "Fuel", "Transmission", "Mileage", "Rating", "All prices"].map(
              (col) => (
                <th
                  key={col}
                  className="text-left px-3 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-text-muted border-b border-border whitespace-nowrap"
                >
                  {col}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {cars.map((car, i) => {
            const isBest = car.name === bestBuyCar;
            return (
              <tr
                key={i}
                className={`hover:bg-surface-muted transition-colors ${
                  isBest ? "bg-primary-soft/60 shadow-[inset_3px_0_0_0_var(--color-primary)]" : ""
                }`}
              >
                <td className="px-3 py-2.5 border-b border-border align-top">
                  <span className="block font-medium text-text">{car.name}</span>
                  {car.variant && (
                    <span className="block text-xs text-text-muted mt-0.5">{car.variant}</span>
                  )}
                </td>
                <td className="px-3 py-2.5 border-b border-border align-top font-mono mono">
                  ₹{(car.best_price / 100000).toFixed(2)}L
                </td>
                <td className="px-3 py-2.5 border-b border-border align-top">{car.best_site}</td>
                <td className="px-3 py-2.5 border-b border-border align-top">{car.fuel_type ?? "—"}</td>
                <td className="px-3 py-2.5 border-b border-border align-top">{car.transmission ?? "—"}</td>
                <td className="px-3 py-2.5 border-b border-border align-top font-mono mono">
                  {car.mileage ?? "—"}
                </td>
                <td className="px-3 py-2.5 border-b border-border align-top font-mono mono">
                  {car.rating != null ? car.rating.toFixed(2) : "—"}
                </td>
                <td className="px-3 py-2.5 border-b border-border align-top">
                  <div className="flex flex-col gap-1">
                    {car.prices.map((p) => (
                      <span
                        key={p.site}
                        className="font-mono text-[11.5px] text-text-muted bg-surface-muted border border-border rounded-full px-2.5 py-0.5 w-fit"
                      >
                        {p.site}: ₹{(p.price / 100000).toFixed(2)}L
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}