# Build Plan — Portfolio 2026

This is the working plan for Phase 3 (actual site building). Hand this to
Claude Code as a starting brief, along with a pointer to read everything in
`.reference/` first. Refine file paths/schema as Claude Code inspects the
real repo state.

## Tech table

| Layer | Choice | Notes |
|---|---|---|
| Framework | Astro v5 | Content Collections for case studies |
| Styling | Tailwind CSS v4 | Already installed via `astro add tailwind` |
| Components | shadcn/ui preset | Post-MVP only — component styling tokens, not layout/structure. Do not add until v1 ships. |
| Fonts | TBD (Geist Sans/Mono referenced as an option) | Confirm before Phase 3.2 (styled page) |
| Hosting | GitHub Pages | Deploy via `.github/workflows/deploy.yml` (Astro official action) — already live |
| Domain | Custom domain (TBD) | CNAME + DNS setup deferred until deploy pipeline confirmed working on default URL |

## File tree (target structure)

```
portfolio-2026/
├── .reference/              # prep docs, ignored by Astro build
├── .github/workflows/
│   └── deploy.yml
├── public/
│   ├── images/
│   │   ├── phishing-simulation-platform/
│   │   ├── nb-defense/
│   │   └── cve-database/
│   └── CNAME                # once custom domain is wired up
├── src/
│   ├── components/
│   │   ├── Nav.astro
│   │   ├── Footer.astro
│   │   ├── ProjectCard.astro
│   │   └── ...               # named as needed, no obligation to match old site
│   ├── content/
│   │   ├── config.ts         # Content Collections schema (see below)
│   │   └── projects/
│   │       ├── phishing-simulation-platform.md
│   │       ├── nb-defense.md
│   │       └── cve-database.md
│   ├── layouts/
│   │   └── Layout.astro      # imports global.css, wraps Nav + Footer
│   ├── pages/
│   │   ├── index.astro       # Homepage
│   │   ├── work/
│   │   │   ├── index.astro   # Work page — dynamic loop over collection
│   │   │   └── [slug].astro  # Case Study page — dynamic route per project
│   │   └── about.astro       # About Me
│   └── styles/
│       └── global.css        # @import "tailwindcss";
├── astro.config.mjs
├── AGENTS.md                 # real file
└── CLAUDE.md                 # symlink → AGENTS.md
```

## Content schema (`src/content/config.ts`)

Formalizes `.reference/templates/case-study-outline.md` into a validated
schema. Draft shape:

```ts
import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    framingLine: z.string(),
    company: z.string(),
    role: z.string(),
    timeline: z.string(),
    team: z.array(z.string()),
    thumbnail: z.string().optional(),
    pills: z.array(z.string()).default([]),
  }),
});

export const collections = { projects };
```

Body content (Problem/Action/Result, Slides, Reflections) stays as markdown
prose under the frontmatter — no schema needed for that part, just consistent
heading structure across files so components can target them predictably.

## Phases and checkpoints

| Phase | Goal | Checkpoint |
|---|---|---|
| 3.1 | Wire up Content Collections schema, migrate all 3 existing case studies (phishing simulation, NB Defense, CVE database) into validated markdown | Build succeeds, schema validates, pages still unstyled |
| 3.2 | Build one fully-styled Case Study page (Hero, Overview, Problem/Action/Result, Slides, Reflections) | Visual language locked: type scale, spacing, color, card style — this becomes the template for the rest |
| 3.3 | Build Work page with dynamic loop over the projects collection | Matches old site's Work page layout; adding a 4th project requires zero code changes, just a new markdown file |
| 3.4 | Build Homepage (nav, hero with positioning statement, footer) | Matches old site structure per `sitemap.md` and screenshots |
| 3.5 | Build About Me page | Full site parity with old site |
| 3.6 | QA pass — mobile responsiveness (no mobile screenshots exist yet, so this is where that gap gets caught), broken links, image loading, dark mode toggle | Ready to go live on custom domain |

## Out of scope for v1

See `.reference/later.md` for the authoritative list. As of now:

- Blog (article list + article page)
- Playground page
- shadcn/ui component library integration (post-MVP)
- Any visual redesign beyond what's in `design-brief.md` / `sitemap.md`

## Open items to resolve before/during Phase 3

- `pills` values are empty across all 3 case study files — need at least 1-2
  tags per project before Work page cards look finished
- Font choice not finalized (Geist Sans/Mono was a reference point, not a
  confirmed decision)
- NB Defense and CVE Database case studies exist as raw Problem/Action/Result
  text — not yet formatted into full markdown files matching the phishing
  simulation project's structure
- Custom domain DNS not yet configured — deploy pipeline should be verified
  on the default github.io URL first
