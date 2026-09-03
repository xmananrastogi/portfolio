import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, GraduationCap, Award } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const StackSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="stack" className="px-5 py-24 md:px-8 md:py-32" aria-label="Skills and background">
      <div className="mx-auto max-w-6xl">
        <div className="section-label">Stack & Background</div>

        <div className="grid gap-5 lg:grid-cols-[1fr_0.55fr]">
          {/* Left: skills */}
          <div ref={ref} className="grid gap-4 md:grid-cols-2">
            {portfolioData.skillsCategories.map((cat, i) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="card rounded-xl p-6"
              >
                <h3 className="text-xs font-semibold uppercase tracking-widest text-muted">
                  {cat.title}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2" role="list" aria-label={`${cat.title} skills`}>
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      role="listitem"
                      className="tag"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: identity + certs */}
          <div className="space-y-4">
            {/* Identity card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="card rounded-xl p-6"
            >
              <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted">About</div>
              <h3 className="mt-3 text-lg font-bold text-text-primary">Manan Rastogi</h3>
              <p className="mt-2 text-sm leading-6 text-text-secondary">
                {portfolioData.about.role}
              </p>
              <div className="mt-5 space-y-3">
                <div className="flex items-start gap-3 text-sm text-text-secondary">
                  <MapPin size={14} className="shrink-0 mt-0.5 text-accent" />
                  <span>{portfolioData.about.location}</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-text-secondary">
                  <GraduationCap size={14} className="shrink-0 mt-0.5 text-accent" />
                  <span className="leading-5">{portfolioData.about.education}</span>
                </div>
              </div>
            </motion.div>

            {/* Operating principles */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.33, ease: [0.22, 1, 0.36, 1] }}
              className="card rounded-xl p-6"
            >
              <div className="text-xs font-semibold uppercase tracking-widest text-muted">Principles</div>
              <ul className="mt-4 space-y-3">
                {portfolioData.about.operatingPrinciples.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm leading-6 text-text-secondary">
                    <span className="mt-1.5 shrink-0 h-1.5 w-1.5 rounded-full bg-accent/60" aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Certifications */}
            {portfolioData.certifications.map((cert, i) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.41 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="card rounded-xl p-5 flex items-start gap-4"
              >
                <Award size={16} className="shrink-0 mt-0.5 text-accent" />
                <div>
                  <div className="text-sm font-semibold text-text-primary leading-snug">{cert.title}</div>
                  <div className="mt-1 text-xs text-muted">{cert.issuer} · {cert.date}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StackSection;