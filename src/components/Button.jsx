export default function Button({ children, onClick, variant = "primary", size, style, type = "button" }) {
  const sizeClass = size ? ` sz-btn-${size}` : "";
  return (
    <button type={type} className={`sz-btn sz-btn-${variant}${sizeClass}`} onClick={onClick} style={style}>
      {children}
    </button>
  );
}
