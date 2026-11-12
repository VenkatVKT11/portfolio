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
| About text and facts | `about` |
| Projects, their details and pictures | `projects` |
| What I do cards and the lead workflow | `work`, `workflow` |
| Skills | `skills` |
| Experience, career transition, education, certifications | `experience`, `careerTransition`, `education`, `certifications` |
| Campaign results | `metrics` |
| Contact wording | `contact` |

## Images and files

Everything served to visitors is in `public/`:

- `profile.webp`: the hero photo.
- `projects/gallery/`: project pictures. These are generated mockups and are labelled "Mockup" on the site. Replace them with real screenshots and set `projectImageLabel` and `projectGalleryNote` to `""` in `site.ts`.
- `work/`: illustrations for the What I do cards.
- `logos/`: tool logos.
- `Venkatesan-G-Resume.pdf`: the resume behind the Resume link and Download Resume button.

`_old/` holds earlier versions and unused images. It is not part of the site.

## Before going live

- The site's public address is set in `src/content/site.ts` (`site.url`). Search engines and link previews use it, so update it if the address changes.
- There is no contact form. Visitors reach you through the LinkedIn, GitHub and email links in the Get in touch section.
