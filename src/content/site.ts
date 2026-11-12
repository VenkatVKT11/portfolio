/**
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
   * Set NEXT_PUBLIC_SITE_URL to your own domain. Without it, a Vercel deployment
   * uses its production address; anywhere else falls back to a placeholder.
   */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "https://venkatesanvkt-11.vercel.app"),
  /** Paste full profile URLs once verified, e.g. "https://www.linkedin.com/in/…". */
  linkedin: "https://www.linkedin.com/in/venkatesan1104/",
  github: "https://github.com/VenkatVKT11",
  /** The PDF in /public behind the Resume link and the Download Resume button. Set to "" to hide both. */
  resume: "/Venkatesan-G-Resume.pdf",
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
    { name: "Data", project: "sales-analytics-dashboard" },
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

export const about = {
  heading: "About me",
  statement: "I studied AI and data science, then took it into marketing.",
  paragraphs: [
    "I started as a digital marketing intern in April 2026 and became Digital Marketing Manager that July. My day is split between performance marketing on Meta and Google, and building automations that save the team from repeating the same task twice.",
    "I care most about lead generation, video marketing and putting AI to practical use: prompts that produce usable content, and workflows that run without someone watching them.",
  ],
  facts: [
    { label: "Based in", value: "Chennai, Tamil Nadu, India" },
    { label: "Role", value: "Digital Marketing Manager" },
    { label: "Degree", value: "B.Tech, Artificial Intelligence and Data Science" },
    { label: "Languages", value: "Tamil (native), English (professional)" },
  ],
};

