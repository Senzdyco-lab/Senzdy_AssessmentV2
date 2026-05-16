import { getChoices } from "../data/questions.js";

export default function LikertGroup({ value, onChange, scaleReversed, choiceSet }) {
  const choices = getChoices(scaleReversed, choiceSet);
  return (
    <div className="sz-likert" role="radiogroup">
      {choices.map((c) => {
        const checked = value === c.value;
        return (
          <button
            key={c.text}
            type="button"
            role="radio"
            aria-checked={checked}
            className={"sz-likert-opt" + (checked ? " is-checked" : "")}
            onClick={() => onChange(c.value)}
          >
            {c.text}
          </button>
        );
      })}
    </div>
  );
}
