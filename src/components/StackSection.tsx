import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, GraduationCap, Award } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const StackSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="stack" className="px-5 py-24 md:px-10 md:py-32" aria-label="Skills and background">
      <div className="mx-auto max-w-5xl">
        <div className="section-label">Stack & Background</div>

        <div ref={ref} className="grid gap-4 lg:grid-cols-[1fr_0.5fr]">
          {/* Left: skill cards grid */}
          <div className="grid gap-4 md:grid-cols-2 content-start">
            {portfolioData.skillsCategories.map((cat, i) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="card rounded-xl p-5"
              >
                <div className="mb-3.5 text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-white/25">
                  {cat.title}
                </div>
                <div className="flex flex-wrap gap-1.5" role="list" aria-label={`${cat.title} skills`}>
                  {cat.items.map((item) => (
                    <span key={item} role="listitem" className="tag">{item}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: about + principles + certs */}
          <div className="space-y-4">
            {/* Identity */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="card rounded-xl p-5"
            >
              <div className="mb-3 text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-white/25">About</div>
              <p className="text-sm font-semibold text-white">{portfolioData.about.role}</p>
              <div className="mt-4 space-y-2.5">
                <div className="flex items-start gap-2.5 text-[0.8rem] text-white/45">
                  <MapPin size={12} className="mt-0.5 shrink-0 text-[#3b82f6]" />
                  {portfolioData.about.location}
                </div>
                <div className="flex items-start gap-2.5 text-[0.8rem] text-white/45">
                  <GraduationCap size={12} className="mt-0.5 shrink-0 text-[#3b82f6]" />
                  <span className="leading-5">{portfolioData.about.education}</span>
                </div>
              </div>
            </motion.div>

            {/* Principles */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="card rounded-xl p-5"
            >
              <div className="mb-3 text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-white/25">Principles</div>
              <ul className="space-y-2.5">
                {portfolioData.about.operatingPrinciples.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-[0.8rem] leading-[1.55] text-white/45">
                    <span className="mt-[5px] h-[5px] w-[5px] shrink-0 rounded-full bg-[#3b82f6]/50" aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Certs */}
            {portfolioData.certifications.map((cert, i) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.38 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="card rounded-xl p-5 flex items-start gap-3.5"
              >
                <Award size={14} className="shrink-0 mt-0.5 text-[#3b82f6]" />
                <div>
                  <div className="text-[0.8rem] font-semibold leading-snug text-white/80">{cert.title}</div>
                  <div className="mt-1 text-[0.68rem] text-white/30 font-mono">{cert.issuer} · {cert.date}</div>
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