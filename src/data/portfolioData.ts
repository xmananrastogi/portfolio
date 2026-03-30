export const portfolioData = {
  name: "MANAN RASTOGI",
  resumeLink: "https://drive.google.com/file/d/1_lEEhM5dyYXu85KtgyC3IX2vOfIUA_XI/view",
  roles: [
    "ECE & Biomedical Engineer",
    "Full-Stack Developer",
    "Neural Network Researcher"
  ],
  about: {
    role: "ECE & BML Engineer @ VIT Vellore",
    location: "VIT Vellore, India",
    education: "B.Tech in ECE (Biomedical Engineering)",
    expertise: ["Digital Systems", "Biomedical Imaging", "Neural Architectures", "System Design"],
    currentlyLearning: ["Edge AI Acceleration", "FPGA Digital Signal Processing"],
    passion: "Developing high-performance digital-biological hybrid systems",
    stats: [
      { label: "Projects Completed", value: "2+" },
      { label: "Technologies", value: "12+" },
      { label: "Lines of Code (K+)", value: "50k+" }
    ],
    skills: [
      "Python", "Flask", "JavaScript", "HTML/CSS", "OpenCV", 
      "Matplotlib", "Pandas", "Swift", "Verilog", "React", 
      "Node.js", "MongoDB", "Git", "SciPy", "Trackpy"
    ]
  },
  projects: [
    {
      id: "woundhealing-ai",
      title: "WoundTrack AI Platform",
      tags: ["Python", "OpenCV", "Biomedical", "Full-Stack"],
      description: [
        "Architected a full-stack automated analysis platform for in-vitro wound healing videos.",
        "Engineered an OpenCV/scikit-image pipeline for high-precision wound area segmentation.",
        "Implemented multi-object cellular tracking using Trackpy/SciPy for microscopic kinetic analysis.",
        "Developed a responsive Plotly.js dashboard for real-time telemetry and clinical data visualization.",
        "Integrated a Flask REST API with SQLite for persistent analysis job management."
      ],
      techStack: ["Python", "Flask", "JavaScript", "OpenCV", "Plotly.js", "SQLite", "SciPy", "Trackpy"],
      links: {
        live: "https://xmananrastogi-woundtrack-ai.hf.space/",
        code: "https://github.com/xmananrastogi/wound-healing-analysis"
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
      techStack: ["React", "TypeScript", "Three.js", "Framer Motion", "GSAP", "Tailwind CSS"],
      links: {
        live: "#",
        code: "https://github.com/xmananrastogi/portfolio"
      },
      images: []
    }
  ],
  skillsCategories: [
    {
      title: "Languages",
      items: ["Python", "JavaScript", "Swift", "Verilog", "C++"]
    },
    {
      title: "Full-Stack & Web",
      items: ["React", "Node.js", "Flask", "HTML/CSS", "Tailwind"]
    },
    {
      title: "Architecture & Data",
      items: ["Neural Networks", "OpenCV", "SciPy", "System Design", "MongoDB"]
    },
    {
      title: "Tools & Hardware",
      items: ["Git", "FPGA Basics", "Matplotlib", "Digital Logic", "Edge Computing"]
    }
  ],
  socials: {
    email: "mananrastogi2k8.210@gmail.com",
    github: "https://github.com/xmananrastogi",
    linkedin: "https://www.linkedin.com/in/manan-rastogi-402697288/"
  }
};
