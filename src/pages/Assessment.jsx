import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AssessmentCard from "../components/AssessmentCard.jsx";
import Button from "../components/Button.jsx";
import QuestionCard from "../components/QuestionCard.jsx";
import {
  allQuestionIds,
  computeResult,
  getSurvey,
  isReversed,
} from "../data/questions.js";

// Generic subsection labels — overrides the per-system titles in
// Assessment_*.json so every system shows the same two labels (no sense name).
const SUBSECTION_HEADS = {
  preferences: "ระดับความชอบ (PREFERENCES)",
  arousals: "ระดับความตื่นตัว (AROUSALS)",
};

export default function Assessment({ ageGroup }) {
  const navigate = useNavigate();
  const survey = useMemo(() => getSurvey(ageGroup), [ageGroup]);
  const [answers, setAnswers] = useState({});

  const setAns = (id, v) => setAnswers((p) => ({ ...p, [id]: v }));
  const reset = () => setAnswers({});

  const submit = () => {
    const ids = allQuestionIds(survey);
    const missing = ids.filter((id) => answers[id] == null);
    if (missing.length > 0) {
      alert(`กรุณาทำแบบประเมินให้ครบทุกข้อ (เหลืออีก ${missing.length} ข้อ)`);
      const target = document.getElementById(missing[0]);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    const result = computeResult(survey, answers);
    navigate("/result", {
      state: {
        result,
        resulttitle: survey.resulttitle,
        answers,
        ageGroup,
      },
    });
  };

  return (
    <section className="sz-fade sz-section">
      <h1 className="sz-page-title">{survey.title}</h1>
      <p className="sz-meta">Target age: {survey.targetAge}</p>

      {survey.Assessment.map((system) => (
        <AssessmentCard key={system.id} title={system.title}>
          {system.children.map((sub) => (
            <div className="sz-subsection" key={`${system.id}-${sub.id}`}>
              <h6 className="sz-subsection-head">
                {SUBSECTION_HEADS[sub.id] ?? sub.title}
              </h6>
              {sub.questions.map((q) => (
                <QuestionCard
                  key={q.id}
                  id={q.id}
                  text={q.text}
                  value={answers[q.id]}
                  onChange={(v) => setAns(q.id, v)}
                  scaleReversed={isReversed(sub, q)}
                  choiceSet={q.choiceSet ?? sub.choiceSet}
                />
              ))}
            </div>
          ))}
        </AssessmentCard>
      ))}

      <div className="sz-button-row sz-button-row-end">
        <Button variant="danger" onClick={reset}>
          Reset
        </Button>
        <Button onClick={submit}>Next</Button>
      </div>
    </section>
  );
}
