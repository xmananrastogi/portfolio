import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight, ExternalLink, Github, GitFork, Sparkles, Award, ExternalLink as LinkIcon } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const SystemsSection = () => {
  const woundTrack = portfolioData.systems.find((s) => s.id === 'woundtrack-ai')!;
  const portfolio = portfolioData.systems.find((s) => s.id === 'portfolio-research-os')!;
  const gssoc = portfolioData.systems.find((s) => s.id === 'gssoc-editron')!;

  return (
    <section id="systems" className="relative overflow-hidden px-4 py-16 md:py-24" aria-label="Projects">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 max-w-4xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-cv-green">
            Projects
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-text-primary md:text-5xl">
            What I've built
          </h2>
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          {/* WoundTrack AI — Flagship */}
          <WoundTrackCard data={woundTrack} />

          <div className="grid gap-5">
            {/* Portfolio card */}
            <PortfolioCard data={portfolio} />

            {/* GSSoC card */}
            <GSSoCCard data={gssoc} />
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================
// WoundTrack Card with image gallery
// ============================

function WoundTrackCard({ data }: { data: typeof portfolioData.systems[0] }) {
  const [currentImage, setCurrentImage] = useState(0);
  const images = data.images;

  const nextImage = () => setCurrentImage((i) => (i + 1) % images.length);
  const prevImage = () => setCurrentImage((i) => (i - 1 + images.length) % images.length);

  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.97, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden rounded-[30px] border border-white/10 bg-surface"
      aria-label={`Project: ${data.title}`}
    >
      {/* Image gallery */}
      <div className="relative min-h-[320px] overflow-hidden bg-black">
        {images.length > 0 && (
          <>
            <motion.img
              key={currentImage}
              src={images[currentImage]}
              alt={`${data.title} — screenshot ${currentImage + 1} of ${images.length}`}
              className="h-full w-full object-cover opacity-75"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 0.75, scale: 1 }}
              transition={{ duration: 0.5 }}
              loading="lazy"
            />
            {images.length > 1 && (
              <div className="absolute bottom-16 right-6 flex items-center gap-2">
                <button
                  onClick={prevImage}
                  className="rounded-full bg-black/50 p-2 text-white/80 backdrop-blur transition hover:bg-black/70"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={18} />
                </button>
                <span className="font-mono text-xs text-white/60" aria-live="polite">
                  {currentImage + 1}/{images.length}
                </span>
                <button
                  onClick={nextImage}
                  className="rounded-full bg-black/50 p-2 text-white/80 backdrop-blur transition hover:bg-black/70"
                  aria-label="Next image"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-research-amber">
            {data.eyebrow}
          </p>
          <h3 className="mt-3 text-3xl font-semibold text-text-primary md:text-5xl">
            {data.title}
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-text-secondary">
            {data.oneLine}
          </p>
        </div>
      </div>

      <div className="space-y-6 p-6">
        <p className="text-sm leading-7 text-text-secondary">{data.problem}</p>

        {/* Metrics from data — staggered entrance */}
        <div className="grid gap-3 sm:grid-cols-4">
          {data.metrics.slice(0, 4).map(({ value, label }, index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
            >
              <div className="font-mono text-2xl font-semibold text-text-primary">{value}</div>
              <div className="mt-2 text-xs uppercase tracking-[0.18em] text-muted">{label}</div>
            </motion.div>
          ))}
        </div>

        {/* Architecture tags */}
        <div className="grid gap-3 md:grid-cols-2">
          {data.architecture.slice(0, 4).map((item) => (
            <div key={item} className="rounded-2xl border border-white/10 bg-background/70 px-4 py-3 text-sm text-text-secondary">
              {item}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={data.links.live}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-text-primary px-4 py-3 text-sm font-semibold text-background transition hover:bg-white"
            aria-label={`Live demo of ${data.title} (opens in new tab)`}
          >
            Live demo
            <ExternalLink size={16} aria-hidden="true" />
          </a>
          <a
            href={data.links.code}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-text-primary transition hover:bg-white/[0.07]"
            aria-label={`Source code for ${data.title} (opens in new tab)`}
          >
            Source
            <Github size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

// ============================
// Portfolio Card
// ============================

function PortfolioCard({ data }: { data: typeof portfolioData.systems[0] }) {
  return (
    <motion.article
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-[30px] border border-white/10 bg-surface p-6"
      aria-label={`Project: ${data.title}`}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-signal-cyan">
        {data.eyebrow}
      </p>
      <h3 className="mt-3 text-3xl font-semibold text-text-primary">{data.title}</h3>
      <p className="mt-4 text-sm leading-7 text-text-secondary">{data.oneLine}</p>
      <div className="mt-6 space-y-3">
        {data.architecture.map((item, index) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-text-secondary"
          >
            {item}
          </motion.div>
        ))}
      </div>
      <div className="mt-6 flex gap-3">
        <a
          href={data.links.live}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-text-primary px-4 py-3 text-sm font-semibold text-background transition hover:bg-white"
          aria-label={`Live site of ${data.title} (opens in new tab)`}
        >
          Live
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
        <a
          href={data.links.code}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-2xl border border-white/10 px-4 py-3 text-text-primary transition hover:bg-white/[0.06]"
          aria-label={`Source code for ${data.title} (opens in new tab)`}
        >
          <Github size={17} aria-hidden="true" />
        </a>
      </div>
    </motion.article>
  );
}

// ============================
// GSSoC Contributor Card
// ============================

function GSSoCCard({ data }: { data: typeof portfolioData.systems[0] }) {
  return (
    <motion.article
      initial={{ opacity: 0, x: 20, rotate: 0.5 }}
      whileInView={{ opacity: 1, x: 0, rotate: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className="relative overflow-hidden rounded-[30px] border border-white/10 bg-surface p-6"
      aria-label={`Project: ${data.title}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-cv-green/[0.06]" aria-hidden="true" />

      <div className="relative space-y-4">
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-cv-green/20 bg-cv-green/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-cv-green">
            <Award size={13} aria-hidden="true" />
            GSSoC '26 Contributor
          </div>
        </div>
        <h3 className="text-2xl font-semibold text-text-primary">
          GirlScript Summer of Code 2026
        </h3>
        <p className="text-sm leading-7 text-text-secondary">
          Active contributor in GSSoC '26, one of India's largest open-source programs. 
          Contributing to projects focusing on code quality, developer tooling, and collaborative engineering workflows.
        </p>

        <div className="flex flex-wrap gap-2">
          {['Open Source', 'GSSoC \'26', 'Contributor', 'Code Quality'].map((tag) => (
            <span key={tag} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-text-secondary">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-3 pt-2">
          <a
            href="https://github.com/xmananrastogi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-text-primary transition hover:bg-white/[0.08]"
            aria-label="View my GitHub contributions (opens in new tab)"
          >
            <Github size={16} aria-hidden="true" />
            Verify on GitHub
          </a>
          <a
            href="https://gssoc.girlscript.tech/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-cv-green/20 bg-cv-green/10 px-4 py-3 text-sm font-semibold text-cv-green transition hover:bg-cv-green/15"
            aria-label="GSSoC official website (opens in new tab)"
          >
            <ExternalLink size={16} aria-hidden="true" />
            GSSoC
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export default SystemsSection;
