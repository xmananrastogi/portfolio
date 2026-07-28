import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';

const projects = [
  {
    id: 'woundtrack-ai',
    icon: '(o)',
    title: 'WoundTrack AI',
    desc: 'Biomedical computer vision pipeline for tracking cell migration from microscopy videos. OpenCV + scikit-image + TrackPy — no GPU needed. Ships as a Flask dashboard on Hugging Face.',
    tags: ['OpenCV', 'TrackPy', 'Flask', 'Hugging Face'],
    links: { live: 'https://xmananrastogi-woundtrackai.hf.space/', code: 'https://github.com/xmananrastogi/WoundTrack-AI' },
  },
  {
    id: 'vitalize',
    icon: '</>',
    title: 'VITalize',
    desc: 'Full-stack academic platform for VIT — indexes 8,800+ past papers with AI solutions, a clash-free FFCS planner, and academic dashboard. Next.js, MongoDB, NVIDIA LLaMA.',
    tags: ['Next.js', 'MongoDB', 'NVIDIA LLaMA', 'Vercel'],
    links: { live: 'https://vitalize-vit.vercel.app', code: 'https://github.com/xmananrastogi/vitalize-fullstack' },
  },
  {
    id: 'gssoc-editron',
    icon: '(*)',
    title: 'GSSoC \'26',
    desc: 'Open source contributions on GitHub — code quality improvements, pull requests, and collaborative engineering workflows through GSSoC 2026.',
    tags: ['GitHub', 'GSSoC', 'Open Source'],
    links: { live: 'https://github.com/AmanYadav31/Editron', code: 'https://github.com/xmananrastogi' },
  },
  {
    id: 'portfolio-research-os',
    icon: '>>',
    title: 'Interactive Portfolio',
    desc: 'This site — React, TypeScript, Framer Motion, Tailwind. Clean project presentation with responsive design and motion-driven UI. You\'re looking at it.',
    tags: ['React', 'TypeScript', 'Tailwind', 'Framer Motion'],
    links: { live: 'https://xmananrastogi.github.io/portfolio/', code: 'https://github.com/xmananrastogi/portfolio' },
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
      className="group rounded-2xl border border-white/[0.07] bg-surface p-6 transition-all duration-300 hover:border-white/[0.14] hover:bg-surface-raised hover:-translate-y-0.5"
      aria-label={`Project: ${project.title}`}
    >
      <div className="flex items-start justify-between">
        <h3 className="text-2xl font-semibold text-text-primary md:text-3xl">
          {project.title}
        </h3>
        <span className="font-mono text-lg text-muted" aria-hidden="true">{project.icon}</span>
      </div>

      <p className="mt-5 text-sm leading-7 text-text-secondary">
        {project.desc}
      </p>

      <div className="mt-6 flex flex-wrap gap-2" role="list" aria-label="Technologies">
        {project.tags.map((tag) => (
          <span
            key={tag}
            role="listitem"
            className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1.5 text-xs text-text-secondary"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-7 flex gap-3">
        <a
          href={project.links.live}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-orange-500"
          aria-label={`Live demo of ${project.title} (opens in new tab)`}
        >
          Live
          <ArrowUpRight size={16} strokeWidth={2.5} aria-hidden="true" />
        </a>
        <a
          href={project.links.code}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3 text-sm font-semibold text-text-primary transition-all hover:border-white/[0.14] hover:bg-white/[0.05]"
          aria-label={`Source code for ${project.title} (opens in new tab)`}
        >
          <Github size={16} aria-hidden="true" />
          Source
        </a>
      </div>
    </motion.article>
  );
}

const ProjectsSection = () => {
  return (
    <section id="projects" className="px-6 py-24 md:py-32" aria-label="Projects">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-14 text-4xl font-semibold tracking-tight text-text-primary md:text-5xl">
          What I've built
        </h2>

        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;