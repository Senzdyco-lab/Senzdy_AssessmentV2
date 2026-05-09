# Senzdy Design System

> Personal Sensory — Thai Sensory Patterns Assessment

This is the design system for **Senzdy** (brand: *Personal Sensory*), a self-administered Thai‑language sensory pattern assessment. Users take a Likert‑5 questionnaire across six sensory systems (Sight, Auditory, Olfactory & Gustation, Touch, Vestibular, Proprioceptive) and receive a radar chart + table that classifies each system on a 6×6 Arousal × Preference grid (Apathy → Flow).

The companion mark **Bellbell** (a sky‑blue dolphin with a pink heart) is used in child‑facing surfaces (the 3‑12 assessment).

---

## Sources

- **Codebase:** `Senzdy_Assessment/` — React 19 + Vite + Ant Design + styled‑components + ApexCharts. The deployed site (gh-pages homepage) is `https://Senzdyco-lab.github.io/Senzdy_Assessment/`.
- **GitHub repo (read-only):** `Senzdyco-lab/Senzdy_AssessmentV2` (V2 — reserved for follow‑up; not yet imported).
- **Reference images:**
  - `assets/bellbell-logo.jpg` — child mark
  - `assets/example_result.jpg` — production result screen (mobile)
  - `assets/new_criteria.jpg` — handwritten 6×6 criterion grid (Arousal × Preference → Apathy / Worry / Anxiety / Boredom / Relax / Passion / Seeker / Control / Flow, etc.)
- **Fonts:** `Motiva-Sans-Light.ttf`, `Motiva-Sans-Bold.ttf` (shipped in the codebase under `src/assets/fonts/`).

---

## Index — what's in this folder

| Path | What's inside |
|---|---|
| `colors_and_type.css` | Color tokens, typography, spacing, radius, shadow CSS variables. |
| `fonts/` | Motiva Sans Light + Bold TTFs. |
| `assets/` | Logos (Bellbell + Senzdy app icon), reference UI screenshots, supporting SVGs from the codebase. |
| `preview/` | Card HTML files registered as Design System cards. |
| `ui_kits/web/` | Pixel-fidelity React (JSX) recreation of the Senzdy assessment website. |
| `SKILL.md` | Cross-compatible Claude Skill manifest. |

---

## Products represented

There is **one product surface** in scope:

1. **Senzdy Assessment Website** (`ui_kits/web/`) — public, mobile-first, Thai‑language. Routes:
   - `/` — Intro: pick your age group (3‑12 or 13+).
   - `/assessment_3_12` and `/assessment_13` — Likert‑5 surveys grouped by sensory system, each with a *Preferences* and *Arousals* sub‑section.
   - `/result` — Radar chart (preferences green vs arousals red) + sortable table with per‑system criterion (e.g. *Flow*, *Anxiety*, *Seeker*).

The `_V2` GitHub repo is reserved for an evolved version that the team is working on; nothing from it is imported here yet — let me know when to merge V2 changes in.

---

## CONTENT FUNDAMENTALS

The product is **bilingual but Thai‑first**. UI chrome (button labels, table headers) tends to stay in English; everything the user reads is Thai.

**Voice — Thai content**
- Direct, colloquial, second‑person. The intro literally says *"เลือกช่วงอายุของคุณ!"* ("Pick your age range!") with a friendly exclamation point.
- Likert scale is plain everyday Thai (no clinical register): *ไม่เคย → น้อยครั้ง → บางครั้ง → บ่อยครั้ง → ทุกครั้ง* ("never → rarely → sometimes → often → always").
- Question prompts use the conversational verb *ชอบ* ("like / enjoy") — e.g. *"ชอบเวลามีผู้คนอยู่รายรอบ"* ("Enjoys being around people"). It reads like a friend asking, not a clinician scoring.

**Voice — English chrome**
- Title‑Case for nav (`About`, `Contact`), Sentence‑case for buttons (`Edit`, `Reset`, `Next`).
- Headers are **UPPERCASED** via CSS `text-transform: uppercase` — never typed in caps in source. Apply uppercase as a *visual* treatment only.
- Result section names are short scientific labels: *Sight, Auditory, Olfactory & Gustation, Touch, Vestibular, Proprioceptive*. Do not translate or rename these — they map to data keys.

