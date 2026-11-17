import editable from "./editable.json";
import type { Mode, ThemeId } from "./themes";

/**
 * The About section, the projects, the theme and the resume path live in editable.json,
 * which the local admin panel (/admin, only under `npm run dev`) reads and writes.
 * Everything else is edited here.
 *
 * All portfolio content lives in this file. Edit text here; the pages update.
 * Leave a field as "" when you don't have it yet: the site shows a neat
 * "to be added" placeholder instead of inventing anything.
 */

export const site = {
  name: "VENKATESAN G",
  title: "Digital Marketing Manager | AI & Marketing Automation",
  tagline: "Digital Marketing × AI × Data",
  location: "Chennai, Tamil Nadu, India",
  /** Shown as the email link in the Contact section. */
  email: "venkatesanvkt0411@gmail.com",
  /** Kept here for reference only; the phone number is not shown anywhere on the site. */
  phone: "+91 63792 29569",
  phoneHref: "+916379229569",
  /**
   * The site's public address, used for search engines and link previews.
   * Change it here if the address changes. It is written out in full on purpose:
   * an environment variable on Vercel was overriding it with an address that returns 404.
   */
  url: "https://venkatesanvkt-11.vercel.app",
  /** Paste full profile URLs once verified, e.g. "https://www.linkedin.com/in/…". */
  linkedin: "https://www.linkedin.com/in/venkatesan1104/",
  github: "https://github.com/VenkatVKT11",
  /**
   * Google Analytics 4 measurement ID, e.g. "G-ABC123XYZ". While it is "", no analytics script loads.
   * Once set, the site reports page views plus these events: contact_click, resume_download,
   * project_view, project_link_click, project_share, view_more_projects and cta_click.
   */
  ga4Id: "",
  /**
   * Colour theme: one of the ids in themes.ts (pastel, noir, ivory, crimson, coral, light).
   * Chosen only in the admin panel (Theme tab); visitors cannot change it.
   */
  theme: editable.theme as ThemeId,
  /** "light" or "dark": every theme has both. Set in the admin panel (Theme tab). */
  mode: editable.mode as Mode,
  /** The PDF in /public behind the Resume link and the Download Resume button. Set to "" to hide both. */
  resume: editable.resume,
  /** Your photo, stored in /public exactly as you supplied it. Set to "" to fall back to the illustration below. */
  profileImage: "/profile.webp",
  /**
   * Faceless illustration shown until a real photo is set. It is not a picture of you.
   * A second option is "/profile-illustration-alt.jpg".
   */
  profilePlaceholder: "/profile-illustration.jpg",
};

export const hero = {
  headline: "Turning Digital Strategy into Measurable Growth.",
  description:
    "I combine performance marketing, AI-powered workflows, creative strategy, and data analytics to build smarter digital growth.",
  /** The three words of the title line. Each one opens the project that shows it. */
  pillars: [
    { name: "Digital Marketing", project: "ecommerce-digital-marketing" },
    { name: "AI", project: "ai-marketing-automation" },
    { name: "Data", project: "adventure-works-power-bi" },
  ],
  primaryCta: { label: "View My Work", href: "#projects" },
  secondaryCta: { label: "Contact Me", href: "#contact" },
};

/**
 * Tools I use. Edit freely.
 * - logo: an official mark stored in /public/logos. Leave "" when no verified logo exists;
 *   the site then shows a plain text mark instead of an invented logo.
 * - status: "In use" for tools you work with regularly, "Exploring" for ones you are still learning.
 *   Confirmed by Venkatesan on 12 Nov 2026. Update a label when a tool moves from exploring to regular use.
 */
export type Tool = {
  name: string;
  category: string;
  logo: string;
  status: "In use" | "Exploring";
};

export const toolCategories = [
  "Digital Marketing & Advertising",
  "Creative Design & Video Editing",
  "AI & Video Generation",
  "Automation & Development",
  "Data & Technical",
] as const;

const [marketing, creative, ai, automation, data] = toolCategories;

