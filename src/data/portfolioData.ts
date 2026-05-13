const BASE = import.meta.env.BASE_URL;

export const portfolioData = {
  name: "MANAN RASTOGI",
  positioning:
    "Applied AI and full-stack engineer building computer vision systems, polished interfaces, and deployment-ready technical products.",
  shortPositioning:
    "Python, LLM evaluation, computer vision, React, and systems thinking across research and product work.",
  resumeLink:
    "https://drive.google.com/file/d/12WWLMK3u079zUcsO0HwMXNmcZHQCiYC6/view?usp=sharing",
  roles: [
    "Applied AI Engineer",
    "Full-Stack Interface Builder",
    "Computer Vision Systems Developer",
  ],
  proofMetrics: [
    { label: "Cells tracked", value: "441", detail: "249 control + 192 Hg-treated" },
    { label: "Frames processed", value: "800+", detail: "batch microscopy workload" },
    { label: "CPU runtime", value: "<10m", detail: "consumer hardware, no GPU" },
    { label: "Agreement gain", value: "+28%", detail: "vs ImageJ manual workflow" },
  ],
  about: {
    role: "Applied AI + Full-Stack Engineer @ VIT & IIT Madras",
    location: "Vellore & Chennai, India",
    education:
      "B.Tech in Electronics & Communication Engineering with Biomedical specialization at VIT | BS in Data Science and Applications at IIT Madras",
    operatingPrinciples: [
      "Prefer systems that can be inspected, measured, and explained.",
      "Use interface design to make complex work easier to understand.",
      "Document real constraints instead of hiding them behind vague claims.",
      "Build with enough polish that technical work is easy to evaluate.",
    ],
    focusAreas: [
      "Applied AI",
      "Computer vision",
      "LLM evaluation",
      "Full-stack interfaces",
      "Research dashboards",
      "Embedded systems foundations",
    ],
    currentlyExploring: [
      "LLM-assisted technical workflows",
      "AI project development",
      "Edge AI acceleration",
      "FPGA and DSP foundations",
    ],
    skills: [
      "Python 3.12",
      "OpenCV",
      "SciPy",
      "TrackPy",
      "Flask",
      "SQLite",
      "React",
      "TypeScript",
      "Three.js",
      "Tailwind CSS",
      "Verilog",
      "C++",
    ],
  },
  systems: [
    {
      id: "woundtrack-ai",
      title: "WoundTrack AI",
      eyebrow: "Flagship research system",
      oneLine:
        "Biomedical computer vision workflow for tracking cell migration from microscopy videos.",
      problem:
        "Manual wound-healing analysis is slow, inconsistent, and difficult to reproduce across experimental conditions.",
      whyItMatters:
        "Cell migration data can reveal treatment effects, but the workflow needs traceable detection, tracking, and motion metrics before it can support research decisions.",
      context:
        "Microscopy video analysis across control and mercury-treated samples, focused on velocity, trajectory continuity, and anomalous diffusion behavior.",
      constraints: [
        "Must run without GPU dependency.",
        "Must preserve explainability over black-box predictions.",
        "Must process large frame batches without blocking the interface.",
        "Must expose outputs through a usable research dashboard.",
      ],
      metrics: [
        { label: "Control cells", value: "249" },
        { label: "Hg-treated cells", value: "192" },
        { label: "Frames", value: "800+" },
        { label: "Runtime", value: "<10 min" },
        { label: "Agreement", value: "+28%" },
        { label: "Conditions", value: "5" },
      ],
      pipeline: [
        {
          stage: "01",
          title: "Normalize",
          summary: "Flatfield correction reduces illumination variance before detection.",
          evidence: "Improves stability on low-contrast microscopy frames.",
        },
        {
          stage: "02",
          title: "Detect",
          summary: "LoG blob detection and sub-pixel centroid refinement localize cells.",
          evidence: "Designed for explainable cell localization instead of opaque masks.",
        },
        {
          stage: "03",
          title: "Track",
          summary: "Gap-closing LAP tracker links detections into trajectories.",
          evidence: "Kalman prediction helps preserve trajectories through missed frames.",
        },
        {
          stage: "04",
          title: "Smooth",
          summary: "Savitzky-Golay smoothing reduces noisy velocity spikes.",
          evidence: "Keeps kinetic curves readable without hiding trend behavior.",
        },
        {
          stage: "05",
          title: "Analyze",
          summary: "Velocity, MSD exponents, and condition-level comparisons are generated.",
          evidence: "Observed MSD alpha values: 0.135 control, 0.462 Hg-treated.",
        },
        {
          stage: "06",
          title: "Report",
          summary: "Flask dashboard exposes batch results, plots, and downloadable analysis.",
          evidence: "Asynchronous processing keeps 800+ frame workloads usable.",
        },
      ],
      benchmarks: [
        { metric: "Tracking workflow", baseline: "Manual / semi-manual", system: "Automated batch pipeline" },
        { metric: "Runtime", baseline: "Human-paced review", system: "<10 min on consumer CPU" },
        { metric: "Tracked cells", baseline: "Variable by operator", system: "441 total cells" },
        { metric: "Agreement", baseline: "ImageJ reference", system: "+28% higher agreement" },
        { metric: "Explainability", baseline: "Manual judgement", system: "Inspectable CV stages" },
      ],
      failureModes: [
        {
          title: "Low-contrast frames",
          risk: "Cells become difficult to separate from background texture.",
          mitigation: "Flatfield normalization and threshold tuning before blob detection.",
        },
        {
          title: "Cell overlap",
          risk: "Close cells can merge into a single detection.",
          mitigation: "Centroid refinement plus trajectory continuity checks.",
        },
        {
          title: "Temporary detection loss",
          risk: "A missing frame can break trajectory identity.",
          mitigation: "Gap closing with Kalman prediction in the LAP tracker.",
        },
        {
          title: "Noisy velocity curves",
          risk: "Microscopic jitter can exaggerate motion metrics.",
          mitigation: "Savitzky-Golay smoothing and condition-level aggregation.",
        },
      ],
      architecture: [
        "Python 3.12 analysis core",
        "OpenCV + SciPy + TrackPy pipeline",
        "Flask research dashboard",
        "SQLite job/result persistence",
        "Plotly visualization layer",
        "Hugging Face Space deployment",
      ],
      deployment:
        "Hosted as a Hugging Face Space with a Flask dashboard and reproducible GitHub source.",
      links: {
        live: "https://xmananrastogi-woundtrackai.hf.space/",
        code: "https://github.com/xmananrastogi/WoundTrack-AI",
      },
      images: [
        `${BASE}assets/images/dashboard-screenshot.jpeg`,
        `${BASE}assets/images/image-analysis.jpeg`,
        `${BASE}assets/images/results.jpeg`,
        `${BASE}assets/images/batch-processing-interface.jpeg`,
      ],
      futureWork: [
        "Interactive correction UI for ambiguous tracks.",
        "Benchmark harness with saved experiment versions.",
        "Segmentation-assisted detection for dense overlap cases.",
        "Role-specific explanations for researchers, recruiters, and engineers.",
      ],
    },
    {
      id: "portfolio-research-os",
      title: "MananOS Portfolio",
      eyebrow: "Interactive engineering portfolio",
      oneLine:
        "Interactive React portfolio built with TypeScript, real-time 3D, motion, and responsive project presentation.",
      problem:
        "I wanted a portfolio that could present engineering work with stronger interaction and cleaner project navigation.",
      whyItMatters:
        "It shows frontend range beyond static pages and demonstrates how I structure technical information for real viewers.",
      context:
        "Personal frontend project built with React, TypeScript, Three.js, Framer Motion, Tailwind CSS, and Vite.",
      constraints: [
        "Keep the design rich without making content harder to scan.",
        "Balance personality with recruiter readability.",
        "Support future projects without rebuilding the site structure.",
      ],
      metrics: [
        { label: "Stack", value: "React" },
        { label: "Language", value: "TS" },
        { label: "3D", value: "R3F" },
        { label: "Format", value: "Case study" },
      ],
      pipeline: [
        {
          stage: "01",
          title: "Structure",
          summary: "Separate profile, projects, skills, and contact into clear scanning zones.",
          evidence: "The page is organized around dedicated sections and anchored navigation.",
        },
        {
          stage: "02",
          title: "Refine",
          summary: "Use animation, layout, and typography to improve presentation without hiding the work.",
          evidence: "The interface is driven by React, motion primitives, and responsive component composition.",
        },
      ],
      benchmarks: [],
      failureModes: [],
      architecture: ["React", "TypeScript", "Three.js (R3F)", "Framer Motion", "Tailwind CSS", "Vite"],
      deployment: "Static deployment on GitHub Pages.",
      links: {
        live: "https://xmananrastogi.github.io/portfolio/",
        code: "https://github.com/xmananrastogi/portfolio",
      },
      images: [],
      futureWork: [
        "Additional project case studies.",
        "Improved project media treatment.",
        "Further motion and accessibility passes.",
      ],
    },
    {
      id: "gssoc-editron",
      title: "Editron — GSSoC '26",
      eyebrow: "Open source contribution",
      oneLine:
        "Contributing to Editron, an open-source code editor, through GirlScript Summer of Code 2026.",
      problem:
        "Open-source codebases accumulate lint warnings and unused imports that degrade code quality and maintainability over time.",
      whyItMatters:
        "Participating in structured open-source programs builds collaboration skills and demonstrates the ability to work within established codebases and contribution workflows.",
      context:
        "GSSoC (GirlScript Summer of Code) is one of India's largest open-source contribution programs. I am contributing to the Editron project.",
      constraints: [
        "Follow the project's existing code style and contribution guidelines.",
        "Scope changes tightly to avoid unintended regressions.",
        "Communicate clearly through issues and pull requests.",
      ],
      metrics: [
        { label: "Program", value: "GSSoC" },
        { label: "Year", value: "2026" },
        { label: "Role", value: "Contributor" },
      ],
      pipeline: [
        {
          stage: "01",
          title: "Identify",
          summary: "Reviewed open issues and selected actionable code-quality improvements.",
          evidence: "Claimed Issue #60: removing unused import warnings across the codebase.",
        },
        {
          stage: "02",
          title: "Contribute",
          summary: "Fork, branch, fix, test, and submit pull request following project guidelines.",
          evidence: "Standard open-source Git workflow: fork → feature branch → PR.",
        },
      ],
      benchmarks: [],
      failureModes: [],
      architecture: ["Open-source workflow", "Git", "GitHub Issues & PRs"],
      deployment: "Contributions merged into the upstream Editron repository.",
      links: {
        live: "https://github.com/AmanYadav31/Editron",
        code: "https://github.com/xmananrastogi",
      },
      images: [],
      futureWork: [
        "Contribute to more complex features beyond lint fixes.",
        "Explore other GSSoC projects in the AI/ML space.",
      ],
    },
  ],
  skillsCategories: [
    {
      title: "Applied AI & Evaluation",
      proof: "LLM APIs, evaluation rules, deterministic checks, and technical outputs that can be inspected.",
      items: ["Python 3.12", "LLM APIs", "Prompt evaluation", "Rule-based validation", "NumPy"],
    },
    {
      title: "Computer Vision",
      proof: "Detection, tracking, image processing, and analysis pipelines from the WoundTrack project.",
      items: ["OpenCV", "scikit-image", "TrackPy", "SciPy", "Plotly"],
    },
    {
      title: "Web & Backend",
      proof: "Interfaces and deployments that turn technical work into something inspectable and usable.",
      items: ["React", "TypeScript", "Flask", "REST APIs", "Tailwind CSS"],
    },
    {
      title: "Systems & Tooling",
      proof: "Data persistence, implementation discipline, and ECE-oriented engineering foundations.",
      items: ["SQLite", "MongoDB", "Docker", "Verilog", "C++"],
    },
  ],
  socials: {
    email: "mananrastogi2k8.210@gmail.com",
    github: "https://github.com/xmananrastogi",
    linkedin: "https://www.linkedin.com/in/manan-rastogi-402697288/",
  },
};
