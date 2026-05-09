import LikertGroup from "./LikertGroup.jsx";

export default function QuestionCard({ id, text, value, onChange, scaleReversed }) {
  return (
    <div className="sz-card sz-question" id={id}>
      <div className="sz-question-text">{text}</div>
      <LikertGroup value={value} onChange={onChange} scaleReversed={scaleReversed} />
    </div>
  );
}
