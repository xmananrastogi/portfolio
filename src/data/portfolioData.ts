export const portfolioData = {
  name: "MANAN RASTOGI",
  roles: [
    "ECE & Biomedical Engineer",
    "Full-Stack Developer",
    "Problem Solver",
    "Innovation Enthusiast"
  ],
  about: {
    role: "ECE & Biomedical Engineer & Full-Stack Developer",
    location: "VIT Vellore",
    education: "B.Tech in ECE (Biomedical)",
    expertise: ["Biomedical Imaging", "Web Development", "System Design"],
    currentlyLearning: ["Advanced ML", "Cloud Architecture"],
    passion: "Bridging healthcare & technology",
    stats: [
      { label: "Projects Completed", value: "1" },
      { label: "Technologies", value: "10+" },
      { label: "Lines of Code (K+)", value: "50k+" }
    ],
    skills: [
      "Python", "Flask", "JavaScript", "HTML/CSS", "OpenCV", 
      "Matplotlib", "Pandas", "Swift", "Verilog", "React", 
      "Node.js", "MongoDB", "Git"
    ]
  },
  projects: [
    {
      id: "woundhealing-ai",
      title: "woundhealing-ai",
      tags: ["Python", "Flask", "JavaScript", "OpenCV", "Data Science"],
      description: [
        "Built a full-stack web app for automated, multi-scale analysis of in-vitro wound healing videos.",
        "Developed a Python-Flask REST API with an SQLite DB to manage analysis jobs & persist results.",
        "Engineered an OpenCV/Scikit-image pipeline for automated wound area segmentation.",
        "Implemented a Trackpy/SciPy multi-object cell tracking system to calculate microscopic metrics.",
        "Built a responsive Plotly.js dashboard for data visualization, comparison, and statistics."
      ],
      techStack: ["Python", "Flask", "JavaScript", "HTML/CSS", "OpenCV", "Plotly.js", "SQLite", "Pandas"],
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
    }
  ],
  skillsCategories: [
    {
      title: "Languages",
      items: ["Python", "JavaScript", "Swift", "Verilog"]
    },
    {
      title: "Web Development",
      items: ["Flask", "HTML/CSS", "JavaScript", "RESTful APIs"]
    },
    {
      title: "Data & Analysis",
      items: ["OpenCV", "Pandas", "Matplotlib", "Data Visualization"]
    },
    {
      title: "Tools & Other",
      items: ["Git", "Image Processing", "System Design", "Problem Solving"]
    }
  ],
  socials: {
    email: "mananrastogi2k8.210@gmail.com",
    github: "https://github.com/xmananrastogi",
    linkedin: "https://www.linkedin.com/in/manan-rastogi-402697288/"
  }
};
