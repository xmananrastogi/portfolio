import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase, MapPin, CalendarDays } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const ExperienceSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="experience" className="px-5 py-24 md:px-10 md:py-32" aria-label="Experience">
      <div className="mx-auto max-w-5xl">
        <div className="section-label">Experience</div>

        <div ref={ref} className="space-y-4">
          {portfolioData.experience.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="card card-blue rounded-xl p-6 md:p-8"
            >
              {/* Header row */}
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="mb-2 flex items-center gap-2 text-[0.625rem] font-semibold uppercase tracking-[0.15em] text-[#3b82f6]">
                    <Briefcase size={10} />
                    Work Experience
                  </div>
                  <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                  <p className="mt-1 text-sm font-medium text-white/50">{exp.company}</p>
                </div>

                <div className="flex flex-col items-end gap-1.5 text-[0.7rem] text-white/30 font-mono">
                  <span className="flex items-center gap-1.5">
                    <CalendarDays size={10} />{exp.period}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={10} />{exp.location}
                  </span>
                </div>
              </div>

              {/* Bullets */}
              <ul className="mt-6 space-y-3">
                {exp.bullets.map((b, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm leading-[1.65] text-white/50">
                    <span className="mt-[0.45rem] h-px w-3 shrink-0 bg-[#3b82f6]/40" aria-hidden="true" />
                    {b}
                  </li>
                ))}
              </ul>

              {/* Tags */}
              <div className="mt-6 flex flex-wrap gap-1.5">
                {exp.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
