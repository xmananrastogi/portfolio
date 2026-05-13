import { motion } from 'framer-motion';
import {
  ArrowRight,
  FileText,
  Mail,
  PanelsTopLeft,
  Sparkles,
  WandSparkles,
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const BASE = import.meta.env.BASE_URL;

const heroSignals = [
  'LLM evaluation',
  'Computer vision',
  'React + Flask systems',
];

const ResearchHero = () => {
  return (
    <section
      id="hero"
      className="relative overflow-hidden px-4 pb-16 pt-32 md:pb-20 md:pt-40"
      aria-label="Hero section"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="hero-glow hero-glow-left" />
        <div className="hero-glow hero-glow-right" />
      </div>

      <div className="relative z-10 mx-auto grid min-h-[70vh] max-w-7xl items-center gap-10 lg:grid-cols-[1.02fr_0.98fr]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-text-secondary">
            <Sparkles size={14} className="text-research-amber" aria-hidden="true" />
            Applied AI + Full-Stack Engineer
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl font-semibold leading-[0.95] tracking-tight text-text-primary md:text-7xl lg:text-8xl">
              Manan Rastogi
            </h1>
            <p className="max-w-3xl text-xl leading-9 text-text-secondary md:text-2xl">
              I build technical products that look polished and work under scrutiny.
            </p>
          </div>

          <div className="flex flex-wrap gap-3" role="list" aria-label="Focus areas">
            {heroSignals.map((signal) => (
              <span
                key={signal}
                role="listitem"
                className="rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-sm text-text-secondary"
              >
                {signal}
              </span>
            ))}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="#systems"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-text-primary px-5 py-3 text-sm font-semibold text-background transition hover:bg-white"
            >
              View work
              <ArrowRight size={17} aria-hidden="true" />
            </a>
            <a
              href={portfolioData.resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-text-primary transition hover:border-white/20 hover:bg-white/[0.08]"
              aria-label="View resume (opens in new tab)"
            >
              <FileText size={17} aria-hidden="true" />
              Resume
            </a>
            <a
              href={`mailto:${portfolioData.socials.email}`}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-signal-cyan/20 bg-signal-cyan/10 px-5 py-3 text-sm font-semibold text-signal-cyan transition hover:bg-signal-cyan/15"
              aria-label="Send email"
            >
              <Mail size={17} aria-hidden="true" />
              Contact
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.6, ease: 'easeOut' }}
          className="grid gap-4"
        >
          <div className="rounded-[28px] border border-white/10 bg-surface-raised/90 p-5 shadow-2xl shadow-black/25 backdrop-blur-xl">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04]">
                <img
                  src={`${BASE}assets/images/profile.jpeg`}
                  alt="Manan Rastogi — profile photo"
                  className="h-full w-full object-cover"
                  loading="eager"
                />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
                  Background
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-text-primary">
                  VIT ECE + IIT Madras Data Science
                </h2>
                <p className="mt-3 text-sm leading-6 text-text-secondary">
                  I build at the intersection of applied AI, software systems, and interface engineering.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[28px] border border-white/10 bg-surface p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-signal-cyan">
                <PanelsTopLeft size={20} aria-hidden="true" />
              </div>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.24em] text-muted">
                Web strength
              </p>
              <p className="mt-3 text-2xl font-semibold text-text-primary">
                React, TypeScript, Tailwind, Framer Motion, Three.js.
              </p>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-surface p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-research-amber">
                <WandSparkles size={20} aria-hidden="true" />
              </div>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.24em] text-muted">
                AI depth
              </p>
              <p className="mt-3 text-2xl font-semibold text-text-primary">
                LLM evaluation, computer vision, data-heavy technical systems.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResearchHero;
