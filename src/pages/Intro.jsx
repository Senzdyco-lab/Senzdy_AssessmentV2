import { useNavigate } from "react-router-dom";

export default function Intro() {
  const navigate = useNavigate();
  return (
    <section className="sz-fade sz-hero">
      <h1 className="sz-hero-title">Discover your sensory pattern</h1>
      <p className="sz-hero-sub">
        เลือกช่วงอายุของคุณเพื่อเริ่มต้นแบบประเมินความต้องการรับรู้ประสาทสัมผัส
      </p>
      <div className="sz-age-picker">
        <button
          type="button"
          className="sz-age"
          onClick={() => navigate("/assessment_3_12")}
        >
          <span className="sz-age-num">3–12</span>
          <span className="sz-age-lbl">Children</span>
        </button>
        <button
          type="button"
          className="sz-age"
          onClick={() => navigate("/assessment_13")}
        >
          <span className="sz-age-num">13+</span>
          <span className="sz-age-lbl">Teens &amp; adults</span>
        </button>
      </div>
    </section>
  );
}
