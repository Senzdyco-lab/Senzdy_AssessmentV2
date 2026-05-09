// LikertGroup.jsx — 5-point Thai Likert (matches PurpleRadioButton/PurpleRadioGroup)
const CHOICES_HIGH = [
  { text: "ไม่เคย",   value: 0 },
  { text: "น้อยครั้ง", value: 1 },
  { text: "บางครั้ง",  value: 2 },
  { text: "บ่อยครั้ง", value: 3 },
  { text: "ทุกครั้ง",  value: 4 },
];
const CHOICES_LOW = CHOICES_HIGH.map((c, i) => ({ text: c.text, value: 4 - i }));

function LikertGroup({ value, onChange, scaleReversed }) {
  const choices = scaleReversed ? CHOICES_LOW : CHOICES_HIGH;
  return (
    <div className="sz-likert">
      {choices.map((c) => (
        <button
          key={c.text}
          type="button"
          className={"sz-likert-opt" + (value === c.value ? " is-checked" : "")}
          onClick={() => onChange(c.value)}
        >
          {c.text}
        </button>
      ))}
    </div>
  );
}
window.LikertGroup = LikertGroup;
