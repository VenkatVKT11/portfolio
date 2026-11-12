import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { Projects } from "@/components/Projects";
import { Tools } from "@/components/Tools";
import { Work } from "@/components/Workflow";
import { About, Experience, Results, Skills } from "@/components/Sections";
import { site } from "@/content/site";

const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Venkatesan G",
  jobTitle: "Digital Marketing Manager",
  alumniOf: { "@type": "CollegeOrUniversity", name: "Mahendra Engineering College" },
  address: { "@type": "PostalAddress", addressLocality: "Chennai", addressRegion: "Tamil Nadu", addressCountry: "IN" },
  url: site.url,
  ...(site.profileImage ? { image: `${site.url}${site.profileImage}` } : {}),
  sameAs: [site.linkedin, site.github].filter(Boolean),
};

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Tools />
        <About />
        <Projects />
        <Work />
        <Skills />
        <Experience />
        <Results />
      </main>
      <Contact />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
