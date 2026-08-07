# MyPortfolioV2

Static personal portfolio site for Song — full stack + AI engineer based in NYC. Positioning emphasizes LLM-powered apps and agents (React/Node/TS/Mongo + Python, OpenAI, Anthropic, LangChain, local inference via Ollama/vLLM); target audience is recruiters and founders hiring for full stack or AI engineering roles. Plain HTML/CSS/JS — no build step, no framework.

## Files

- `index.html` — page structure (icon sprite, ribbon, header, hero, projects, contact, footer)
- `styles.css` — all styling: design3 tokens, theme override, then component/section rules
- `script.js` — IntersectionObserver reveal animations, project-thumb error fallback, contact form handler (AJAX-posts to Netlify Forms)
- `images/` — project screenshots (`pitchpicture.png`, `autonomousagentreviewers.png`, `customeronboardagent.png`); all lowercase, no separators
- `brand/` — `y-mark.svg` (the nav/footer lockup mark) plus favicons: `favicon.svg`, `favicon-16/32/192/512.png`, `apple-touch-icon.png`. `ysongh-lockup.svg` is unreferenced and can be pruned.

## Design system

Imported from the Claude Design **design3** bundle (project `77ff206b-b4de-4195-bd42-6ccdcb8c8562`, file `Portfolio v1 (design3).html`). `styles.css` opens with two `:root` blocks that mirror the source:

1. **Base tokens** — verbatim from `_ds/design3-.../tokens/*.css` (colors, typography, spacing, radius, motion, semantic aliases)
2. **Theme override** — the prototype's inline `<style id="theme">`, which re-maps the `--violet-*` ramp to **blue** (`--violet-600: #1d5bc4`), warms the `--mist-*` neutrals, and points `--action-primary-bg` at `--ink-900`. Blue is what ships; the DS token *names* are kept so the design system stays traceable on a re-sync.

- Type: **Archivo** only (Google Fonts), plus a system mono stack via `--font-mono`
- Surfaces: white page, `--surface-band` (`#f2f1ee`) for the projects band and footer, joined by `WaveDivider` SVGs
- The hero sits in `.shell` (dark `--gradient-blob`) → `.sheet` (white, `--radius-3xl` top corners), so the gradient shows only at the sheet's rounded top corners

## Conventions

- Reveal-on-scroll: add `.reveal` — `script.js` adds `.visible` when in viewport (the design used `.on`; `.visible` is kept from the previous build)
- Icons are inline `<symbol>`s in a hidden sprite at the top of `<body>`, referenced with `<svg class="ic"><use href="#i-name"/></svg>`. Geometry is Lucide's; they're inlined rather than CDN-loaded to keep the page dependency-free. Add new icons as new `<symbol>`s.
- Components are plain CSS classes ported from the design's React props: `.btn` + `.btn-primary`/`.btn-outline`/`.btn-sm`, `.badge` + `.badge.tint`, `.eyebrow` + `.eyebrow.paper`, `.gh` + `.gh-accent`, `.card`, `.field`/`.field-shell`
- Project cards lift on hover (`translateY(-4px)` + `--shadow-raised`) — the old 3D parallax tilt is gone, matching design3's calmer motion tokens
- The header is **not** fixed; it lives inside `.sheet`. There is no scroll state.
- Breakpoints: `1000px` (hero and contact collapse to 1 col) and `760px` (nav hides, form single-col, `c2` chip hides, display type scales down)

## Deviations from the design bundle

Deliberate, and worth preserving if the design is re-synced:

- **Display type scales down at ≤760px** (`--text-display-*` redefined in the media query). The design's fixed 60px `h1` overflows narrow viewports.
- **`.chip.c2` uses `bottom: 8px`**, not the design's `12%` — at this card height the percentage put the chip on top of the last two code lines.
- **`.nav-sep` uses `var(--border-color)`** instead of the design's hardcoded violet-tinted `#efedf6`, which reads wrong under the blue/warm theme.
- **Code card shows `claude-opus-5`**; the design's prototype had the outdated `claude-sonnet-4`.
- **Project 02 copy** (Autonomous Agent Reviewers) keeps this repo's longer description and tag list, which is more specific than the design's shorter variant.

## Known TODO (not done)

- Resume PDF link

## Netlify Forms

The contact form uses Netlify Forms. The form element has `name="contact"`, `method="POST"`, `data-netlify="true"`, and a `netlify-honeypot="bot-field"` for spam protection. A hidden `form-name` input is included so JS submissions are also detected. `script.js` posts to `/` as `application/x-www-form-urlencoded` so the page doesn't navigate away on submit. The submit button's label lives in a nested `<span>` (it sits alongside an icon), so `script.js` swaps `btnLabel.textContent`, not the button's. Submissions appear in the Netlify site dashboard under Forms (only works on deployed site, not local preview).
