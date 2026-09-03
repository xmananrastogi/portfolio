import { motion } from 'framer-motion';
import { ArrowDown, FileText, Github, Linkedin } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const stagger = {
  container: { hidden: {}, show: { transition: { staggerChildren: 0.1 } } },
  item: {
    hidden: { opacity: 0, y: 20 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  },
};

const ResearchHero = () => {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center px-5 pb-20 pt-28 md:px-8"
      aria-label="Hero section"
    >
      {/* Radial glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(59,130,246,0.07) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-5xl">
        <motion.div
          variants={stagger.container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-start gap-6"
        >
          {/* Status badge */}
          <motion.div variants={stagger.item}>
            <span className="status-badge" role="status">
              <span className="status-dot" aria-hidden="true" />
              Available for opportunities
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1 variants={stagger.item} className="text-5xl font-extrabold leading-none tracking-tight md:text-7xl lg:text-8xl">
            <span className="name-aurora">Manan Rastogi</span>
          </motion.h1>

          {/* Role line */}
          <motion.p
            variants={stagger.item}
            className="text-base font-medium tracking-widest text-muted uppercase"
          >
            Applied AI · Computer Vision · Full-Stack
          </motion.p>

          {/* Positioning */}
          <motion.p
            variants={stagger.item}
            className="max-w-2xl text-lg leading-relaxed text-text-secondary"
          >
            {portfolioData.positioning}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={stagger.item} className="flex flex-wrap items-center gap-4 pt-2">
            <a
              id="cta-projects"
              href="#projects"
              className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-accent-hover hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]"
            >
              View work
              <ArrowDown size={15} aria-hidden="true" />
            </a>
            <a
              id="cta-resume"
              href={portfolioData.resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-white/[0.1] px-6 py-3 text-sm font-semibold text-text-secondary transition-all hover:border-white/20 hover:text-text-primary"
              aria-label="View resume (opens in new tab)"
            >
              <FileText size={15} aria-hidden="true" />
              Resume
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div variants={stagger.item} className="flex items-center gap-5 pt-1">
            <a
              href={portfolioData.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted transition-colors hover:text-text-primary"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href={portfolioData.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted transition-colors hover:text-text-primary"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <span className="h-px w-10 bg-white/10" />
            <span className="text-xs text-muted font-mono">ECE @ VIT · DS @ IIT Madras</span>
          </motion.div>
        </motion.div>

        {/* Quick stats row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 grid grid-cols-2 gap-3 sm:grid-cols-4"
          id="about"
        >
          {portfolioData.metrics.map((m) => (
            <div
              key={m.label}
              className="card rounded-xl p-5"
            >
              <div className="font-mono text-2xl font-bold text-accent">{m.value}</div>
              <div className="mt-1 text-xs font-medium text-text-secondary">{m.label}</div>
              <div className="mt-0.5 text-[10px] text-muted">{m.sub}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ResearchHero;