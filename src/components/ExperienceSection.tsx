import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase, MapPin, CalendarDays } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { SpotlightCard } from './ui/SpotlightCard';
import { Timeline } from './ui/Timeline';

const ExperienceSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="experience" className="px-5 py-24 md:px-10" aria-label="Experience">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-8 text-2xl font-bold tracking-tight text-zinc-50">Experience</h2>

        <Timeline 
          data={portfolioData.experience.map((exp, i) => ({
            title: exp.period,
            content: (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1, type: "spring", bounce: 0 }}
              >
                <SpotlightCard className="p-6 md:p-8">
                  {/* Header row */}
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                        <Briefcase size={12} />
                        Work Experience
                      </div>
                      <h3 className="text-xl font-semibold text-zinc-50">{exp.role}</h3>
                      <p className="mt-1 text-sm font-medium text-zinc-400">{exp.company}</p>
                    </div>

                    <div className="flex flex-col items-end gap-2 text-xs text-zinc-500">
                      <span className="flex items-center gap-1.5">
                        <MapPin size={12} />{exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Bullets */}
                  <ul className="mt-6 space-y-3">
                    {exp.bullets.map((b, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm leading-[1.65] text-zinc-300">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-zinc-600" aria-hidden="true" />
                        {b}
                      </li>
                    ))}
                  </ul>

                  {/* Tags */}
                  <div className="mt-8 flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span key={tag} className="badge">{tag}</span>
                    ))}
                  </div>
                </SpotlightCard>
              </motion.div>
            )
          }))}
        />
      </div>
    </section>
  );
};

export default ExperienceSection;
