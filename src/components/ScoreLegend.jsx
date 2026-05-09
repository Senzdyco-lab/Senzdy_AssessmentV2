const SCORE_LEGEND = [
  { title: "ไม่เคย", desc: "ไม่เคยรู้สึกชอบ" },
  { title: "น้อยครั้ง", desc: "นาน ๆ จึงจะรู้สึกชอบสักครั้งหนึ่ง" },
  { title: "บางครั้ง", desc: "รู้สึกชอบเป็นบางครั้ง" },
  { title: "บ่อยครั้ง", desc: "รู้สึกชอบเกือบทุกครั้ง" },
  { title: "ทุกครั้ง", desc: "รู้สึกชอบทุกครั้ง" },
];

export default function ScoreLegend() {
  return (
    <section className="sz-card sz-legend">
      <header className="sz-system-head">เกณฑ์การให้คะแนน</header>
      <table className="sz-legend-table">
        <tbody>
          {SCORE_LEGEND.map((row) => (
            <tr key={row.title}>
              <td className="k">{row.title}</td>
              <td>{row.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
