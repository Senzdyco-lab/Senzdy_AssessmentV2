import { useEffect } from "react";
import { createPortal } from "react-dom";
import { SERIES_COLORS, SYSTEM_LABELS } from "../data/questions.js";
import RadarChart from "./RadarChart.jsx";

// Reverse map: saved scores carry the long label (e.g. "Olfactory & Gustation");
// the radar wants the short axis label so it fits in the viewBox.
const LONG_TO_SHORT = Object.fromEntries(
  Object.values(SYSTEM_LABELS).map((l) => [l.long, l.short])
);

function buildRadarSeriesFromScores(scores) {
  const labels = scores.map((r) => LONG_TO_SHORT[r.system] ?? r.system);
  const series = [
    {
      label: "Preferences",
      color: SERIES_COLORS.preferences,
      data: scores.map((r) => r.preferences),
    },
    {
      label: "Arousals",
      color: SERIES_COLORS.arousals,
      data: scores.map((r) => r.arousals),
    },
  ];
  return { labels, series };
}

export default function AdminDetailModal({ row, onClose }) {
  // Lock body scroll while modal is open + close on Escape.
  useEffect(() => {
    if (!row) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [row, onClose]);

  if (!row) return null;
  const { labels, series } = buildRadarSeriesFromScores(row.scores ?? []);
  const answersList = Object.entries(row.answers ?? {});

  return createPortal(
    <div className="sz-modal-backdrop" onClick={onClose}>
      <div className="sz-modal" onClick={(e) => e.stopPropagation()}>
        <div className="sz-modal-head">
          <div>
            <div className="sz-modal-title">
              {row.contact || "Anonymous submission"}
            </div>
            <div className="sz-modal-meta">
              {new Date(row.created_at).toLocaleString()} · {row.age_group}
            </div>
          </div>
          <button type="button" className="sz-modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="sz-modal-body">
          <RadarChart series={series} labels={labels} />

          <table className="sz-result-table">
            <thead>
              <tr>
                <th>System</th>
                <th>Preferences</th>
                <th>Arousals</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {(row.scores ?? []).map((r) => (
                <tr key={r.system}>
                  <td className="system">{r.system}</td>
                  <td>{r.preferences}%</td>
                  <td>{r.arousals}%</td>
                  <td className="result">{r.result}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <details className="sz-modal-raw">
            <summary>Raw answers ({answersList.length})</summary>
            <div className="sz-modal-raw-grid">
              {answersList.map(([qid, val]) => (
                <div key={qid} className="sz-modal-raw-cell">
                  <span className="qid">{qid}</span>
                  <span className="val">{String(val)}</span>
                </div>
              ))}
            </div>
          </details>
        </div>
      </div>
    </div>,
    document.body
  );
}