**Casing & punctuation**
- No emoji. None present in source.
- No exclamation points outside the friendly intro line.
- Six criterion words are the single source of truth for results — capitalize as proper nouns: *Apathy, Boredom, Seeker, Worry, Relaxation, Control, Anxiety, Passion, Flow*. The handwritten reference adds intensifiers (*almost / mini / really*) for off‑diagonal cells — preserve that shape.

**Pronoun / address**
- Thai uses *คุณ* ("you") in the intro. English does not address the user directly outside button text.

**Vibe**
- Calm, clinical‑adjacent but warm. Purples carry the "assessment" tone; the Bellbell mark and pink heart soften it for children. Avoid playful/marketing copy in the adult flow.

---

## VISUAL FOUNDATIONS

### Color
The site is built on a **purple‑monochrome** core. Five purples do almost all the work, with a coral hover accent and two result series colors.

| Token | Hex | Where it shows up |
|---|---|---|
| `--senzdy-purple-900` | `#17007e` | Result page H2 (`MainTitle`). |
| `--senzdy-purple-800` | `#18216d` | Default body text + nav links. |
| `--senzdy-purple-700` | `#2e186a` | Primary button bg, card head bg, focus ring. |
| `--senzdy-purple-600` | `#4c13a8` | Likert radio border + checked bg. |
| `--senzdy-purple-500` | `#3c0058` | Page H1 (`HeadderTitle`, uppercase). |
| `--senzdy-purple-200` | `#f5f3ff` | Idle radio fill. |
| `--accent-coral` | `rgb(255, 130, 92)` | **All hover states** (link, nav span, button border+bg). |
| `--accent-danger` | `#ff0037` | Reset button only. |
| `--series-preferences` | `#1daf00` | Radar — Preferences. |
| `--series-arousals` | `#b61a1a` | Radar — Arousals. |
| `--bellbell-blue` | `#6FBEEC` | Dolphin mark only. |
| `--bellbell-pink` | `#F7A6C0` | Heart + splash on dolphin mark. |

**No gradients.** The codebase uses zero linear or radial gradients — backgrounds are flat white, text is flat purple. Don't introduce gradients.

### Type
- **Family:** Motiva Sans (Light 300 + Bold 700). Thai falls back to system Thai sans (recommend pairing with **IBM Plex Sans Thai** or **Sarabun**).
- Headings use Bold; body uses Light. The `<h6>` tag in source is repurposed as a Light‑weight uppercase eyebrow — don't read it as a true H6.
- All section titles use `text-transform: uppercase` + a `clamp(min, vw, max)` size. Never hard‑code heading sizes; reach for `--fs-h1` / `--fs-h2`.
- Body copy is **21px** (`--fs-body`) — large by web standards. This is intentional; it reads as "calm, clinical".

### Spacing
- Section vertical rhythm: **`10rem 0 8rem`** desktop, **`4rem 0 4rem`** mobile (`<= 1024px`). Sections breathe; do not compress.
- Container max‑width **1200px**, side padding 60px desktop / 30px tablet / 18px mobile.
- Buttons: `13px 0` vertical padding, `max-width: 180px`, `margin-left: 20px` between siblings.

### Backgrounds
- **Flat white.** No images, no patterns, no textures, no full‑bleed photography. The Bellbell mark is the only illustrative element and it sits on white.
- The radar chart sits centered with no chrome around it.

### Animation
- **`react-awesome-reveal` Fade**, `triggerOnce`, default direction. Sections fade in once on scroll; nothing loops.
- All interactive transitions are `all 0.3s ease-in-out` — single global easing (`--t-base` = 300ms).
- **No bounce, no spring, no parallax.**

### Hover / press states
- **Hover:** the universal pattern is to swap the entire fill/border to `--accent-coral` (255,130,92) and keep text white. Links additionally get a wavy coral underline (`text-decoration: rgb(255,130,92) wavy underline`). This wavy underline is a brand signature — don't replace with a flat one.
- **Pressed (`:active`):** same as hover. There is no separate scale-down or color-shift on press in source.
- **Focus:** `outline: none` is applied globally and replaced with `box-shadow: #2e186a 0 0 0 1px` on inputs. Buttons get the focused ring via the same coral hover treatment.

