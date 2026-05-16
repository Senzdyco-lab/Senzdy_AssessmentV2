import { useMemo, useState } from "react";
import { SERIES_COLORS } from "../data/questions.js";

// Map a criterion label (e.g. "Really Passion", "Mini Relax") to a chip class.
function resultClass(label) {
  const s = (label || "").toLowerCase();
  if (s.includes("flow")) return "flow";
  if (s.includes("passion")) return "passion";
  if (s.includes("control")) return "control";
  if (s.includes("relax")) return "relax";
  if (s.includes("worry")) return "worry";
  if (s.includes("anxiety")) return "anxiety";
  if (s.includes("avoider")) return "avoider";
  if (s.includes("boredom")) return "boredom";
  if (s.includes("apathy")) return "apathy";
  if (s.includes("seeker")) return "seeker";
  return "default";
}

export default function ResultTable({ rows }) {
  const [sortKey, setSortKey] = useState(null);
  const [dir, setDir] = useState(1);

  const sorted = useMemo(() => {
    if (!sortKey) return rows;
    return [...rows].sort((a, b) => (a[sortKey] - b[sortKey]) * dir);
  }, [rows, sortKey, dir]);

  const toggle = (k) => {
    if (sortKey === k) setDir((d) => -d);
    else {
      setSortKey(k);
      setDir(1);
    }
  };

  const header = (k, label, sortable) => (
    <th
      onClick={sortable ? () => toggle(k) : undefined}
      className={sortable ? "sortable" : ""}
    >
      {label}
      {sortable && sortKey === k && (
        <span className="caret">{dir > 0 ? " ▲" : " ▼"}</span>
      )}
    </th>
  );

  return (
    <table className="sz-result-table">
      <thead>
        <tr>
          {header("system", "System", false)}
          {header(
            "preferences",
            <>
              <i className="dot" style={{ background: SERIES_COLORS.preferences }} />
              Preferences
            </>,
            true
          )}
          {header(
            "arousals",
            <>
              <i className="dot" style={{ background: SERIES_COLORS.arousals }} />
              Arousals
            </>,
            true
          )}
          {header("result", "Result", false)}
        </tr>
      </thead>
      <tbody>
        {sorted.map((r) => (
          <tr key={r.system}>
            <td className="system">{r.system}</td>
            <td>{r.preferences}%</td>
            <td>{r.arousals}%</td>
            <td className="result">
              <span className={`sz-chip sz-chip-${resultClass(r.result)}`}>
                {r.result}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
