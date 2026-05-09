# Senzdy Web — UI Kit

Pixel-fidelity recreation of the Senzdy assessment website (`Senzdy_Assessment/` codebase). The original is React 19 + Ant Design + styled-components + ApexCharts; this kit is a lightweight, dependency-free React-via-Babel reproduction that preserves the visual + interaction language without the full framework weight.

## Files

- `index.html` — runs the kit. Click-thru flow: Intro → Age picker → Assessment (one sensory system, abbreviated) → Result.
- `Header.jsx` — top bar with `Senzdy` wordmark and About / Contact links.
- `Button.jsx` — primary, danger, and outline buttons. Coral hover swap.
- `LikertGroup.jsx` — 5-point Thai Likert button group.
- `QuestionCard.jsx` — single-question card with purple head.
- `AssessmentCard.jsx` — sensory-system grouping card.
- `ScoreLegend.jsx` — เกณฑ์การให้คะแนน table.
- `RadarChart.jsx` — SVG radar with two series.
- `ResultTable.jsx` — sortable result table.

## Source mapping

| UI kit file | Source |
|---|---|
| `Header.jsx`        | `Senzdy_Assessment/src/components/Header/` |
| `Button.jsx`        | `Senzdy_Assessment/src/common/Button/` |
| `LikertGroup.jsx` + `QuestionCard.jsx` | `Senzdy_Assessment/src/components/AssessmentBlock/` |
| `RadarChart.jsx` + `ResultTable.jsx`   | `Senzdy_Assessment/src/components/ResultBlock/` + `src/common/RadarChart/` |

## Caveats

- ApexCharts is replaced with a hand-built SVG radar to keep the kit dependency-free. The visual matches the production chart.
- Animation: original uses `react-awesome-reveal` Fade. The kit applies the same effect via plain CSS keyframes.
- The kit shows **one** sensory system in the assessment flow (Sight) for brevity — production runs all six.
