# MyPortfolioV2

Static personal portfolio site for Song — full stack + AI engineer based in NYC. Positioning emphasizes LLM-powered apps and agents (React/Node/TS/Mongo + Python, OpenAI, Anthropic, LangChain, local inference via Ollama/vLLM); target audience is recruiters and founders hiring for full stack or AI engineering roles. Plain HTML/CSS/JS — no build step, no framework.

## Files

- `index.html` — page structure (hero, stack, projects, contact, footer)
- `styles.css` — all styling: Teeno base tokens, navy theme override, then base/component/section rules
- `script.js` — IntersectionObserver reveal animations, project-thumb error fallback, contact form handler (AJAX-posts to Netlify Forms)
- `images/` — project screenshots (`pitchpicture.png`, `autonomousagentreviewers.png`, `customeronboardagent.png`); all lowercase, no separators
- `brand/` — favicons: `favicon.svg`, `favicon-16/32/192/512.png`, `apple-touch-icon.png`. `y-mark.svg` and `ysongh-lockup.svg` are both **unreferenced** since the lockup became CSS-drawn (see below) and can be pruned.
- `my-portfolio/` — the exported Claude Design project (all comps + `_ds/` bundles). Source material for the import, **not part of the site**; exclude it from deploys or delete it once the design is settled.

## Design system

Imported from the Claude Design **Teeno** bundle (project `77ff206b-b4de-4195-bd42-6ccdcb8c8562`, file `Portfolio v1 (Teeno).html`, DS `_ds/teeno-design-system-97696d08-8c17-44ff-83ea-419230b6de85/`). `styles.css` opens with two `:root` blocks that mirror the source:

1. **Base tokens** — verbatim from `_ds/teeno-.../tokens/*.css` (colors, gradients, typography, spacing, radii, elevation, motion, layout, fonts)
2. **Theme override** — the prototype's inline `<style>`, which re-maps the `--violet-*` / `--indigo-*` ramps to **navy** (`--indigo-500: #1C4587`), re-points the brand/shape gradients and focus ring, and sets `--app-accent`. Navy is what ships; the DS token *names* are kept so the design system stays traceable on a re-sync.

- **Pink `#F62B85` stays the single call-to-action colour.** The navy override deliberately does not touch the `--pink-*` ramp — the DS rule is "one pink CTA per view" (hero *Projects* button, form *Send*). Don't add a third.
- Type: **Poppins** for everything on the marketing side (Google Fonts), **Material Symbols Rounded** for icons, and `--font-app` (system UI stack) for the phone mockup's app surfaces
- Surfaces: white page, `--surface-page-alt` (`#EEF3F7`) behind the hero and contact section. The hero's brand gradient is a blob with an asymmetric bottom edge (`border-radius: 0 0 64% 36% / 0 0 46% 16%`), with a `--gradient-shape-deep` squircle behind it peeking out on the right
- Every other section carries 1–2 rotated `.deco` squircles bleeding off one edge. Sections set `overflow: hidden` to clip them — keep that, or the decos create horizontal scroll
- Layout is a narrow **920px** column (`--container`) inside a wide canvas. The wide side margins are intentional; the decos live in them

## Conventions

- Reveal-on-scroll: add `.reveal` — `script.js` adds `.visible` when in viewport (the design used `.rv`/`.in`; `.reveal`/`.visible` is kept from the previous build). Stagger is CSS `nth-child` on `.cap-grid`/`.proj-grid`/`.contact-grid`, capped at 60ms/step per the DS motion rules
- Icons are **Material Symbols Rounded ligatures**: `<span class="ms">chevron_right</span>`, add `.fill` for the filled axis. Size with `font-size`. This replaces the old inline SVG sprite — the DS's iconography *is* this font, and the page already loads Google Fonts for Poppins
- Components are plain CSS classes ported from the design's React props: `.btn` + `.btn-primary`/`.btn-outline` + `.btn-sm`/`.btn-md`/`.btn-lg`, `.chip` + `.chip.quiet`/`.chip.sm`, `.iconchip` (+`.sm`), `.floatcard-surface` (+`.elev-card`), `.lockup` + `.on-brand`/`.on-ink`, `.pcard`, `.drow`, `.fld`, `.eyebrow`/`.eyebrow-on-brand`, `.deco`
- The lockup (diamond mark + `YSONGH()` wordmark) is **drawn in CSS** — `.lockup .dia::before` is a rotated bordered square. No image asset
- Project cards lift on hover (`translateY(-4px)` + `--shadow-card-hover`); buttons lift 2px and deepen their shadow. Nothing scales up, nothing bounces
- The header is **not** fixed; it lives inside the hero, floating transparently over the gradient. There is no scroll state
- Breakpoints: `1040px` (hero/stack/contact collapse to 1 col, nav links hide, projects go 2-up) and `720px` (display type scales down, all grids 1 col, hero float card hides)

## Deviations from the design bundle

Deliberate, and worth preserving if the design is re-synced:

- **`--text-body` is remapped to `--ink-500`** in the theme override. The DS points body copy at `--ink-400` (`#A0A4AC`), which is ~2.6:1 on white and fails WCAG AA. `--ink-500` is ~4.9:1. Recruiters read this page.
- **Material Symbols loads with `display=block`**, not the DS's `swap`. With `swap` the ligature *names* ("chevron_right") flash as raw text before the icon font arrives.
- **`.cap-off` is a real class.** The prototype declared `.cap-off { margin-top: 0 }` at ≤720px but applied the 40px stagger via an inline style, so the mobile reset never fired.
- **Phone-mockup stats are grounded** (`3 Shipped / 3 Agents / NYC Based`). The prototype invented `12 Projects / 4 Agents / 3 yr Shipping` — unverified claims about a real person on a job-seeking page. Replace with real numbers when known.
- **Project 02 copy** (Autonomous Agent Reviewers) keeps this repo's longer description and 6-tag list, which is more specific than the design's shorter variant.
- **Capability card 04** drops the design's "this year" from "Three products taken from a rough idea to a live URL".
- **Project thumbs are plain `<img>`** with a `.ph` placeholder underneath, not the design canvas's `<image-slot>` custom element. `script.js` removes a broken `<img>` so the placeholder shows.

## Known TODO (not done)

- Resume PDF link
- `my-portfolio/` is committed-adjacent working material — exclude from deploy or remove
- Section rhythm is the DS's fixed 120px (`--pad-section-y`) at every width, so mobile has ~240px between the hero and the stack section. Faithful to the design; reduce at ≤720px if it reads as too airy

## Netlify Forms

The contact form uses Netlify Forms. The form element has `name="contact"`, `method="POST"`, `data-netlify="true"`, and a `netlify-honeypot="bot-field"` for spam protection. A hidden `form-name` input is included so JS submissions are also detected. `script.js` posts to `/` as `application/x-www-form-urlencoded` so the page doesn't navigate away on submit. The submit button's label is now **direct text** on the `<button>` (the Teeno button has no icon), so `script.js` swaps `btn.textContent`. Submissions appear in the Netlify site dashboard under Forms (only works on deployed site, not local preview).
