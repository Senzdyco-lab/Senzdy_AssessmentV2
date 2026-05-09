// Header.jsx — Senzdy top bar
function Header() {
  return (
    <header className="sz-header">
      <div className="sz-container sz-header-row">
        <a href="#" className="sz-wordmark">Senzdy</a>
        <nav className="sz-nav">
          <a className="sz-nav-link">About</a>
          <Button onClick={() => {}}>Contact</Button>
        </nav>
      </div>
    </header>
  );
}
window.Header = Header;
