import { Analytics } from "@/components/Analytics";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { PointerGlow } from "@/components/PointerGlow";
import { Projects } from "@/components/Projects";
import { ScrollCue } from "@/components/ScrollCue";
import { Tools } from "@/components/Tools";
import { Work } from "@/components/Workflow";
import { About, Experience, Results, Skills } from "@/components/Sections";
import { experience, projects, site, skills } from "@/content/site";

const current = experience.find((role) => role.current);

const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${site.url}/#person`,
  name: "Venkatesan G",
  jobTitle: "Digital Marketing Manager",
  description:
    "Digital Marketing Manager in Chennai working across performance marketing, AI automation and data analytics.",
  ...(current ? { worksFor: { "@type": "Organization", name: current.place } } : {}),
  knowsAbout: [...new Set(skills.groups.flatMap((group) => group.skills))],
  ...(site.email ? { email: `mailto:${site.email}` } : {}),
  alumniOf: { "@type": "CollegeOrUniversity", name: "Mahendra Engineering College" },
  address: { "@type": "PostalAddress", addressLocality: "Chennai", addressRegion: "Tamil Nadu", addressCountry: "IN" },
  url: site.url,
  ...(site.profileImage ? { image: `${site.url}${site.profileImage}` } : {}),
  sameAs: [site.linkedin, site.github].filter(Boolean),
};

const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  url: site.url,
  name: `${site.name} | Portfolio`,
  inLanguage: "en-IN",
  publisher: { "@id": `${site.url}/#person` },
};

const projectList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Featured projects",
  itemListElement: projects.map((project, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "CreativeWork",
      name: project.title,
      description: project.overview,
      url: `${site.url}/#project-${project.slug}`,
      image: `${site.url}${project.image}`,
      keywords: project.categories.join(", "),
      creator: { "@id": `${site.url}/#person` },
      ...(project.link ? { sameAs: project.link } : {}),
    },
  })),
};

const jsonLd = (data: object) => JSON.stringify(data).replace(/</g, "\\u003c");

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-[var(--acc)] focus:px-5 focus:py-2.5 focus:font-semibold focus:text-[var(--on-acc)]"
      >
        Skip to content
      </a>
      <div className="scroll-progress no-print" aria-hidden="true" />
      <Nav />
      <main id="main">
        <Hero />
        {/* The scroll ring sits centred on the hero's bottom edge: half shows on the first screen,
            the rest appears as you scroll. A zero-height row, so it adds no gap. */}
        <div className="hero-cue no-print relative z-20 flex h-0 items-start justify-center">
          <div className="-translate-y-1/2">
            <ScrollCue />
          </div>
        </div>
        <Tools />
        <About />
        <Projects />
        <Work />
        <Skills />
        <Experience />
        <Results />
      </main>
      <Contact />
      {[person, website, projectList].map((data, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(data) }} />
      ))}
      <Analytics />
      <PointerGlow />
    </>
  );
}
