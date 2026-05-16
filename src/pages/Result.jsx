import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toPng } from "html-to-image";
import Button from "../components/Button.jsx";
import RadarChart from "../components/RadarChart.jsx";
import ResultTable from "../components/ResultTable.jsx";
import { saveResult } from "../lib/supabase.js";

export default function Result() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const result = state?.result;
  const answers = state?.answers;
  const ageGroup = state?.ageGroup;
  const title = state?.resulttitle ?? "ผลการประเมิน";
  const captureRef = useRef(null);
  const [saving, setSaving] = useState(false);
  const [contact, setContact] = useState("");
  const [submitState, setSubmitState] = useState("idle"); // idle | submitting | submitted

  if (!result) {
    return (
      <section className="sz-fade sz-section">
        <h2 className="sz-section-title">ยังไม่มีผลการประเมิน</h2>
        <p className="sz-meta sz-disclaimer">
          กรุณาทำแบบประเมินก่อน เพื่อดูผลลัพธ์
        </p>
        <div className="sz-button-row">
          <Button onClick={() => navigate("/")}>กลับหน้าแรก</Button>
        </div>
      </section>
    );
  }

  const saveAsPng = async () => {
    if (!captureRef.current || saving) return;
    setSaving(true);
    try {
      const dataUrl = await toPng(captureRef.current, {
        pixelRatio: 2,
        backgroundColor: "#ffffff",
        cacheBust: true,
      });
      const link = document.createElement("a");
      const stamp = new Date().toISOString().slice(0, 10);
      link.download = `senzdy-result-${stamp}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      alert("ไม่สามารถบันทึกผลลัพธ์ได้ กรุณาลองอีกครั้ง");
      console.error("PNG export failed:", err);
    } finally {
      setSaving(false);
    }
  };

  const submit = async () => {
    if (submitState === "submitting" || !answers || !ageGroup) return;
    setSubmitState("submitting");
    try {
      await saveResult({
        ageGroup,
        answers,
        scores: result.rows,
        contact,
      });
      setSubmitState("submitted");
    } catch (err) {
      console.error("Submit failed:", err);
      alert("ส่งผลลัพธ์ไม่สำเร็จ กรุณาลองอีกครั้ง");
      setSubmitState("idle");
    }
  };

  const submitDisabled = submitState !== "idle" || !answers;
  const submitLabel =
    submitState === "submitting"
      ? "กำลังส่ง…"
      : submitState === "submitted"
      ? "✓ ส่งแล้ว"
      : "Submit response";

  return (
    <section className="sz-fade sz-section">
      <div ref={captureRef} className="sz-result-capture">
        <h2 className="sz-section-title">{title}</h2>
        <RadarChart series={result.series} labels={result.labels} />
        <ResultTable rows={result.rows} />
      </div>

      <div className="sz-submit-row">
        <input
          type="text"
          className="sz-input"
          placeholder="อีเมลหรือเบอร์โทร (ไม่บังคับ)"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          disabled={submitState !== "idle"}
        />
        <Button onClick={submit} variant={submitDisabled ? "outline" : "primary"}>
          {submitLabel}
        </Button>
      </div>
      {submitState === "submitted" && (
        <button
          type="button"
          className="sz-resubmit"
          onClick={() => setSubmitState("idle")}
        >
          ส่งอีกครั้ง
        </button>
      )}

      <div className="sz-button-row">
        <Button
          variant="outline"
          onClick={() => {
            const path =
              ageGroup === "3-12" ? "/assessment_3_12" : "/assessment_13";
            navigate(path, { state: { initialAnswers: answers } });
          }}
        >
          Edit
        </Button>
        <Button onClick={saveAsPng}>
          {saving ? "Saving…" : "Save as PNG"}
        </Button>
      </div>
    </section>
  );
}
