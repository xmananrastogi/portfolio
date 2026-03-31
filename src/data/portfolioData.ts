export const portfolioData = {
  name: "MANAN RASTOGI",
  resumeLink: "https://drive.google.com/file/d/12WWLMK3u079zUcsO0HwMXNmcZHQCiYC6/view?usp=sharing",
  roles: [
    "Biomedical Systems Engineer",
    "Full-Stack Technical Architect",
    "Neural Network Researcher"
  ],
  about: {
    role: "ECE & BML Engineer @ VIT Vellore",
    location: "VIT Vellore, India",
    education: "B.Tech in ECE (Biomedical Engineering)",
    expertise: [
      "Diagnostic Algorithms", 
      "Computer Vision", 
      "3D Generative UI", 
      "System Architecture", 
      "Biomedical Imaging", 
      "Neural Architectures"
    ],
    currentlyLearning: [
      "Advanced GLSL / Shader Physics", 
      "Edge AI Acceleration", 
      "FPGA Digital Signal Processing",
      "Real-time Bio-Signal Processing"
    ],
    passion: "Architecting high-performance digital-biological hybrid systems",
    stats: [
      { label: "Research Projects", value: "3+" },
      { label: "Technical Stacks", value: "18+" },
      { label: "Lines of Code (K+)", value: "50k+" }
    ],
    skills: [
      "Python 3.12", "React", "TypeScript", "Three.js", "OpenCV", 
      "SciPy", "Trackpy", "Flask", "Node.js", "Verilog", "GSAP", 
      "Framer Motion", "Tailwind CSS", "MongoDB", "SQLite"
    ]
  },
  projects: [
    {
      id: "woundhealing-ai",
      title: "WoundTrack AI Diagnostic Dashboard",
      tags: ["Biomedical", "OpenCV", "Kinetic Tracking", "Full-Stack"],
      description: [
        "Architected a clinical-grade diagnostic engine in Python for the quantification of in-vitro wound healing assays.",
        "Engineered a high-precision OpenCV/scikit-image pipeline featuring Ensemble Segmentation (Variance + Entropy + Ridge filtering).",
        "Implemented 'Healing Entropy' and 'Wavefront Roughness' metrics via fractal dimension analysis to quantify cellular migration disorder.",
        "Developed a temporal smoothing layer using 1D Gaussian kernels to eliminate microscopic sensor noise from kinetic velocity curves.",
        "Integrated a Flask/SQLite hybrid backend for persistent batch-processing of research datasets."
      ],
      techStack: ["Python 3.12", "Flask", "OpenCV", "NumPy", "SciPy", "Trackpy", "SQLite", "Plotly.js"],
      links: {
        live: "https://xmananrastogi-woundtrackai.hf.space/",
        code: "https://github.com/xmananrastogi/WoundTrack-AI"
      },
      images: [
        "assets/images/Dashboard Screenshot.jpeg",
        "assets/images/Image Analysis.jpeg",
        "assets/images/Results.jpeg",
        "assets/images/Batch Processing Interface.jpeg"
      ]
    },
    {
      id: "modern-portfolio",
      title: "Interactive Engineering Portfolio",
      tags: ["React", "Three.js", "Vite", "GSAP"],
      description: [
        "Designed a high-fidelity 3D portfolio showcasing the intersection of ECE and Computer Science.",
        "Developed a custom React Three Fiber scene with dynamic Silicon Chip and Neural Bus motifs.",
        "Implemented advanced Framer Motion and GSAP animations for a fluid, dashboard-like experience.",
        "Integrated a system-init sequence and magnetic interaction layers for premium UX.",
        "Built with TypeScript and Tailwind CSS for scalable, performant architecture."
      ],
      techStack: ["React", "TypeScript", "Three.js (R3F)", "Framer Motion", "GSAP", "Tailwind CSS"],
      links: {
        live: "#",
        code: "https://github.com/xmananrastogi/portfolio"
      },
      images: []
    }
  ],
  skillsCategories: [
    {
      title: "Diagnostic Engineering",
      items: ["Python 3.12", "OpenCV", "NumPy", "SciPy", "Trackpy", "scikit-image"]
    },
    {
      title: "Frontend Architecture",
      items: ["React", "TypeScript", "Three.js (R3F)", "GSAP", "Framer Motion", "Tailwind CSS"]
    },
    {
      title: "Systems & Backend",
      items: ["Flask", "Node.js", "SQLite", "MongoDB", "REST APIs", "System Design"]
    },
    {
      title: "Hardware & Logic",
      items: ["Verilog", "Digital Logic", "FPGA Basics", "Edge Computing", "C++", "Git"]
    }
  ],
  socials: {
    email: "mananrastogi2k8.210@gmail.com",
    github: "https://github.com/xmananrastogi",
    linkedin: "https://www.linkedin.com/in/manan-rastogi-402697288/"
  }
};