export const tools: Tool[] = [
  { name: "Meta Ads", category: marketing, logo: "/logos/meta-ads.svg", status: "In use" },
  { name: "Google Ads", category: marketing, logo: "/logos/google-ads.svg", status: "In use" },
  { name: "LinkedIn Ads", category: marketing, logo: "/logos/linkedin.svg", status: "Exploring" },
  { name: "Google Analytics 4", category: marketing, logo: "/logos/google-analytics.svg", status: "In use" },
  { name: "Google Search Console", category: marketing, logo: "/logos/google-search-console.svg", status: "In use" },
  { name: "SEMrush", category: marketing, logo: "/logos/semrush.svg", status: "Exploring" },
  { name: "Apollo.io", category: marketing, logo: "/logos/apollo-io.svg", status: "Exploring" },
  { name: "LinkedIn Sales Navigator", category: marketing, logo: "/logos/linkedin.svg", status: "Exploring" },
  { name: "Mailchimp", category: marketing, logo: "/logos/mailchimp.svg", status: "In use" },

  { name: "Canva", category: creative, logo: "/logos/canva.svg", status: "In use" },
  { name: "CapCut", category: creative, logo: "/logos/capcut.svg", status: "Exploring" },
  { name: "Adobe Premiere Pro", category: creative, logo: "/logos/premiere-pro.svg", status: "In use" },
  { name: "Adobe After Effects", category: creative, logo: "/logos/after-effects.svg", status: "In use" },
  { name: "Filmora", category: creative, logo: "/logos/filmora.svg", status: "Exploring" },

  { name: "ChatGPT", category: ai, logo: "/logos/chatgpt.svg", status: "In use" },
  { name: "Claude", category: ai, logo: "/logos/claude.svg", status: "In use" },
  { name: "Google Gemini", category: ai, logo: "/logos/gemini.svg", status: "Exploring" },
  { name: "Higgsfield", category: ai, logo: "/logos/higgsfield.png", status: "In use" },
  { name: "Seedance", category: ai, logo: "", status: "Exploring" },
  { name: "Google Flow", category: ai, logo: "/logos/google-flow.png", status: "In use" },

  { name: "n8n", category: automation, logo: "/logos/n8n.svg", status: "In use" },
  { name: "Google Antigravity", category: automation, logo: "/logos/antigravity.svg", status: "In use" },

  { name: "Power BI", category: data, logo: "/logos/power-bi.svg", status: "In use" },
  { name: "Microsoft Excel", category: data, logo: "/logos/excel.svg", status: "In use" },
  { name: "Git", category: data, logo: "/logos/git.svg", status: "In use" },
  { name: "GitHub", category: data, logo: "/logos/github.svg", status: "In use" },
];

export const workflow = {
  heading: ["Ads that find people.", "Automation that follows up."],
  intro:
    "I'm Venkatesan G, a Digital Marketing Manager based in Chennai, Tamil Nadu. I run paid campaigns, build the AI workflows that turn clicks into leads, and use the data to decide what to do next.",
  caption: "How a lead moves through my work",
  steps: [
    { title: "Find the audience", detail: "Research, SEO, analytics", icon: "audience" },
    { title: "Run the ads", detail: "Meta Ads, Google Ads", icon: "ads" },
    { title: "Land the click", detail: "Landing pages, websites", icon: "landing" },
    { title: "Capture the lead", detail: "Forms, lead generation", icon: "lead" },
    { title: "Automate the reply", detail: "n8n, ChatGPT, Claude", icon: "automate" },
    { title: "Keep them watching", detail: "Video, social content", icon: "watch" },
  ],
} as const;

export const about = editable.about;

