# MyPortfolioV2

Static personal portfolio site for Song (full stack developer). Plain HTML/CSS/JS — no build step, no framework.

## Files

- `Portfolio.html` — page structure (nav, hero, projects, contact, footer)
- `index.html` — same page, alternate entry point
- `styles.css` — all styling; uses CSS custom properties defined on `:root`
- `script.js` — nav scroll state, IntersectionObserver reveal animations, contact form handler (simulated send, not wired to a backend)

## Design system

Defined as CSS variables in `styles.css` `:root`:

- Palette: warm off-white bg (`#f7f3ec`), darker bg2 (`#ede9e0`), near-black text (`#1c1814`), muted brown (`#7a7269`), blue accent (`oklch(0.45 0.15 260)`)
- Type: Playfair Display (serif, editorial headings) + DM Sans (sans, body), loaded from Google Fonts
- Sections use `padding: 7rem 3rem` (desktop) / `5rem 1.5rem` (≤768px)
- Hero has extra top padding (`6rem` / `5rem`) to clear the fixed nav

## Conventions

- Reveal-on-scroll: add `.reveal` class — `script.js` observes and adds `.visible` when in viewport
- Project thumbs use CSS stripe patterns (`.sport`, `.cheap`, `.mini`) as placeholders until real screenshots are added
- Accent-dependent border on `.tag` uses a hardcoded `oklch(0.87 0.07 260)` that must be updated if the accent hue changes
- Responsive breakpoint: single `@media (max-width: 768px)` block at bottom of `styles.css`

## Origin

Implemented from a Claude Design handoff bundle. The original prototype had an inline "Tweaks panel" (live color/font editing via `postMessage` to a parent frame); that was stripped as design-tool scaffolding. The prototype's `TWEAK_DEFAULTS` (blue accent) overrode its CSS defaults (terracotta) — blue is what ships.

## Known TODO (not done)

- Real project screenshots for the three cards
- Wire contact form to a backend (Formspree / EmailJS) — currently fakes success after 1.2s
- Resume PDF link
