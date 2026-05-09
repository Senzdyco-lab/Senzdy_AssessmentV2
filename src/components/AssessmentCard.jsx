export default function AssessmentCard({ title, children }) {
  return (
    <section className="sz-card sz-system">
      <header className="sz-system-head">{title}</header>
      <div className="sz-system-body">{children}</div>
    </section>
  );
}
