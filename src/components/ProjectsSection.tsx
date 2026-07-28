import { motion } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const projectCards = [
  {
    id: 'woundtrack-ai',
    title: 'WoundTrack AI',
    eyebrow: 'Biomedical CV',
    desc: 'Traditional computer vision pipeline for cell migration tracking from microscopy videos. OpenCV + scikit-image + TrackPy, no GPU needed.',
    tags: ['OpenCV', 'TrackPy', 'Flask', 'Hugging Face'],
    links: { live: 'https://xmananrastogi-woundtrackai.hf.space/', code: 'https://github.com/xmananrastogi/WoundTrack-AI' },
  },
  {
    id: 'vitalize',
    title: 'VITalize',
    eyebrow: 'EdTech Platform',
    desc: 'Full-stack academic platform indexing 8,800+ VIT past papers with AI solutions, FFCS planner, and academic dashboard.',
    tags: ['Next.js', 'MongoDB', 'NVIDIA LLaMA 3.1', 'Vercel'],
    links: { live: 'https://vitalize-vit.vercel.app', code: 'https://github.com/xmananrastogi/vitalize-fullstack' },
  },
  {
    id: 'gssoc-editron',
    title: 'Editron — GSSoC \'26',
    eyebrow: 'Open Source',
    desc: 'Contributing code quality improvements to Editron through GirlScript Summer of Code, one of India\'s largest open-source programs.',
    tags: ['Open Source', 'GSSoC', 'Code Quality'],
    links: { live: 'https://github.com/AmanYadav31/Editron', code: 'https://github.com/xmananrastogi' },
  },
  {
    id: 'portfolio-research-os',
    title: 'Interactive Portfolio',
    eyebrow: 'Frontend',
    desc: 'This site — React, TypeScript, Framer Motion, Tailwind. Clean project presentation with responsive design and motion-driven UI.',
    tags: ['React', 'TypeScript', 'Tailwind', 'Framer Motion'],
    links: { live: 'https://xmananrastogi.github.io/portfolio/', code: 'https://github.com/xmananrastogi/portfolio' },
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="relative overflow-hidden px-4 py-16 md:py-24" aria-label="Projects">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mb-12 max-w-3xl"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-signal-cyan">
            Projects
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-text-primary md:text-5xl">
            What I've built
          </h2>
          <p className="mt-5 text-lg leading-8 text-text-secondary">
            Biomedical computer vision, full-stack academic tools, open-source contributions, and frontend engineering.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2">
          {projectCards.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-2xl border border-white/10 bg-surface p-6 transition hover:border-white/20"
              aria-label={`Project: ${project.title}`}
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-signal-cyan">
                {project.eyebrow}
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-text-primary md:text-3xl">
                {project.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-text-secondary">
                {project.desc}
              </p>
              <div className="mt-5 flex flex-wrap gap-2" role="list" aria-label="Technologies">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    role="listitem"
                    className="rounded-full bg-white/[0.04] px-3 py-1.5 text-xs text-text-secondary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex gap-3">
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-text-primary px-4 py-3 text-sm font-semibold text-background transition hover:bg-white"
                  aria-label={`Live demo of ${project.title} (opens in new tab)`}
                >
                  Live
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
                <a
                  href={project.links.code}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-text-primary transition hover:bg-white/[0.07]"
                  aria-label={`Source code for ${project.title} (opens in new tab)`}
                >
                  <Github size={16} aria-hidden="true" />
                  Source
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;