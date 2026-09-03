import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { SpotlightCard } from './ui/SpotlightCard';

type Project = typeof portfolioData.projects[0];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, type: "spring", bounce: 0 }}
      className="h-full"
    >
      <SpotlightCard className="flex h-full flex-col p-6 md:p-8">
        {/* Eyebrow */}
        <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
          {project.eyebrow}
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold leading-tight text-zinc-50 md:text-2xl">
          {project.title}
        </h3>

        {/* Description */}
        <p className="mt-4 flex-1 text-sm leading-relaxed text-zinc-400">
          {project.desc}
        </p>

        {/* Stats */}
        {project.stats && (
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-4 border-t border-zinc-800/50 pt-5">
            {project.stats.map((s) => (
              <div key={s.label}>
                <div className="font-mono text-base font-bold text-zinc-200">{s.value}</div>
                <div className="mt-0.5 text-[0.65rem] uppercase tracking-wider text-zinc-500">{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Tags */}
        <div className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="badge">{tag}</span>
          ))}
        </div>

        {/* Buttons */}
        <div className="mt-8 flex gap-3">
          <a
            href={project.links.live}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex-1 justify-center"
            aria-label={`Live demo of ${project.title} (opens in new tab)`}
          >
            Live
            <ArrowUpRight size={14} strokeWidth={2.5} aria-hidden="true" />
          </a>
          <a
            href={project.links.code}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary flex-1 justify-center"
            aria-label={`Source code for ${project.title} (opens in new tab)`}
          >
            <Github size={14} aria-hidden="true" />
            Source
          </a>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}

const ProjectsSection = () => {
  const featured = portfolioData.projects.filter((p) => p.featured);
  const secondary = portfolioData.projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="px-5 py-24 md:px-10" aria-label="Projects">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-8 text-2xl font-bold tracking-tight text-zinc-50">Projects</h2>

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