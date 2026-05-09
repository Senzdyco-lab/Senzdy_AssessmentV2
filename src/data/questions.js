// Loaders + scoring helpers around the survey + criterion JSON in this folder.
import Choices from "./Choices.json";
import Criterion from "./Critirion.json";
import Assessment_13 from "./Assessment_13.json";
import Assessment_3_12 from "./Assessment_3_12.json";

const SURVEYS = {
  "13+": Assessment_13.survey,
  "3-12": Assessment_3_12.survey,
};

// System id → display labels (short for radar axis, long for result table).
export const SYSTEM_LABELS = {
  sight_system: { short: "Sight", long: "Sight" },
  auditory_system: { short: "Auditory", long: "Auditory" },
  olfactory_gustation_system: { short: "Olfactory", long: "Olfactory & Gustation" },
  touch_system: { short: "Touch", long: "Touch" },
  vestibular_system: { short: "Vestibular", long: "Vestibular" },
  proprioceptive_system: { short: "Proprio", long: "Proprioceptive" },
};

export const SERIES_COLORS = {
  preferences: "#2e9e50",
  arousals: "#d32f2f",
};

export const CHOICES_MAX = Choices.max;

export function getSurvey(ageGroup) {
  return SURVEYS[ageGroup] ?? SURVEYS["13+"];
}

export function getChoices(reversed) {
  return reversed ? Choices.low : Choices.high;
}

// Resolve scaleReversed with question-level override → subsection-level fallback.
export function isReversed(subsection, question) {
  return question.scaleReversed ?? subsection.scaleReversed ?? false;
}

function subscorePercent(answers, questions) {
  const sum = questions.reduce((acc, q) => acc + (answers[q.id] ?? 0), 0);
  const total = questions.length * Choices.max;
  return total === 0 ? 0 : Math.round((sum / total) * 100);
}

// 6 sub-bands matching the criterion grid: LL 0-17, LH 18-34, ML 35-50,
// MH 51-66, HL 67-83, HH 84-100.
function band(percent) {
  if (percent <= 17) return "LL";
  if (percent <= 34) return "LH";
  if (percent <= 50) return "ML";
  if (percent <= 66) return "MH";
  if (percent <= 83) return "HL";
  return "HH";
}

// Critirion.json is keyed [arousalBand][preferenceBand] → label.
export function lookupCriterion(prefPercent, arouPercent) {
  return Criterion[band(arouPercent)]?.[band(prefPercent)] ?? "—";
}

// Compute per-system scores + radar-ready series from a flat answers map.
export function computeResult(survey, answers) {
  const systems = survey.Assessment;
  const rows = [];
  const prefData = [];
  const arouData = [];
  const labels = [];

  for (const system of systems) {
    const labelMap = SYSTEM_LABELS[system.id] ?? { short: system.id, long: system.title };
    const pref = system.children.find((c) => c.id === "preferences");
    const arou = system.children.find((c) => c.id === "arousals");
    const prefPct = pref ? subscorePercent(answers, pref.questions) : 0;
    const arouPct = arou ? subscorePercent(answers, arou.questions) : 0;

    labels.push(labelMap.short);
    prefData.push(prefPct);
    arouData.push(arouPct);
    rows.push({
      system: labelMap.long,
      preferences: prefPct,
      arousals: arouPct,
      result: lookupCriterion(prefPct, arouPct),
    });
  }

  return {
    labels,
    series: [
      { label: "Preferences", color: SERIES_COLORS.preferences, data: prefData },
      { label: "Arousals", color: SERIES_COLORS.arousals, data: arouData },
    ],
    rows,
  };
}

// All question ids in the survey, used to verify completion before submit.
export function allQuestionIds(survey) {
  const ids = [];
  for (const system of survey.Assessment) {
    for (const sub of system.children) {
      for (const q of sub.questions) ids.push(q.id);
    }
  }
  return ids;
}
