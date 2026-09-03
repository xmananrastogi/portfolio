const BASE = import.meta.env.BASE_URL;

export const portfolioData = {
  name: "MANAN RASTOGI",
  positioning:
    "Building deployable AI systems at the intersection of computer vision, full-stack engineering, and real-world automation.",
  shortPositioning:
    "Python · OpenCV · Next.js · LLM APIs · Streamlit · React — from biomedical CV pipelines to production academic platforms.",
  resumeLink: `${BASE}resume.pdf`,

  about: {
    role: "ECE Undergrad @ VIT · BS Data Science @ IIT Madras",
    location: "Bareilly / Vellore, India",
    education:
      "B.Tech ECE (Biomedical) at VIT Vellore (CGPA 7.53) · BS in Data Science & Applications at IIT Madras",
    operatingPrinciples: [
      "Build things that can be inspected, measured, and explained.",
      "Prefer working code over polished pitches.",
      "Document real constraints — not vague capabilities.",
      "Design interfaces that make complex work easy to evaluate.",
    ],
  },



  experience: [
    {
      id: "iocl",
      role: "Summer Intern — Retail Automation",
      company: "Indian Oil Corporation (IOCL)",
      location: "Bareilly, India",
      period: "May 2026 – Jun 2026",
      bullets: [
        "Built ComplaintGuard — a Streamlit + Python app replacing IOCL's manual Excel SLA review. A batch that used to take hours now runs in ~30 seconds.",
        "Reads vendor complaint exports, works out whether each ticket was Early, On Time, or late against its SLA (24h/48h), and totals up INR 1,000/day vendor penalties — output as formatted Excel.",
        "Catches auto-closed tickets and flags equipment visited twice within 30 days — things the old VBA macro couldn't handle (and broke entirely on Mac).",
      ],
      tags: ["Python", "Streamlit", "Pandas", "SLA Automation", "Excel"],
    },
  ],

  projects: [
    {
      id: "vitalize",
      eyebrow: "Full-Stack Platform",
      title: "VITalize AI",
      desc: "Academic platform for VIT students — 9,103 past papers searchable by subject, AI-generated solutions (LLaMA 3.1 + OCR) with KaTeX math, FFCS timetable solver, Chrome extension, and calendar tracking.",
      stats: [
        { label: "Papers", value: "9,103" },
        { label: "Courses", value: "2,439" },
        { label: "Events", value: "2,587" },
      ],
      tags: ["Next.js 15", "TypeScript", "MongoDB", "LLM APIs", "Tesseract OCR"],
      links: {
        live: "https://vitalize-vit.vercel.app",
        code: "https://github.com/xmananrastogi/vitalize-fullstack",
      },
      featured: true,
    },
    {
      id: "woundtrack-ai",
      eyebrow: "Computer Vision Pipeline",
      title: "WoundTrack AI",
      desc: "CV pipeline tracking 441 cells across 800+ frames in under 10 minutes on a regular laptop — 28% more accurate than manual ImageJ. LoG blob detection + LAP tracker + Kalman-filter gap bridging. Flask dashboard for researchers.",
      stats: [
        { label: "Cells", value: "441" },
        { label: "Accuracy", value: "+28%" },
        { label: "Runtime", value: "<10 min" },
      ],
      tags: ["Python", "OpenCV", "Flask", "SciPy", "SQLite"],
      links: {
        live: "https://xmananrastogi-woundtrackai.hf.space/",
        code: "https://github.com/xmananrastogi/WoundTrack-AI",
      },
      featured: true,
    },
    {
      id: "portfolio",
      eyebrow: "Frontend Engineering",
      title: "3D Engineering Portfolio",
      desc: "Personal site with interactive Three.js 3D scenes, lazy-loaded bundle splitting, sub-1s initial load on mobile. Full WCAG pass. Lighthouse: 100 SEO, 97 accessibility, 100 best practices.",
      stats: [
        { label: "SEO", value: "100" },
        { label: "A11y", value: "97" },
        { label: "Load", value: "<1s" },
      ],
      tags: ["React", "TypeScript", "Three.js", "Tailwind CSS"],
      links: {
        live: "https://xmananrastogi.github.io/portfolio/",
        code: "https://github.com/xmananrastogi/portfolio",
      },
      featured: false,
    },
  ],

  skillsCategories: [
    {
      title: "Languages",
      items: ["Python", "TypeScript", "JavaScript"],
    },
    {
      title: "AI / ML & CV",
      items: ["OpenCV", "NumPy", "SciPy", "LLM APIs", "Tesseract OCR"],
    },
    {
      title: "Web & Backend",
      items: ["React", "Next.js", "Three.js", "Flask", "Streamlit", "Tailwind CSS", "REST APIs", "JWT"],
    },
    {
      title: "Databases & Tools",
      items: ["MongoDB", "SQLite", "SQL", "Git", "GitHub", "Vercel", "VS Code"],
    },
  ],

  certifications: [
    {
      title: "Designing Cisco Security Infrastructure (SDSI)",
      issuer: "Cisco / Credly",
      date: "Jul 2026",
    },
  ],

  socials: {
    email: "mananrastogi2k8.210@gmail.com",
    github: "https://github.com/xmananrastogi",
    linkedin: "https://www.linkedin.com/in/manan-rastogi-402697288/",
  },
};
