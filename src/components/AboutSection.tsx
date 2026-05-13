import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Network, ShieldCheck, Workflow } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const AboutSection = () => {
  const { about } = portfolioData;

  return (
    <section id="about" className="relative overflow-hidden px-4 py-16 md:py-24" aria-label="About">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]"
        >
          <div className="space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-signal-cyan">
                About
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-text-primary md:text-5xl">
                Background and working principles.
              </h2>
            </div>

            <div className="rounded-2xl border border-white/10 bg-surface p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-semibold text-text-primary">
                    {portfolioData.name}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-text-secondary">{about.role}</p>
                </div>
                <div className="grid gap-3 text-sm text-text-secondary">
                  <div className="flex gap-3">
                    <MapPin size={17} className="mt-0.5 shrink-0 text-biomed-red" aria-hidden="true" />
                    <span>{about.location}</span>
                  </div>
                  <div className="flex gap-3">
                    <GraduationCap size={17} className="mt-0.5 shrink-0 text-research-amber" aria-hidden="true" />
                    <span>{about.education}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-surface p-6 md:col-span-2">
              <div className="flex items-center gap-3 text-text-primary">
                <Workflow size={20} className="text-cv-green" aria-hidden="true" />
                <h3 className="text-lg font-semibold">Operating principles</h3>
              </div>
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {about.operatingPrinciples.map((principle) => (
                  <div
                    key={principle}
                    className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-6 text-text-secondary"
                  >
                    {principle}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-surface p-6">
              <div className="flex items-center gap-3 text-text-primary">
                <Network size={20} className="text-signal-cyan" aria-hidden="true" />
                <h3 className="text-lg font-semibold">Focus areas</h3>
              </div>
              <div className="mt-5 flex flex-wrap gap-2" role="list" aria-label="Focus areas">
                {about.focusAreas.map((area) => (
                  <span
                    key={area}
                    role="listitem"
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-text-secondary"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-surface p-6">
              <div className="flex items-center gap-3 text-text-primary">
                <ShieldCheck size={20} className="text-research-amber" aria-hidden="true" />
                <h3 className="text-lg font-semibold">Currently extending</h3>
              </div>
              <div className="mt-5 space-y-3">
                {about.currentlyExploring.map((item) => (
                  <div
                    key={item}
                    className="border-l border-white/10 pl-4 text-sm leading-6 text-text-secondary"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
