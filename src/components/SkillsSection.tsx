import { motion } from 'framer-motion';
import { BrainCircuit, Code2, Database, Gauge } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const SkillsSection = () => {
  const icons = [BrainCircuit, Database, Code2, Gauge];

  return (
    <section id="stack" className="relative overflow-hidden px-4 py-16 md:py-24" aria-label="Skills">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mb-14 max-w-3xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-research-amber">
            Technical toolkit
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-text-primary md:text-5xl">
            Skills
          </h2>
          <p className="mt-5 text-lg leading-8 text-text-secondary">
            Software, AI, computer vision, backend, and systems tools from current work and coursework.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {portfolioData.skillsCategories.map((category, index) => {
            const Icon = icons[index % icons.length];
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: index * 0.06, duration: 0.45 }}
                className="rounded-2xl border border-white/10 bg-surface p-6"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-signal-cyan">
                  <Icon size={20} aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-text-primary">
                  {category.title}
                </h3>
                <p className="mt-3 min-h-[72px] text-sm leading-6 text-text-secondary">
                  {category.proof}
                </p>
                <div className="mt-5 flex flex-wrap gap-2" role="list" aria-label={`${category.title} skills`}>
                  {category.items.map((item) => (
                    <span
                      key={item}
                      role="listitem"
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-text-secondary"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
