// RadarChart.jsx — 6-axis radar with two series, mimics ApexCharts production output
function RadarChart({ series, labels }) {
  const N = labels.length;
  const R = 120; // outer radius
  const rings = 5;
  const angle = (i) => -Math.PI / 2 + (i * 2 * Math.PI) / N;

  const point = (val, i, max = 100) => {
    const r = (val / max) * R;
    const a = angle(i);
    return [Math.cos(a) * r, Math.sin(a) * r];
  };

  const polyForRing = (k) => {
    const r = (k / rings) * R;
    return Array.from({ length: N }, (_, i) => {
      const a = angle(i);
      return [Math.cos(a) * r, Math.sin(a) * r].map((n) => n.toFixed(2)).join(",");
    }).join(" ");
  };

  const seriesPoly = (data) =>
    data.map((v, i) => point(v, i).map((n) => n.toFixed(2)).join(",")).join(" ");

  const labelPos = (i) => {
    const r = R + 18;
    const a = angle(i);
    return [Math.cos(a) * r, Math.sin(a) * r];
  };

  return (
    <div className="sz-radar-wrap">
      <svg viewBox="-180 -160 360 320" className="sz-radar">
        <g className="sz-radar-grid">
          {Array.from({ length: rings }, (_, k) => (
            <polygon key={k} points={polyForRing(k + 1)} />
          ))}
          {Array.from({ length: N }, (_, i) => {
            const [x, y] = point(100, i);
            return <line key={i} x1={0} y1={0} x2={x.toFixed(2)} y2={y.toFixed(2)} />;
          })}
        </g>
        {series.map((s) => (
          <g key={s.label}>
            <polygon
              points={seriesPoly(s.data)}
              fill={s.color}
              fillOpacity="0.18"
              stroke={s.color}
              strokeWidth="1.5"
            />
            {s.data.map((v, i) => {
              const [x, y] = point(v, i);
              return (
                <g key={i}>
                  <circle cx={x} cy={y} r="3" fill="#fff" stroke={s.color} strokeWidth="2" />
                  <text x={x} y={y - 7} textAnchor="middle" className="sz-radar-val" fill={s.color}>
                    {v}
                  </text>
                </g>
              );
            })}
          </g>
        ))}
        {labels.map((lbl, i) => {
          const [x, y] = labelPos(i);
          return (
            <text
              key={lbl}
              x={x.toFixed(1)}
              y={y.toFixed(1)}
              textAnchor={x > 5 ? "start" : x < -5 ? "end" : "middle"}
              dominantBaseline="middle"
              className="sz-radar-lbl"
            >
              {lbl}
            </text>
          );
        })}
      </svg>
      <div className="sz-radar-legend">
        {series.map((s) => (
          <span key={s.label}>
            <i style={{ background: s.color }} />
            {s.label}
          </span>
        ))}
      </div>
    </div>
  );
}
window.RadarChart = RadarChart;