export const skills = {
  heading: "Skills and tools",
  intro: "Four areas I work in every week, each linked to the projects where I used it.",
  groups: [
    {
      name: "Digital marketing",
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
      evidence: ["ecommerce-digital-marketing", "real-estate-digital-marketing"],
      skills: [
        "Website development",
        "Landing page development",
        "E-commerce website testing",
        "Vibe coding",
        "Antigravity",
        "Git",
        "GitHub",
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
  /** Card preview image in /public. The current ones are generated mockups; swap in real screenshots when you have them. */
  image: string;
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
  gallery: string[];
  link: string;
};

/**
 * The project pictures are mockups generated for this portfolio, not screenshots of the live work.
 * The site says so on every picture. When you add real screenshots, set both of these to "".
 */
export const projectImageLabel = "Mockup";
export const projectGalleryNote =
  "These pictures are illustrative mockups made for this portfolio. They are not screenshots of the live project.";

/** Client, company and brand names are deliberately left out of every project. */
export const projectsIntro =
  "Four projects across e-commerce, real estate, AI automation and business intelligence. Client names are left out for confidentiality.";

export const projects: Project[] = [
  {
    slug: "ecommerce-digital-marketing",
    title: "E-commerce and Digital Marketing",
    categories: ["E-commerce", "Performance Marketing", "Social Media"],
    image: "/projects/gallery/ecommerce-store.jpg",
    overview:
      "Worked on a cosmetics e-commerce project focused on improving online product discovery, strengthening social media presence, and supporting digital sales campaigns.",
    objectives: [
      "Improve online product visibility.",
      "Support e-commerce customer acquisition.",
      "Increase social media engagement.",
      "Generate potential customer enquiries.",
      "Improve the digital shopping experience.",
    ],
    contributions: [
      "Supported e-commerce website requirements and product presentation.",
      "Worked on website functionality and user experience testing.",
      "Planned social media content calendars.",
      "Created marketing creatives using Canva and AI tools.",
      "Worked on Meta Ads campaigns for awareness, engagement, and lead generation.",
      "Supported festive promotions and B2C/B2B campaigns.",
      "Reviewed campaign performance and audience engagement.",
      "Supported website and checkout-flow testing.",
    ],
    process: [
      "Gathered and documented the business requirements for a live store with user and admin modules.",
      "Ran functional tests and validation checks on the implemented features.",
      "Helped manage the Meta Ads campaign and the digital promotion of the store.",
      "Supported the move from development and testing to the production site.",
    ],
    tools: ["Meta Ads Manager", "Canva", "AI Content Creation Tools", "Social Media Platforms", "E-commerce Website", "Google Analytics"],
    deliverables: [
      "E-commerce website support",
      "Social media content strategy",
      "Campaign creatives",
      "Meta Ads campaign execution",
      "Product promotion content",
      "Website testing and validation",
    ],
    metrics: [
      { label: "Instagram followers", value: "3,500 to 4,200" },
      { label: "Leads generated", value: "100+" },
    ],
    metricsNote: "Historical project figures, not current performance.",
    gallery: ["/projects/gallery/ecommerce-social.jpg"],
    link: "",
  },
  {
    slug: "real-estate-digital-marketing",
    title: "Real Estate Digital Marketing",
    categories: ["Real Estate", "Website Development", "Lead Generation"],
    image: "/projects/gallery/real-estate-site.jpg",
    overview:
      "Worked on a real estate marketing project focused on promoting residential plots through digital platforms, website support, marketing creatives, and lead-generation campaigns.",
    objectives: [
      "Improve online property visibility.",
      "Present property information effectively.",
      "Generate potential buyer enquiries.",
      "Support digital advertising campaigns.",
      "Improve the customer enquiry journey.",
    ],
    contributions: [
      "Supported real estate website development and content presentation.",
      "Assisted with website functionality testing.",
      "Worked on property marketing creatives.",
      "Supported Meta Ads campaign planning and execution.",
      "Developed promotional content for residential plot campaigns.",
      "Supported lead-generation activities.",
      "Reviewed website sections and user navigation.",
      "Assisted with campaign content and digital promotion.",
    ],
    process: [
      "Supported website development, functional testing and workflow validation.",
      "Ran Meta Ads campaigns to drive traffic and generate leads.",
      "Helped with implementation, issue identification and feature validation before and after launch.",
    ],
    tools: [
      "Meta Ads Manager",
      "Canva",
      "AI Creative Tools",
      "Website Development Tools",
      "Social Media Platforms",
      "SEO Fundamentals",
    ],
    deliverables: [
      "Real estate website support",
      "Property marketing creatives",
      "Digital advertising campaigns",
      "Promotional content",
      "Lead-generation campaign support",
      "Website testing and validation",
    ],
    metrics: [],
    metricsNote: "",
    gallery: ["/projects/gallery/real-estate-ads.jpg"],
    link: "",
  },
  {
    slug: "ai-marketing-automation",
    title: "AI and Marketing Automation",
    categories: ["Artificial Intelligence", "Marketing Automation", "Digital Strategy"],
    image: "/projects/gallery/ai-workflow.jpg",
    overview:
      "Worked on AI-focused technology and digital marketing initiatives involving AI content creation, marketing automation concepts, workflow optimization, and technology-focused brand communication.",
    objectives: [
      "Explore AI-powered marketing opportunities.",
      "Improve content production workflows.",
      "Reduce repetitive marketing tasks through automation.",
      "Develop technology-focused digital communication.",
      "Support scalable marketing operations.",
    ],
    contributions: [
      "Used prompt engineering to create structured AI content.",
      "Explored AI-assisted image and video generation.",
      "Developed marketing content concepts.",
      "Worked with n8n workflow automation concepts.",
      "Explored automated marketing workflows.",
      "Supported technology-focused social media content.",
      "Assisted with digital brand communication.",
      "Explored AI tools for improving marketing productivity.",
    ],
    process: [],
    tools: [
      "ChatGPT",
      "Claude",
      "n8n",
      "Prompt Engineering",
      "AI Image Generation",
      "AI Video Generation",
      "Canva",
      "GravityWrite",
    ],
    deliverables: [
      "AI-generated marketing content",
      "Prompt workflows",
      "Automation workflow concepts",
      "Social media content",
      "Technology marketing creatives",
      "AI-assisted content production processes",
    ],
    metrics: [],
    metricsNote: "",
    gallery: ["/projects/gallery/ai-content.jpg"],
    link: "",
  },
  {
    slug: "sales-analytics-dashboard",
    title: "Sales Analytics Dashboard",
    categories: ["Data Analytics", "Business Intelligence", "Data Visualization"],
    image: "/projects/gallery/sales-dashboard.jpg",
    overview:
      "Developed a sales analytics dashboard project using business sales data to explore performance trends, organize key metrics, and communicate insights through visual reporting.",
    objectives: [
      "Understand sales performance.",
      "Identify business trends.",
      "Organize sales data.",
      "Present key business metrics.",
      "Support data-driven decision-making.",
    ],
    contributions: [
      "Worked with structured sales datasets.",
      "Explored and organized sales information.",
      "Analysed sales performance trends.",
      "Developed visual representations of business data.",
      "Organized key metrics into dashboard sections.",
      "Presented data in a clear and understandable format.",
      "Explored insights from sales performance patterns.",
    ],
    process: [],
    tools: ["Microsoft Excel", "Power BI", "Data Visualization", "Data Analysis", "Business Intelligence Concepts"],
    deliverables: [
      "Sales analytics dashboard",
      "KPI visualizations",
      "Sales performance reports",
      "Data-driven insights",
      "Business performance analysis",
    ],
    metrics: [],
    metricsNote: "",
    gallery: ["/projects/gallery/sales-sheet.jpg"],
    link: "",
  },
];

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
