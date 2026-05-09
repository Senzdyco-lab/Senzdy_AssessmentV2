// App.jsx — click-thru of the four routes (Intro / Age / Assessment / Result)
const SIGHT_QUESTIONS = [
  { id: "s1", text: "ชอบเวลามีผู้คนอยู่รายรอบ" },
  { id: "s2", text: "ชอบอยู่ในที่มีคนพลุกพล่าน เช่น ห้างสรรพค้า งานเทศกาล" },
  { id: "s3", text: "ชอบมองผู้คนหรือยานพาหนะที่ผ่านไปมา" },
  { id: "s4", text: "ชอบแต่งกายด้วยโทนสีสดใส" },
  { id: "s5", text: "ชอบมองคนที่แต่งกายโทนสีสดใส" },
];

const SAMPLE_RESULT = {
  series: [
    { label: "Preferences", color: "#1daf00", data: [35, 35, 25, 60, 25, 55] },
    { label: "Arousals",    color: "#b61a1a", data: [65, 65, 45, 25, 35, 75] },
  ],
  labels: ["Sight", "Auditory", "Olfactory", "Touch", "Vestibular", "Proprioceptive"],
  rows: [
    { system: "Sight",                preferences: 35, arousals: 65, result: "Passion" },
    { system: "Auditory",             preferences: 35, arousals: 65, result: "Passion" },
    { system: "Olfactory & Gustation",preferences: 25, arousals: 45, result: "Relaxation" },
    { system: "Touch",                preferences: 60, arousals: 25, result: "Boredom" },
    { system: "Vestibular",           preferences: 25, arousals: 35, result: "Worry" },
    { system: "Proprioceptive",       preferences: 55, arousals: 75, result: "Flow" },
  ],
};

function App() {
  const [route, setRoute] = React.useState("intro"); // intro | survey | result
  const [answers, setAnswers] = React.useState({});

  const setAns = (id, v) => setAnswers((p) => ({ ...p, [id]: v }));
  const reset = () => setAnswers({});

  const submit = () => {
    if (SIGHT_QUESTIONS.every((q) => answers[q.id] != null)) setRoute("result");
    else alert("Please complete all questions");
  };

  return (
    <div className="sz-app">
      <Header />
      <main className="sz-container sz-main">
        {route === "intro" && (
          <section className="sz-fade sz-section">
            <h6 className="sz-eyebrow">Development of Thai Sensory Patterns Assessment Tool</h6>
            <p className="sz-intro-text">เลือกช่วงอายุของคุณ!</p>
            <div className="sz-button-row">
              <Button onClick={() => setRoute("survey")}>3-12</Button>
              <Button onClick={() => setRoute("survey")}>13+</Button>
            </div>
          </section>
        )}

        {route === "survey" && (
          <section className="sz-fade sz-section">
            <h1 className="sz-page-title">แบบประเมินความต้องการรับรู้ประสาทสัมผัส</h1>
            <p className="sz-meta">Target age: 13+ ปี</p>
            <ScoreLegend />
            <AssessmentCard title="ด้านการมองเห็น (Sight System)">
              {SIGHT_QUESTIONS.map((q) => (
                <QuestionCard
                  key={q.id}
                  id={q.id}
                  text={q.text}
                  value={answers[q.id]}
                  onChange={(v) => setAns(q.id, v)}
                />
              ))}
            </AssessmentCard>
            <div className="sz-button-row sz-button-row-end">
              <Button variant="danger" onClick={reset}>Reset</Button>
              <Button onClick={submit}>Next</Button>
            </div>
            <p className="sz-meta sz-disclaimer">
              Demo shows the Sight system only. Production runs all six sensory systems.
            </p>
          </section>
        )}

        {route === "result" && (
          <section className="sz-fade sz-section">
            <h2 className="sz-section-title">ผลการประเมินวัยรุ่นและผู้ใหญ่</h2>
            <RadarChart series={SAMPLE_RESULT.series} labels={SAMPLE_RESULT.labels} />
            <ResultTable rows={SAMPLE_RESULT.rows} />
            <div className="sz-button-row">
              <Button onClick={() => setRoute("survey")}>Edit</Button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
window.App = App;
