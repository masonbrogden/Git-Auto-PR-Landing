# Handoff — Git-Auto-PR Landing Page

## Goal
Polish the Git-Auto-PR marketing landing page (`git-auto-pr-landing`) into a production-quality site that accurately represents the product with no placeholder images, no off-brand colors, and a compelling animated demo section.

---

## Project location
```
c:\Git PR\git-auto-pr-landing\
```
React + Vite + Tailwind. Entry: `src/main.jsx` → `src/App.jsx`.

---

## What was completed this session

### Hero section
- Added a floating PR review card mockup (`PRReviewMockup`) on the right side of the hero, visible at `xl` breakpoints and above.
- Card shows a real-looking GitHub dark diff + bot review comment with a warning badge and suggested fix.
- Floats with a CSS `heroFloat` keyframe animation (5.5s, subtle Y + rotation).
- Fixed a layout bug where the headline font (`clamp(2.8rem, 6vw, 5.5rem)`) was too large for the split layout — reduced to `clamp(1.75rem, 3.2vw, 3rem)` and changed from `flex-col justify-end` to `flex items-center` for proper vertical centering.

### Favicon
- Replaced the default lightning bolt emoji favicon with an inline SVG that matches the globe logo in the nav header (`index.html` line 13).

### WhySection — animated 4-phase demo
Replaced the old static card grid with a looping animated sequence using `useState` + `useEffect` only (no external libraries):

| Phase | Content | Duration |
|---|---|---|
| 0 — Team chat | Slack-style dark UI, `#dev-reviews` channel, 3 messages about Git-Auto-PR | 5.2s |
| 1 — Git push | macOS terminal, lines appear one-by-one (440ms each), blinking cursor | 5.2s |
| 2 — PR opened | GitHub PR view with diff, "git-auto-pr[bot] is reviewing" + pulsing dots | 5.2s |
| 3 — Review posted | GitHub review card: warning/suggestion/info findings, ✓ Approved | 7.0s |

Clickable pill indicators below let users jump between phases. Each phase fades in with `whyFadeIn` keyframe (0.35s).

### Testimonials
- Changed both quote boxes from lavender (`#e8e8f5`) and neon (`#d4f04a`) to `#0c0c0c` with `#1a1a1a` border — matches the dark card style used everywhere else.
- Fixed "Claude catches things…" → "Git-Auto-PR catches things…".

### Screenshot replacement
Replaced all three GitHub CDN `<img>` tags in the FeatureSection components with hand-coded React mockups. Original PNGs in `mode/` were deleted.

| Component | Replaces | Content |
|---|---|---|
| `MockupBotReport` | `mode/1.png` | github-actions bot header (octocat avatar, Bot badge), Check/Status table (❌ Linter / ✅ Tests / 72.0% Coverage), Coverage Breakdown table with file names, Stmts, Miss, Cover%, Missing Lines |
| `MockupAIReviewTop` | `mode/2.png` | "AI Code Review" — Summary paragraph, Critical Issues 1–5 (SQL injection ×3, plaintext password storage, plaintext comparison) |
| `MockupAIReviewBottom` | `mode/3.png` | Critical Issues 6–8 (password logging, resource leaks ×2), Minor Issues 1–2, Verdict: Request Changes, italic footer with Git-Auto-PR link |

All inline code in the mockups uses `BotCode` component which overrides the global purple `code` style from `App.css` with GitHub's neutral dark box (`#21262d` bg, `#30363d` border, `#e6edf3` text).

---

## Files actively edited

| File | What changed |
|---|---|
| `src/App.jsx` | Everything — mockups, hero, WhySection, testimonials. Main working file. |
| `src/App.css` | Added `@keyframes heroFloat`, `whyFadeIn`, `termBlink`, `dotPulse`, `.term-cursor` |
| `index.html` | Favicon replaced with inline SVG globe |
| `mode/` folder | Now empty — all 3 PNGs deleted |

---

## What failed / required rework

- **Hero Edit tool mismatch** — First `Edit` attempt on the Hero section failed because the section comment line uses `─` (U+2500 box-drawing dashes), not regular `-`. Had to re-read the file to copy the exact characters before the edit succeeded.
- **Hero text overflow** — Initial hero split layout kept the original giant font size (`6vw` capped at `5.5rem`). With `max-w-lg` text container it wrapped into 5+ lines and overflowed the viewport. Fix: smaller clamp + `items-center` layout.
- **Mockup xl breakpoint** — First version used `hidden lg:block` for the hero mockup. At 1024px the text column (512px) + mockup (390px) + padding overlapped. Changed to `hidden xl:block` to require 1280px minimum.
- **`SCREENSHOTS` constant removal** — Removed the array but also had to verify no other references existed before deleting.

---

## Next step to take

**Run a build and check for warnings:**
```bash
cd "c:\Git PR\git-auto-pr-landing"
npm run build
```
The `SCREENSHOTS` constant was removed and the `mode/` folder is now empty — confirm Vite doesn't reference either. Also verify the `BotCode` component doesn't conflict with the global `code` style in `App.css` (the inline `style` prop should win, but worth a visual check on the three feature sections).

After that, the remaining stretch goals from the project roadmap are:
1. Slack notification integration
2. React dashboard
