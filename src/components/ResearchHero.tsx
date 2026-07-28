import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, FileText } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const stats = [
  { label: 'Papers indexed', value: '8,800+' },
  { label: 'Cells tracked', value: '441' },
  { label: 'Courses solved', value: '2,400+' },
  { label: 'Systems shipped', value: '3' },
];

const ResearchHero = () => {
  const [statIndex, setStatIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setStatIndex((i) => (i + 1) % stats.length);
    }, 2200);
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <section
      id="hero"
      className="relative overflow-hidden px-4 pb-24 pt-32 md:pb-32 md:pt-44"
      aria-label="Hero section"
    >
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="space-y-10"
        >
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-signal-cyan">
              Manan Rastogi
            </p>
            <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-text-primary md:text-5xl lg:text-6xl">
              Computer vision pipelines, full-stack academic platforms, and AI evaluation workflows.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-text-secondary">
              Building deployable systems at the intersection of applied AI, software engineering, and interface design.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-text-primary px-5 py-3 text-sm font-semibold text-background transition hover:bg-white"
            >
              View work
              <ArrowRight size={17} aria-hidden="true" />
            </a>
            <a
              href={portfolioData.resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-text-secondary transition hover:text-text-primary"
              aria-label="View resume (opens in new tab)"
            >
              <FileText size={17} aria-hidden="true" />
              Resume
            </a>
          </div>

          <div className="flex items-center gap-3 pt-4 text-sm text-text-secondary">
            <span className="font-mono text-xs text-signal-cyan">{stats[statIndex].value}</span>
            <span className="transition-opacity duration-500" key={statIndex}>
              {stats[statIndex].label}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResearchHero;