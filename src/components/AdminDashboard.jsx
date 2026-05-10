import { useEffect, useMemo, useState } from "react";
import Button from "./Button.jsx";
import AdminDetailModal from "./AdminDetailModal.jsx";
import { deleteResult, listResults, signOut } from "../lib/supabase.js";

const CSV_COLUMNS = [
  { key: "created_at", label: "Submitted at" },
  { key: "age_group", label: "Age group" },
  { key: "contact", label: "Contact" },
];

function escapeCsv(v) {
  if (v == null) return "";
  const s = String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function rowsToCsv(rows) {
  if (rows.length === 0) return "";
  const systemNames = (rows[0].scores ?? []).map((s) => s.system);
  const headers = [
    ...CSV_COLUMNS.map((c) => c.label),
    ...systemNames.flatMap((s) => [`${s} pref`, `${s} arou`, `${s} result`]),
  ];
  const lines = [headers.map(escapeCsv).join(",")];
  for (const r of rows) {
    const base = CSV_COLUMNS.map((c) =>
      c.key === "created_at" ? new Date(r[c.key]).toISOString() : r[c.key]
    );
    const scoreCells = (r.scores ?? []).flatMap((s) => [
      s.preferences,
      s.arousals,
      s.result,
    ]);
    lines.push([...base, ...scoreCells].map(escapeCsv).join(","));
  }
  return lines.join("\n");
}

function downloadCsv(csv, filename) {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

export default function AdminDashboard({ session }) {
  const [search, setSearch] = useState("");
  const [ageGroup, setAgeGroup] = useState("all");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openRow, setOpenRow] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [sortDir, setSortDir] = useState("desc"); // 'desc' = newest first

  const load = async (filters) => {
    setLoading(true);
    setError("");
    try {
      const data = await listResults(filters);
      setRows(data);
    } catch (err) {
      setError(err?.message || "Failed to load");
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    load({ search: "", ageGroup: "all" });
  }, []);

  // Debounced search/filter
  useEffect(() => {
    const handle = setTimeout(() => load({ search, ageGroup }), 300);
    return () => clearTimeout(handle);
  }, [search, ageGroup]);

  const counts = useMemo(() => {
    const total = rows.length;
    const byGroup = rows.reduce(
      (acc, r) => ({ ...acc, [r.age_group]: (acc[r.age_group] ?? 0) + 1 }),
      {}
    );
    return { total, byGroup };
  }, [rows]);

  const sortedRows = useMemo(() => {
    const dir = sortDir === "asc" ? 1 : -1;
    return [...rows].sort(
      (a, b) =>
        (new Date(a.created_at).getTime() - new Date(b.created_at).getTime()) *
        dir
    );
  }, [rows, sortDir]);

  const toggleSort = () =>
    setSortDir((d) => (d === "desc" ? "asc" : "desc"));

  const exportCsv = () => {
    if (sortedRows.length === 0) return;
    const stamp = new Date().toISOString().slice(0, 10);
    downloadCsv(rowsToCsv(sortedRows), `senzdy-results-${stamp}.csv`);
  };

  const onDelete = async (row) => {
    if (deletingId) return;
    if (!window.confirm(`Delete this submission from ${new Date(row.created_at).toLocaleString()}? This cannot be undone.`)) {
      return;
    }
    setDeletingId(row.id);
    try {
      await deleteResult(row.id);
      setRows((prev) => prev.filter((r) => r.id !== row.id));
    } catch (err) {
      alert(err?.message || "Delete failed");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="sz-admin">
      <header className="sz-admin-head">
        <div>
          <h2 className="sz-page-title">Admin · Submissions</h2>
          <p className="sz-meta">
            Signed in as {session?.user?.email} · {counts.total} result
            {counts.total === 1 ? "" : "s"}
            {counts.byGroup["3-12"] != null && ` · 3-12: ${counts.byGroup["3-12"]}`}
            {counts.byGroup["13+"] != null && ` · 13+: ${counts.byGroup["13+"]}`}
          </p>
        </div>
        <Button size="sm" variant="outline" onClick={() => signOut()}>
          Sign out
        </Button>
      </header>

      <div className="sz-admin-toolbar">
        <input
          type="text"
          className="sz-input"
          placeholder="Search by email or phone…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="sz-select"
          value={ageGroup}
          onChange={(e) => setAgeGroup(e.target.value)}
        >
          <option value="all">All ages</option>
          <option value="3-12">3-12</option>
          <option value="13+">13+</option>
        </select>
        <Button size="sm" variant="outline" onClick={exportCsv}>
          Export CSV
        </Button>
      </div>

      {error && <p className="sz-admin-error">{error}</p>}

      <div className="sz-admin-tablewrap">
        <table className="sz-admin-table">
          <thead>
            <tr>
              <th
                className="sortable"
                onClick={toggleSort}
                aria-sort={sortDir === "asc" ? "ascending" : "descending"}
              >
                Date <span className="caret">{sortDir === "asc" ? "▲" : "▼"}</span>
              </th>
              <th>Age</th>
              <th>Contact</th>
              <th>Top result</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={5} className="sz-admin-empty">Loading…</td>
              </tr>
            )}
            {!loading && sortedRows.length === 0 && (
              <tr>
                <td colSpan={5} className="sz-admin-empty">No submissions yet.</td>
              </tr>
            )}
            {!loading &&
              sortedRows.map((row) => {
                const top = (row.scores ?? [])
                  .map((s) => `${s.system}: ${s.result}`)
                  .slice(0, 2)
                  .join(" · ");
                return (
                  <tr key={row.id}>
                    <td>{new Date(row.created_at).toLocaleString()}</td>
                    <td>{row.age_group}</td>
                    <td>{row.contact || <span className="muted">anonymous</span>}</td>
                    <td className="muted">{top}</td>
                    <td className="actions">
                      <button
                        type="button"
                        className="sz-link"
                        onClick={() => setOpenRow(row)}
                      >
                        View
                      </button>
                      <button
                        type="button"
                        className="sz-link sz-link-danger"
                        onClick={() => onDelete(row)}
                        disabled={deletingId === row.id}
                      >
                        {deletingId === row.id ? "Deleting…" : "Delete"}
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      <AdminDetailModal row={openRow} onClose={() => setOpenRow(null)} />
    </div>
  );
}
