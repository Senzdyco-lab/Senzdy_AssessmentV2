// Button.jsx — primary / danger button matching common/Button
function Button({ children, onClick, variant = "primary", style }) {
  const cls = "sz-btn sz-btn-" + variant;
  return (
    <button className={cls} onClick={onClick} style={style}>
      {children}
    </button>
  );
}
window.Button = Button;
