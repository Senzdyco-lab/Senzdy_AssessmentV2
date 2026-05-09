// QuestionCard.jsx — single question prompt + Likert
function QuestionCard({ id, text, value, onChange, scaleReversed }) {
  return (
    <div className="sz-card sz-question" id={id}>
      <div className="sz-question-text">{text}</div>
      <LikertGroup value={value} onChange={onChange} scaleReversed={scaleReversed} />
    </div>
  );
}
window.QuestionCard = QuestionCard;

// AssessmentCard.jsx — sensory system grouping card with purple head
function AssessmentCard({ title, children }) {
  return (
    <section className="sz-card sz-system">
      <header className="sz-system-head">{title}</header>
      <div className="sz-system-body">{children}</div>
    </section>
  );
}
window.AssessmentCard = AssessmentCard;
