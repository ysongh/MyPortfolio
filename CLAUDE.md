# MyPortfolioV2

Static personal portfolio site for Song — full stack + AI engineer based in NYC. Positioning emphasizes LLM-powered apps and agents (React/Node/TS/Mongo + Python, OpenAI, Anthropic, LangChain, local inference via Ollama/vLLM); target audience is recruiters and founders hiring for full stack or AI engineering roles. Plain HTML/CSS/JS — no build step, no framework.

## Files

- `index.html` — page structure (nav, hero, projects, contact, footer)
- `styles.css` — all styling; uses CSS custom properties defined on `:root`
- `script.js` — nav scroll state, IntersectionObserver reveal animations, contact form handler (AJAX-posts to Netlify Forms)
- `images/` — project screenshots (`customeronboardagent.png`, `autonomousagentreviewers.png`, `miniappgallery.png`); all lowercase, no separators
- `brand/` — favicons + brand lockup. Only files actually referenced from `index.html` live here: `favicon.svg`, `favicon-16/32/192/512.png`, `apple-touch-icon.png`, `ysongh-lockup.svg` (used in the nav). Don't add unreferenced size variants — prune instead.

## Design system

Defined as CSS variables in `styles.css` `:root`:

- Palette: warm off-white bg (`#f7f3ec`), darker bg2 (`#ede9e0`), near-black text (`#1c1814`), muted brown (`#7a7269`), blue accent (`oklch(0.45 0.15 260)`)
- Type: Playfair Display (serif, editorial headings) + DM Sans (sans, body), loaded from Google Fonts
- Sections use `padding: 7rem 3rem` (desktop) / `5rem 1.5rem` (≤768px)
- Hero has extra top padding (`6rem` / `5rem`) to clear the fixed nav
- Hero is a 2-col grid (`.hero-left` text / `.hero-right` 3D scene); collapses to 1-col at ≤900px
- 3D hero scene (`.hero-3d-scene`): code-editor card with syntax-highlighted lines, 3 floating chips, and a blur-shadow blob. Uses `perspective` on `.hero-right` + `transform-style: preserve-3d` + `translateZ` on chips. Animation keyframes: `floatScene`, `chipFloat1/2/3`, `shadowPulse`, `blink` (cursor)

## Conventions

- Reveal-on-scroll: add `.reveal` class — `script.js` observes and adds `.visible` when in viewport
- Project thumbs are `<img>` inside `.project-thumb` (16:9, `object-fit: cover`)
- Accent-dependent border on `.tag` uses a hardcoded `oklch(0.87 0.07 260)` that must be updated if the accent hue changes
- Responsive breakpoint: single `@media (max-width: 768px)` block at bottom of `styles.css`

## Origin

Implemented from a Claude Design handoff bundle. The original prototype had an inline "Tweaks panel" (live color/font editing via `postMessage` to a parent frame); that was stripped as design-tool scaffolding. The prototype's `TWEAK_DEFAULTS` (blue accent) overrode its CSS defaults (terracotta) — blue is what ships.

## Known TODO (not done)

- Resume PDF link

## Netlify Forms

The contact form uses Netlify Forms. The form element has `name="contact"`, `method="POST"`, `data-netlify="true"`, and a `netlify-honeypot="bot-field"` for spam protection. A hidden `form-name` input is included so JS submissions are also detected. `script.js` posts to `/` as `application/x-www-form-urlencoded` so the page doesn't navigate away on submit. Submissions appear in the Netlify site dashboard under Forms (only works on deployed site, not local preview).
