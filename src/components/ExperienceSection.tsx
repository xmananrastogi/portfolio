import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase, MapPin, Calendar } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="experience" className="px-5 py-24 md:px-8 md:py-32" aria-label="Experience">
      <div className="mx-auto max-w-6xl">
        <div className="section-label">Experience</div>

        <div ref={ref} className="space-y-5">
          {portfolioData.experience.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="card rounded-xl p-6 md:p-8"
            >
              {/* Header */}
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-accent mb-2">
                    <Briefcase size={11} />
                    <span>Work Experience</span>
                  </div>
                  <h3 className="text-lg font-bold text-text-primary">{exp.role}</h3>
                  <p className="mt-1 text-sm font-medium text-text-secondary">{exp.company}</p>
                </div>

                <div className="flex flex-col items-end gap-2 text-xs text-muted">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={11} />
                    <span>{exp.period}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin size={11} />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              {/* Bullets */}
              <ul className="mt-6 space-y-3">
                {exp.bullets.map((bullet, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm leading-6 text-text-secondary">
                    <span className="mt-2 shrink-0 h-1 w-4 bg-accent/40 rounded-full" aria-hidden="true" />
                    {bullet}
                  </li>
                ))}
              </ul>

              {/* Tags */}
              <div className="mt-6 flex flex-wrap gap-2">
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