### Borders
- 1px borders only. `--border` (#edf3f5) on buttons, `#CDD1D4` on Container top dividers.
- Radio buttons use `--senzdy-purple-600` (#4c13a8) borders.

### Shadows
- **One outer shadow:** `0 16px 30px rgba(23, 31, 114, 0.20)` — used on every primary button. It's a soft, low, deeply‑purple drop. Treat this as the brand shadow.
- Cards use Ant Design's default subtle shadow (`0 2px 8px rgba(23,31,114,0.06)` — captured in `--shadow-card`).
- **No inner shadows. No glow.**

### Corner radius
- 4px (`--radius-sm`) for buttons and inputs.
- 16px (`--radius-lg`) for the Score Legend / Result cards (set inline via `borderRadius: 16`).
- Pill / circular shapes are not used.

### Cards
- Ant Design `<Card>` with a *purple head*: head bg `#2e186a`, head title white. The `AssessmentCard` styled wrapper enforces this.
- Card body is white, default Ant padding, default 8px radius unless overridden to 16.
- No left‑border accent stripe. No colored card backgrounds.

### Layout rules
- Single‑column on mobile. Two‑column (`Row gutter={[16,16]}`) only at `>= md` for the result page's optional rankings.
- Header is **not fixed** — it scrolls with the page.
- Logo text "Senzdy" is *typographic*, not the SVG mark — the SVG mark only appears on the marketing page that has been commented out.

### Transparency / blur
- Not used. No `backdrop-filter`, no `rgba()` overlays. The aesthetic is opaque.

### Imagery vibe
- The only character imagery is the Bellbell dolphin (sky blue line + pink heart, white interior). It's friendly, hand‑drawn‑adjacent, and deliberately childlike. Use only on the 3‑12 surface.

---

## ICONOGRAPHY

The codebase uses three concurrent icon strategies:

1. **Ant Design icons** (`@ant-design/icons` package) — the only one actually rendering in production. Used: `MenuOutlined` for the burger. Anywhere a generic UI affordance is needed (sort arrows in the result Table, etc.) it comes from Ant.
2. **Custom flat illustrations** as SVGs in `public/img/svg/` (`developer.svg`, `graphs.svg`, `notes.svg`, `product-launch.svg`, `waving.svg`, `scroll-top.svg`). These are large, flat, multi-color illustrations — *not* line icons. They were referenced by a marketing layout that has been commented out, so they're currently dormant. Copied into `assets/` for future use.
3. **PNG app icons** at `public/img/icons/logo192.png` and `logo512.png` for PWA install / favicon.

**No emoji.** **No unicode glyphs as icons.** **No icon font.**

When adding new icons:
- For inline UI affordances (chevrons, close, sort, etc.) keep using Ant Design icons — they ship with the framework.
- For decorative spot illustrations, match the existing flat multi‑color SVG style of `developer.svg` / `graphs.svg`. Avoid line‑icon sets like Lucide / Heroicons here — they'll look foreign next to the existing illustrations.
- Bellbell is the only mascot. Don't introduce others.

---

## Dev quickstart for designs

```html
<link rel="stylesheet" href="colors_and_type.css">
<style>
  .my-button { background: var(--senzdy-purple-700); color: #fff;
               border-radius: var(--radius-sm); padding: 13px 24px;
               box-shadow: var(--shadow-button); transition: all .3s ease-in-out; }
  .my-button:hover { background: var(--accent-coral); }
</style>
```

---

## Caveats

- **Motiva Sans is a paid font.** It's shipped in the original codebase as a TTF, included here for fidelity. If you ship to production outside the existing app, replace with a properly licensed copy or substitute (closest Google Font: **Mulish** or **Manrope**).
- The `_V2` repo is **not** mirrored here yet — V1 conventions are the canon. If V2 ships breaking changes, this system will need a refresh.
- The 6×6 Criterion grid (`assets/new_criteria.jpg`) is a handwritten artifact; the JSON in code only encodes the 3×3 reduced version (`Apathy / Worry / Anxiety / Boredom / Relax / Passion / Seeker / Control / Flow`). Intensifiers (*mini*, *really*, *almost*) are not yet wired into the result page — they're future work.
