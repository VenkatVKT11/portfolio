# Venkatesan G — portfolio

A one-page portfolio built with Next.js (App Router), React, TypeScript, Tailwind CSS and GSAP.

## Run it

```bash
npm install
```

```bash
npm run dev
```

Open http://localhost:3000. For a production check:

```bash
npm run build
```

```bash
npm run start
```

## Change the content

All text, links and image paths live in one file: `src/content/site.ts`.

| To change | Edit |
|---|---|
| Name, title, email, LinkedIn, GitHub, resume, photo | `site` |
| Hero headline, description, buttons | `hero` |
| Tools and their In use / Exploring labels | `tools` |
| About text and facts | `about` in `editable.json` (or the admin panel) |
| Projects, their details and pictures | `projects` in `editable.json` (or the admin panel) |
| What I do cards and the lead workflow | `work`, `workflow` |
| Skills | `skills` |
| Experience, career transition, education, certifications | `experience`, `careerTransition`, `education`, `certifications` |
| Campaign results | `metrics` |
| Contact wording | `contact` |

## Local admin panel

Run `npm run dev`, then open http://localhost:3000/admin (or the port dev prints). From there you can:

- **Projects**: search, edit every field, show a project first or put it under "View more", reorder, add or remove.
- **About**: heading, statement, paragraphs and facts.
- **Theme**: pick one of six themes (Powder Pastel, Noir Gold, Ivory Neon, Obsidian Crimson, Charcoal Coral, Classic Blue) and Light or Dark mode. Optionally let visitors switch themes themselves.
- **Resume**: replace the PDF. The old one is copied to `_old/resume-backups/` first.

Save writes to `src/content/editable.json`; the site reloads with the change. Commit and push that file (and a new resume PDF) to update the live site.

The panel only exists under `npm run dev` and only answers requests to localhost. A production build, including the live site, returns 404 for `/admin` and `/api/admin`, and robots.txt asks search engines to skip both.

## Images and files

Everything served to visitors is in `public/`:

- `profile.webp`: the hero photo.
- `projects/`: project pictures. `gallery/` holds generated mockups for the client projects; `adventure-works/`, `mintcred/` and `smart-attendance/` hold real screenshots (plus a demo video); `sales-2025/` holds views drawn from the project's Excel data. Each project's `imageSource` in `editable.json` sets the tag shown on its pictures ("Real screenshot", "Built from project data" or "Mockup"). When you get a real screenshot for a project, replace its pictures and change `imageSource` to `"screenshot"`.
- `work/`: illustrations for the What I do cards.
- `logos/`: tool logos.
- `Venkatesan-G-Resume.pdf`: the resume behind the Resume link and Download Resume button.

`_old/` holds earlier versions and unused images. It is not part of the site.

## Before going live

- The site's public address is set in `src/content/site.ts` (`site.url`). Search engines and link previews use it, so update it if the address changes.
- There is no contact form. Visitors reach you through the LinkedIn, GitHub and email links in the Get in touch section.
