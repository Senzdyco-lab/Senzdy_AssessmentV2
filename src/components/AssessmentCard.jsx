export default function AssessmentCard({ title, icon, children }) {
  return (
    <section className="sz-card sz-system">
      <header className="sz-system-head">
        {icon && <span className="sz-system-icon">{icon}</span>}
        <span>{title}</span>
      </header>
      <div className="sz-system-body">{children}</div>
    </section>
  );
}