export const skills = {
  heading: "Skills and tools",
  intro: "Five areas I work in, each linked to the projects where I used it.",
  groups: [
    {
      name: "Digital skills",
      accent: false,
      evidence: ["ecommerce-digital-marketing", "real-estate-digital-marketing"],
      skills: [
        "Meta Ads",
        "Google Ads",
        "SEO",
        "Social media marketing",
        "Content marketing",
        "Lead generation",
        "Campaign management",
        "Marketing analytics",
        "Email marketing",
        "Keyword research",
        "Competitor analysis",
        "Google Analytics",
        "Google Search Console",
        "Meta Business Suite",
        "Mailchimp",
        "CRM",
      ],
    },
    {
      name: "AI and automation",
      accent: true,
      evidence: ["ai-marketing-automation", "ecommerce-digital-marketing"],
      skills: [
        "Prompt engineering",
        "ChatGPT",
        "Claude",
        "n8n",
        "AI automation",
        "Workflow automation",
        "AI content creation",
        "AI video generation",
      ],
    },
    {
      name: "Creative tools",
      accent: false,
      evidence: ["ecommerce-digital-marketing", "real-estate-digital-marketing", "ai-marketing-automation"],
      skills: ["Canva", "Adobe Premiere Pro", "Adobe After Effects", "GravityWrite", "Flow"],
    },
    {
      name: "Technical",
      accent: false,
      evidence: ["mintcred-landing-page", "smart-attendance-system", "ecommerce-digital-marketing"],
      skills: [
        "Website development",
        "Landing page development",
        "E-commerce website testing",
        "Vibe coding",
        "Antigravity",
        "Git",
        "GitHub",
        "React",
        "Tailwind CSS",
        "Python",
      ],
    },
    {
      name: "Data and analytics",
      accent: false,
      evidence: ["adventure-works-power-bi", "sales-analytics-dashboard", "smart-attendance-system"],
      skills: [
        "Power BI",
        "DAX",
        "Power Query",
        "Microsoft Excel",
        "Pivot tables",
        "Dashboard design",
        "Data visualization",
        "SQL",
        "Python",
        "OpenCV",
      ],
    },
  ],
};

export const work = {
  heading: "What I do",
  intro: "The kinds of work I take on",
  cards: [
    {
      slot: "Add a campaign screenshot here",
      /** Path to an image in /public, e.g. "/work/campaign.jpg". */
      image: "/work/paid-ads.jpg",
      title: "Paid ad campaigns",
      text: "Planning, launching and managing lead generation campaigns, then reading the numbers and adjusting budget and creative.",
      tools: "Meta Ads, Google Ads, analytics",
    },
    {
      slot: "Add a workflow screenshot here",
      image: "/work/automation.jpg",
      title: "AI automation workflows",
      text: "Workflows that pick up a new lead, write the first reply and hand it to the right person, so follow-up doesn't depend on memory.",
      tools: "n8n, ChatGPT, Claude",
    },
    {
      slot: "Add a video or reel here",
      image: "/work/video-content.jpg",
      title: "Video and social content",
      text: "Short videos, reels and posts for social channels, edited by hand or generated with AI when that gets there faster.",
      tools: "Premiere Pro, After Effects, Canva, AI video",
    },
    {
      slot: "Add a website screenshot here",
      image: "/work/landing-pages.jpg",
      title: "Landing pages and websites",
      text: "Landing pages built for a single campaign goal, plus testing e-commerce sites before they go in front of customers.",
      tools: "Vibe coding, Antigravity, Git, GitHub",
    },
  ],
};

export type Project = {
  slug: string;
  title: string;
  categories: string[];
  /** true: shown in the main grid. false: shown only after "View more projects". */
  featured: boolean;
  /** Card preview image in /public. */
  image: string;
  /**
   * Where the pictures come from, shown as a tag on every picture:
   * - "screenshot": captured from the real project (the running app, its build, or the original export).
   * - "rebuilt": drawn from the project's real data file because the original app was not available.
   * - "mockup": illustrative picture made for this portfolio.
   */
  imageSource: ImageSource;
  overview: string;
  objectives: string[];
  contributions: string[];
  /** How the work was carried out, in order. The block is hidden while empty. */
  process: string[];
  tools: string[];
  deliverables: string[];
  /** Only add figures you can verify. The block is hidden while empty. */
  metrics: { label: string; value: string }[];
  metricsNote: string;
  /** More pictures in /public, shown in the pop-up gallery. */
  gallery: { src: string; caption: string }[];
  /** Optional screen recording in /public, shown in the pop-up. */
  video?: { src: string; poster: string; caption: string };
  /** Caption for the main picture, shown in the pop-up. */
  imageCaption?: string;
  link: string;
  linkLabel?: string;
};

