import { useNavigate } from "react-router-dom";
import Button from "../components/Button.jsx";

export default function Intro() {
  const navigate = useNavigate();
  return (
    <section className="sz-fade sz-section sz-intro-section">
      <h6 className="sz-eyebrow">Development of Thai Sensory Patterns Assessment Tool</h6>
      <p className="sz-intro-text">เลือกช่วงอายุของคุณ!</p>
      <div className="sz-button-row">
        <Button size="lg" onClick={() => navigate("/assessment_3_12")}>3-12</Button>
        <Button size="lg" onClick={() => navigate("/assessment_13")}>13+</Button>
      </div>
    </section>
  );
}
