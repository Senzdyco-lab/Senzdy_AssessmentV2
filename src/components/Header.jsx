import { Link } from "react-router-dom";
import Button from "./Button.jsx";
import bellbellLogo from "../assets/img/bellbell-logo.jpg";

export default function Header() {
  return (
    <header className="sz-header">
      <div className="sz-container sz-header-row">
        <Link to="/" className="sz-wordmark">
          <img src={bellbellLogo} alt="" className="sz-wordmark-logo" />
          <span>Senzdy</span>
        </Link>
        <nav className="sz-nav">
          <a className="sz-nav-link">About</a>
          <Button size="sm" onClick={() => {}}>Contact</Button>
        </nav>
      </div>
    </header>
  );
}