export type ImageSource = "screenshot" | "rebuilt" | "mockup";

export { themeIds, type ThemeId } from "./themes";

export const imageSourceLabel: Record<ImageSource, string> = {
  screenshot: "Real screenshot",
  rebuilt: "Built from project data",
  mockup: "Mockup",
};

export const imageSourceNote: Record<ImageSource, string> = {
  screenshot: "Captured from the actual project.",
  rebuilt:
    "Drawn from the figures in the project's own Excel workbook. Excel was not available to capture the original file.",
  mockup:
    "These pictures are illustrative mockups made for this portfolio. They are not screenshots of the live project.",
};

/** Client, company and brand names are deliberately left out of every client project. */
export const projectsIntro = editable.projectsIntro;

export const projects = editable.projects as Project[];

/** Formal roles, newest first. `meta` holds employment type, work mode and location. */
export const experience = [
  {
    period: "July 2026 – Present",
    title: "Digital Marketing Manager",
    place: "PN Global Enterprises",
    meta: ["Full-time", "Hybrid"],
    points: [
      "Digital marketing campaign planning and execution.",
      "Social media content and campaign management.",
      "Paid advertising and brand communication.",
      "SEO and SEO audits.",
      "Marketing performance and campaign activities.",
    ],
    current: true,
  },
  {
    period: "April 2026 – July 2026",
    title: "Digital Marketing Intern",
    place: "PN Global Enterprises",
    meta: ["Internship", "On-site"],
    points: [
      "Social media management and content creation.",
      "Meta Ads and Google Ads support.",
      "SEO activities.",
      "Lead-generation support.",
      "Marketing creatives and campaign assistance.",
    ],
    current: false,
  },
  {
    period: "March 2025 – January 2026",
    title: "Data Science with Analytics & AI — Apprenticeship",
    place: "Besant Technologies",
    meta: ["Apprenticeship", "Hybrid", "Bengaluru, Karnataka"],
    points: ["Data analytics learning.", "Business analysis.", "SQL.", "Analytics and AI-related learning."],
    current: false,
  },
  {
    period: "September 2023",
    title: "Machine Learning Intern",
    place: "Pantech eLearning",
    meta: ["Internship, 1 month", "Remote", "Chennai, Tamil Nadu"],
    points: [
      "Machine Learning fundamentals.",
      "Python programming.",
      "Internship training and practical learning.",
    ],
    current: false,
  },
];

/** Shown apart from the roles above: this was a learning period, not a job. */
export const careerTransition = {
  period: "August 2024 – January 2025",
  title: "Career transition",
  label: "Skill development",
  points: [
    "Built foundational knowledge in digital marketing and business growth strategies.",
    "Explored AI tools and their practical applications.",
    "Developed interest in digital marketing, analytics, and technology.",
  ],
};

export const education = [
  {
    period: "2021 – 2024",
    title: "B.Tech, Artificial Intelligence and Data Science",
    place: "Mahendra Engineering College",
  },
];

/**
 * Add each certificate as { name, issuer, year, link }. The Certifications block
 * stays hidden while this list is empty, so nothing unverified is shown.
 */
export const certifications: { name: string; issuer: string; year: string; link: string }[] = [];

/** Historical project metrics. Edit freely; nothing here is presented as current. */
export const metrics = {
  note: "Figures from the cosmetics e-commerce project. They are historical and are not current performance.",
  projectSlug: "ecommerce-digital-marketing",
  followers: { from: 3500, to: 4200, label: "Instagram followers" },
  leads: { value: "100+", label: "Leads generated" },
  campaignTypes: ["Awareness", "Engagement", "Lead Generation"],
  campaignThemes: ["Flash Sale", "Onam Offers", "B2B Promotions", "B2C Promotions"],
};

export const contact = {
  heading: "Get in touch",
  text: "Message me on LinkedIn, GitHub or email.",
  resumeText: "Need my resume? Download it here.",
  footer: "Venkatesan G, Chennai, Tamil Nadu, India",
};
