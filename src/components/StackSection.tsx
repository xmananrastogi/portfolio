import { motion } from 'framer-motion';
import { GraduationCap, MapPin } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const StackSection = () => {
  const { about, skillsCategories } = portfolioData;

  return (
    <section id="stack" className="relative overflow-hidden px-4 py-16 md:py-24" aria-label="Stack">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-12 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-signal-cyan">
              Stack
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-text-primary md:text-5xl">
              Skills and background
            </h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="grid gap-5 md:grid-cols-2">
              {skillsCategories.map((cat, i) => (
                <div
                  key={cat.title}
                  className="rounded-2xl border border-white/10 bg-surface p-5"
                >
                  <h3 className="text-base font-semibold text-text-primary">{cat.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-text-secondary">{cat.proof}</p>
                  <div className="mt-4 flex flex-wrap gap-2" role="list" aria-label={`${cat.title} skills`}>
                    {cat.items.map((item) => (
                      <span
                        key={item}
                        role="listitem"
                        className="rounded-full bg-white/[0.04] px-3 py-1.5 text-xs text-text-secondary"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-5">
              <div className="rounded-2xl border border-white/10 bg-surface p-5">
                <div className="flex items-center gap-4">
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-text-primary">Manan Rastogi</h3>
                    <p className="mt-1 text-sm leading-6 text-text-secondary">{about.role}</p>
                  </div>
                </div>
                <div className="mt-4 space-y-2 text-sm text-text-secondary">
                  <div className="flex items-center gap-2">
                    <MapPin size={15} className="text-signal-cyan" aria-hidden="true" />
                    <span>{about.location}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <GraduationCap size={15} className="mt-0.5 shrink-0 text-signal-cyan" aria-hidden="true" />
                    <span className="leading-5">{about.education}</span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-surface p-5">
                <h3 className="text-sm font-semibold text-text-primary">Operating principles</h3>
                <ul className="mt-3 space-y-2">
                  {about.operatingPrinciples.map((p) => (
                    <li key={p} className="text-sm leading-6 text-text-secondary">
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StackSection;