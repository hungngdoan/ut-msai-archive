# Theme: "The Laboratory"

## Inspiration

The visual identity is an original homage inspired by **Dexter's Laboratory**
(Cartoon Network, 1996-2003). The fit is thematic, not literal: a boy genius with a secret lab full of
experiments, inventions, and machines maps cleanly onto a graduate journey in artificial intelligence.
The site is framed as that lab. You run experiments (the weekly log), build inventions (projects), and
keep a reference library and field notes.

Nothing from the show is reproduced. No official logos, fonts, character art, screenshots, or other
copyrighted or trademarked assets are used. Only the *idea* of a research lab is borrowed, expressed
through an original palette, type system, and iconography. See "Assets and IP" below before adding any
new imagery.

## Design language

A lab instrument panel, rendered with restraint. Dark, technical, and legible first; the cartoon
reference is a flavor, not a costume.

### Palette (tokens live in `src/styles/global.css`)

| Role | Token | Value |
| --- | --- | --- |
| Primary accent (reactor) | `--color-reactor-bright` | `#2ce3c4` |
| Reactor base / dim | `--color-reactor` / `--color-reactor-dim` | `#13b9a0` / `#0c7d6c` |
| Caution / in-progress | `--color-amber` | `#f5a623` |
| Hazard / warning (sparing) | `--color-hazard` | `#ff4438` |
| Surfaces | `--color-ink-950` … `--color-ink-100` | cool charcoal ramp |

### Type

- Display / headings: **Chakra Petch** (techno, instrument-panel feel)
- Body: **Inter**
- Metadata / labels / code: **JetBrains Mono**

### Motifs

- Faint blueprint grid background
- Reactor-teal glow on interactive cards and indicator dots
- Monospace eyebrow labels (`MODULE / 01`, `STATUS`)
- Reactor energy bar on featured cards; diagonal hazard stripes used only as thin flourishes

## Vocabulary mapping

The routes are stable; only the labels carry the lab theme.

| Route | Label |
| --- | --- |
| `/` | Control |
| `/courses` | Modules |
| `/log` | Experiment log |
| `/readings` | Reference Library |
| `/projects` | Inventions |
| `/reflections` | Field Notes |

## Assets and IP

- **Do not** add the Dexter's Laboratory logo, the show's title lettering, character images, or
  screenshots. They are owned by Warner Bros. Discovery / Cartoon Network and this is a public site.
- **Do** use original marks. The favicon (`public/favicon.svg`) is an original Erlenmeyer-flask icon
  drawn for this project.
- If you want a stronger Dexter nod, commission or draw an **original** homage (your own flask, beaker,
  reactor, or robot mark). Keep it generic-lab, not a copy of a specific character or logo.
- This project is independent and not affiliated with, sponsored by, or endorsed by Cartoon Network,
  Warner Bros. Discovery, or The University of Texas at Austin.
