import { motion } from 'framer-motion';
import { ArrowDownRight, FileText, Github, Linkedin, Mail } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const item = {
  hidden: { opacity: 0, y: 22 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const ResearchHero = () => (
  <section
    id="hero"
    className="relative flex min-h-screen flex-col justify-center px-5 pb-16 pt-28 md:px-10"
    aria-label="Hero section"
  >
    {/* Blue radial glow behind name */}
    <div
      className="pointer-events-none absolute left-0 top-0 h-[55vh] w-full"
      style={{ background: 'radial-gradient(ellipse 70% 50% at 30% 0%, rgba(59,130,246,0.09) 0%, transparent 65%)' }}
      aria-hidden="true"
    />

    <div className="relative z-10 mx-auto w-full max-w-5xl">
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-7">

        {/* Status */}
        <motion.div variants={item}>
          <span className="status-badge">
            <span className="status-dot" aria-hidden="true" />
            Available for opportunities · 2026
          </span>
        </motion.div>

        {/* Name — very large */}
        <motion.div variants={item}>
          <h1 className="text-[clamp(3rem,10vw,7rem)] font-black leading-[0.95] tracking-tight">
            <span className="name-aurora">Manan</span>
            <br />
            <span className="text-white/10">Rastogi</span>
          </h1>
        </motion.div>

        {/* Descriptor */}
        <motion.p variants={item} className="max-w-xl text-[0.9375rem] leading-[1.7] text-white/50">
          ECE undergrad at VIT · BS Data Science at IIT Madras.
          Building computer vision pipelines, full-stack platforms,
          and automation tools that actually ship.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={item} className="flex flex-wrap items-center gap-3 pt-1">
          <a id="cta-work" href="#projects" className="btn-blue">
            See my work
            <ArrowDownRight size={15} aria-hidden="true" />
          </a>
          <a
            id="cta-resume"
            href={portfolioData.resumeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
            aria-label="View resume (opens in new tab)"
          >
            <FileText size={14} aria-hidden="true" />
            Resume
          </a>
        </motion.div>

        {/* Socials */}
        <motion.div variants={item} className="flex items-center gap-5 pt-1">
          {[
            { href: portfolioData.socials.github, icon: <Github size={17} />, label: 'GitHub' },
            { href: portfolioData.socials.linkedin, icon: <Linkedin size={17} />, label: 'LinkedIn' },
            { href: `mailto:${portfolioData.socials.email}`, icon: <Mail size={17} />, label: 'Email' },
          ].map(({ href, icon, label }) => (
            <a
              key={href}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              aria-label={label}
              className="text-white/25 transition-colors hover:text-white/70"
            >
              {icon}
            </a>
          ))}
          <span className="h-px w-8 bg-white/10" />
          <span className="font-mono text-[0.65rem] tracking-wider text-white/20">
            VIT · IIT Madras · IOCL
          </span>
        </motion.div>
      </motion.div>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        id="about"
        className="mt-20 grid grid-cols-2 gap-3 sm:grid-cols-4"
      >
        {portfolioData.metrics.map((m) => (
          <div key={m.label} className="card card-blue rounded-xl p-5">
            <div className="font-mono text-[1.5rem] font-bold text-[#3b82f6]">{m.value}</div>
            <div className="mt-1 text-[0.75rem] font-medium text-white/60">{m.label}</div>
            <div className="mt-0.5 text-[0.625rem] text-white/25 tracking-wide">{m.sub}</div>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default ResearchHero;