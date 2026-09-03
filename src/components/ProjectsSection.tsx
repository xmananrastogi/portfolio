import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

type Project = typeof portfolioData.projects[0];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="card card-glow group relative flex flex-col overflow-hidden rounded-xl p-6"
      aria-label={`Project: ${project.title}`}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="mb-2 block text-[10px] font-semibold tracking-widest text-accent uppercase">
            {project.eyebrow}
          </span>
          <h3 className="text-xl font-bold text-text-primary leading-snug md:text-2xl">
            {project.title}
          </h3>
        </div>
      </div>

      {/* Stats row */}
      {project.stats && (
        <div className="mt-4 flex gap-4">
          {project.stats.map((s) => (
            <div key={s.label}>
              <div className="font-mono text-base font-bold text-accent">{s.value}</div>
              <div className="text-[10px] text-muted uppercase tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Description */}
      <p className="mt-4 flex-1 text-sm leading-6 text-text-secondary">
        {project.desc}
      </p>

      {/* Tags */}
      <div className="mt-5 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>

      {/* Actions */}
      <div className="mt-6 flex gap-3">
        <a
          href={project.links.live}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-accent px-4 py-2.5 text-xs font-semibold text-white transition-all hover:bg-accent-hover hover:shadow-[0_0_16px_rgba(59,130,246,0.3)]"
          aria-label={`Live demo of ${project.title} (opens in new tab)`}
        >
          Live
          <ArrowUpRight size={13} strokeWidth={2.5} aria-hidden="true" />
        </a>
        <a
          href={project.links.code}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-white/[0.08] bg-white/[0.02] px-4 py-2.5 text-xs font-semibold text-text-secondary transition-all hover:border-white/[0.16] hover:bg-white/[0.05] hover:text-text-primary"
          aria-label={`Source code for ${project.title} (opens in new tab)`}
        >
          <Github size={13} aria-hidden="true" />
          Source
        </a>
      </div>
    </motion.article>
  );
}

const ProjectsSection = () => {
  const featuredProjects = portfolioData.projects.filter((p) => p.featured);
  const otherProjects = portfolioData.projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="px-5 py-24 md:px-8 md:py-32" aria-label="Projects">
      <div className="mx-auto max-w-6xl">
        <div className="section-label">Projects</div>

        {/* Featured 2-col grid */}
        <div className="grid gap-5 md:grid-cols-2">
          {featuredProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* Other projects row */}
        {otherProjects.length > 0 && (
          <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {otherProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={featuredProjects.length + i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;