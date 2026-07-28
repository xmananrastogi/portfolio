import { motion } from 'framer-motion';
import { ArrowRight, FileText } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const ResearchHero = () => {
  return (
    <section
      id="hero"
      className="relative overflow-hidden px-6 pb-28 pt-36 md:pb-36 md:pt-52"
      aria-label="Hero section"
    >
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/8 px-4 py-1.5 text-xs font-medium text-accent">
            <span className="size-1.5 rounded-full bg-accent" />
            Manan Rastogi
          </div>

          <h1 className="max-w-4xl text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-text-primary md:text-6xl lg:text-7xl">
            Computer vision pipelines, full-stack academic platforms, and AI evaluation.
          </h1>

          <p className="max-w-2xl text-lg leading-relaxed text-text-secondary">
            Building deployable systems at the intersection of applied AI, software engineering, and interface design.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-orange-500 hover:shadow-[0_0_28px_rgba(249,115,22,0.25)]"
            >
              View work
              <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a
              href={portfolioData.resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-6 py-3.5 text-sm font-semibold text-text-secondary transition-all hover:border-white/25 hover:text-text-primary"
              aria-label="View resume (opens in new tab)"
            >
              <FileText size={16} aria-hidden="true" />
              Resume
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResearchHero;