import { motion } from 'framer-motion';
import { ArrowDownRight, FileText, Github, Linkedin, Mail } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const item = {
  hidden: { opacity: 0, y: 15 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, type: "spring", bounce: 0.2 } },
};
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const ResearchHero = () => (
  <section
    id="hero"
    className="relative flex min-h-[90vh] flex-col justify-center px-5 pb-16 pt-28 md:px-10"
    aria-label="Hero section"
  >
    <div className="relative z-10 mx-auto w-full max-w-5xl">
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">

        {/* Status */}
        <motion.div variants={item}>
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1.5 text-xs font-medium text-zinc-300 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            Available for opportunities · 2026
          </div>
        </motion.div>

        {/* Name — Magic UI / Aceternity style */}
        <motion.div variants={item}>
          <h1 className="text-[clamp(3.5rem,10vw,7rem)] font-bold leading-[0.9] tracking-tighter">
            <span className="text-zinc-50">Manan</span>
            <br />
            <span className="text-zinc-500">Rastogi</span>
          </h1>
        </motion.div>

        {/* Descriptor */}
        <motion.p variants={item} className="max-w-xl text-[1rem] leading-[1.6] text-zinc-400">
          {portfolioData.positioning}
        </motion.p>

        {/* CTAs */}
        <motion.div variants={item} className="flex flex-wrap items-center gap-3 pt-4">
          <a id="cta-work" href="#projects" className="btn-primary">
            See my work
            <ArrowDownRight size={16} aria-hidden="true" />
          </a>
          <a
            id="cta-resume"
            href={portfolioData.resumeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            aria-label="View resume (opens in new tab)"
          >
            <FileText size={16} aria-hidden="true" />
            Resume
          </a>
        </motion.div>

        {/* Socials */}
        <motion.div variants={item} className="flex items-center gap-5 pt-8">
          {[
            { href: portfolioData.socials.github, icon: <Github size={18} />, label: 'GitHub' },
            { href: portfolioData.socials.linkedin, icon: <Linkedin size={18} />, label: 'LinkedIn' },
            { href: `mailto:${portfolioData.socials.email}`, icon: <Mail size={18} />, label: 'Email' },
          ].map(({ href, icon, label }) => (
            <a
              key={href}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              aria-label={label}
              className="text-zinc-500 transition-colors hover:text-zinc-50"
            >
              {icon}
            </a>
          ))}
        </motion.div>
      </motion.div>
    </div>
  </section>
);

export default ResearchHero;