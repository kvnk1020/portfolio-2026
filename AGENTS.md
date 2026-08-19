# Project: Kevin Ku — Portfolio 2026

## Purpose

Personal portfolio site for Kevin Ku, a Product Designer, targeting mid-to-senior
Product Designer roles at design- and technology-forward companies (OpenAI,
Anthropic, Docusign, Whatnot, Ramp, Stripe, and similar).

Positioning: Kevin brings architectural systems-thinking to complex enterprise
security and data products — turning dense, high-stakes problems into interfaces
people actually trust.

## Scope — read this before making structural changes

v1 is a **structural migration** of Kevin's existing site (see screenshots and
sitemap in `.reference/`), not a redesign. Match the existing structure, layout,
and page list. Do not introduce new pages, sections, or visual direction beyond
what's documented in `.reference/design-brief.md` and `.reference/sitemap.md`
without checking with Kevin first.

Anything out of scope for v1 (Blog, Playground, etc.) is tracked in
`.reference/later.md` — do not build these yet.

## Reference docs

All planning and content prep lives in `.reference/` (hidden from the built
site, ignored by Astro automatically):

- `design-brief.md` — goals, positioning, tone, design direction
- `sitemap.md` — confirmed page/nav structure
- `templates/case-study-outline.md` — required structure for every case study
- `projects/*.md` — actual case study content, written against the outline above
- `later.md` — deferred features, do not build without confirming scope change

Read the relevant file(s) in `.reference/` before starting work on a page or
section — don't guess at structure or content that's already documented there.

## Stack

- Astro v5 (Content Collections for case studies)
- Tailwind CSS v4
- GitHub Pages (deploy via `.github/workflows/deploy.yml`, Astro's official action)
- shadcn/ui preset — scoped to component styling tokens only, not layout/structure
  (see design-brief.md for the preset link)

## Conventions

- Case study markdown files use the frontmatter schema defined in
  `.reference/templates/case-study-outline.md` — keep new project files
  consistent with existing ones in `.reference/projects/`.
- Works page renders case studies via a dynamic loop over the content
  collection — never hardcode individual project cards.
- Old site component/file naming is not preserved — name new components
  descriptively based on what they do.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and
`astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)