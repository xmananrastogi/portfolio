import { motion } from 'framer-motion';
import { ArrowRight, FileText, PanelsTopLeft, WandSparkles } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const BASE = import.meta.env.BASE_URL;

const heroSignals = [
  'Computer vision',
  'LLM evaluation',
  'Full-stack systems',
];

const ResearchHero = () => {
  return (
    <section
      id="hero"
      className="relative overflow-hidden px-4 pb-16 pt-32 md:pb-24 md:pt-40"
      aria-label="Hero section"
    >
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="space-y-8"
        >
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-widest text-signal-cyan">
              Manan Rastogi
            </p>
            <h1 className="max-w-[900px] text-4xl font-semibold leading-[1.05] tracking-tight text-text-primary md:text-[3.5rem] lg:text-[4.5rem]">
              Computer vision pipelines, full-stack academic platforms, and AI evaluation workflows.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-text-secondary">
              Building deployable systems at the intersection of applied AI, software engineering, and interface design.
            </p>
          </div>

          <div className="flex flex-wrap gap-2" role="list" aria-label="Focus areas">
            {heroSignals.map((signal) => (
              <span
                key={signal}
                role="listitem"
                className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-sm text-text-secondary"
              >
                {signal}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#systems"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-text-primary px-5 py-3 text-sm font-semibold text-background transition hover:bg-white"
            >
              View work
              <ArrowRight size={17} aria-hidden="true" />
            </a>
            <a
              href={portfolioData.resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-text-primary transition hover:border-white/20 hover:bg-white/[0.08]"
              aria-label="View resume (opens in new tab)"
            >
              <FileText size={17} aria-hidden="true" />
              Resume
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06, duration: 0.5, ease: 'easeOut' }}
          className="grid gap-4"
        >
          <div className="rounded-2xl border border-white/10 bg-surface-raised/80 p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
                <img
                  src={`${BASE}assets/images/profile.jpeg`}
                  alt="Manan Rastogi"
                  className="h-full w-full object-cover"
                  loading="eager"
                />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Background
                </p>
                <h2 className="mt-1 text-xl font-semibold text-text-primary">
                  VIT ECE + IIT Madras Data Science
                </h2>
                <p className="mt-2 text-sm leading-6 text-text-secondary">
                  B.Tech in ECE (Biomedical) at VIT, BS in Data Science at IIT Madras. Building across AI, software, and systems.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-surface p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-signal-cyan">
                <PanelsTopLeft size={18} aria-hidden="true" />
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted">
                Frontend
              </p>
              <p className="mt-2 text-xl font-semibold text-text-primary">
                React, TypeScript, Three.js, Tailwind.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-surface p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-signal-cyan">
                <WandSparkles size={18} aria-hidden="true" />
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted">
                AI / CV
              </p>
              <p className="mt-2 text-xl font-semibold text-text-primary">
                OpenCV, LLM APIs, SciPy, evaluation pipelines.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResearchHero;
