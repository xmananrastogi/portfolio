import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

type Project = typeof portfolioData.projects[0];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="card card-blue group flex flex-col rounded-xl p-6 md:p-7"
      aria-label={`Project: ${project.title}`}
    >
      {/* Eyebrow */}
      <div className="mb-2 text-[0.625rem] font-semibold uppercase tracking-[0.15em] text-[#3b82f6]">
        {project.eyebrow}
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold leading-tight text-white md:text-2xl">
        {project.title}
      </h3>

      {/* Stats */}
      {project.stats && (
        <div className="mt-4 flex gap-5 border-t border-white/[0.05] pt-4">
          {project.stats.map((s) => (
            <div key={s.label}>
              <div className="font-mono text-sm font-bold text-[#3b82f6]">{s.value}</div>
              <div className="text-[0.6rem] uppercase tracking-wider text-white/30">{s.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Description */}
      <p className="mt-4 flex-1 text-[0.875rem] leading-[1.65] text-white/50">
        {project.desc}
      </p>

      {/* Tags */}
      <div className="mt-5 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>

      {/* Buttons */}
      <div className="mt-6 flex gap-2.5">
        <a
          href={project.links.live}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-blue flex-1 justify-center py-2.5 text-xs"
          aria-label={`Live demo of ${project.title} (opens in new tab)`}
        >
          Live
          <ArrowUpRight size={13} strokeWidth={2.5} aria-hidden="true" />
        </a>
        <a
          href={project.links.code}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost flex-1 justify-center py-2.5 text-xs"
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
  const featured  = portfolioData.projects.filter((p) => p.featured);
  const secondary = portfolioData.projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="px-5 py-24 md:px-10 md:py-32" aria-label="Projects">
      <div className="mx-auto max-w-5xl">
        <div className="section-label">Projects</div>

        <div className="grid gap-4 md:grid-cols-2">
          {featured.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
        </div>

        {secondary.length > 0 && (
          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {secondary.map((p, i) => <ProjectCard key={p.id} project={p} index={featured.length + i} />)}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;