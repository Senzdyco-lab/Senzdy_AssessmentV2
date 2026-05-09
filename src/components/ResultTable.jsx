import { useMemo, useState } from "react";
import { SERIES_COLORS } from "../data/questions.js";

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
      {sortable && sortKey === k && <span className="caret">{dir > 0 ? " ▲" : " ▼"}</span>}
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
            <td className="result">{r.result}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
