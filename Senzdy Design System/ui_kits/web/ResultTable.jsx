// ResultTable.jsx — System × Preferences × Arousals × Result
function ResultTable({ rows }) {
  const [sortKey, setSortKey] = React.useState(null);
  const [dir, setDir] = React.useState(1);

  const sorted = React.useMemo(() => {
    if (!sortKey) return rows;
    return [...rows].sort((a, b) => (a[sortKey] - b[sortKey]) * dir);
  }, [rows, sortKey, dir]);

  const toggle = (k) => {
    if (sortKey === k) setDir((d) => -d);
    else { setSortKey(k); setDir(1); }
  };

  const header = (k, label, sortable) => (
    <th onClick={sortable ? () => toggle(k) : undefined}
        className={sortable ? "sortable" : ""}>
      {label}
      {sortable && sortKey === k && <span className="caret">{dir > 0 ? " ▲" : " ▼"}</span>}
    </th>
  );

  return (
    <table className="sz-result-table">
      <thead>
        <tr>
          {header("system", "System", false)}
          {header("preferences", <><i className="dot" style={{ background: "#1daf00" }} />Preferences</>, true)}
          {header("arousals", <><i className="dot" style={{ background: "#b61a1a" }} />Arousals</>, true)}
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
window.ResultTable = ResultTable;
