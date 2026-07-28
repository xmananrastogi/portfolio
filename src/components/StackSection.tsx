import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

const metrics = [
  { value: '8,800+', label: 'Papers indexed' },
  { value: '441', label: 'Cells tracked' },
  { value: '2,400+', label: 'Courses solved' },
  { value: '3', label: 'Systems shipped' },
];

const StackSection = () => {
  const { about, skillsCategories } = portfolioData;

  return (
    <section id="stack" className="px-6 py-24 md:py-32" aria-label="Skills and background">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-14 text-4xl font-semibold tracking-tight text-text-primary md:text-5xl">
          Skills and background
        </h2>

        <div className="grid gap-4 md:grid-cols-4 mb-12">
          {metrics.map((m) => (
            <div key={m.label} className="rounded-2xl border border-white/[0.07] bg-surface p-5">
              <div className="font-mono text-2xl font-semibold text-accent">{m.value}</div>
              <div className="mt-1.5 text-xs uppercase tracking-wider text-muted">{m.label}</div>
            </div>
          ))}
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="grid gap-4 md:grid-cols-2">
            {skillsCategories.map((cat, i) => (
              <div
                key={cat.title}
                className="rounded-2xl border border-white/[0.07] bg-surface p-6"
              >
                <h3 className="text-base font-semibold text-text-primary">{cat.title}</h3>
                <p className="mt-3 text-sm leading-6 text-text-secondary">{cat.proof}</p>
                <div className="mt-5 flex flex-wrap gap-2" role="list" aria-label={`${cat.title} skills`}>
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      role="listitem"
                      className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1.5 text-xs text-text-secondary"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-white/[0.07] bg-surface p-6">
              <h3 className="text-xl font-semibold text-text-primary">Manan Rastogi</h3>
              <p className="mt-3 text-sm leading-6 text-text-secondary">{about.role}</p>
              <div className="mt-5 space-y-3 text-sm text-text-secondary">
                <div className="flex items-center gap-2">
                  <span className="text-accent">→</span>
                  <span>{about.location}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-accent shrink-0 mt-0.5">→</span>
                  <span className="leading-5">{about.education}</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/[0.07] bg-surface p-6">
              <h3 className="text-sm font-semibold text-text-primary">Operating principles</h3>
              <ul className="mt-4 space-y-3">
                {about.operatingPrinciples.map((p) => (
                  <li key={p} className="pl-4 border-l border-white/[0.07] text-sm leading-6 text-text-secondary">
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StackSection;