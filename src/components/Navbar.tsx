import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, FileText } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const navLinks = [
  { href: '#about',      label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects',   label: 'Projects' },
  { href: '#contact',    label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    const fn = () => { if (window.innerWidth >= 768) setOpen(false); };
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <nav className="fixed left-0 right-0 top-0 z-[100]" role="navigation" aria-label="Main navigation">
      <div className={`transition-all duration-300 ${scrolled ? 'border-b border-white/[0.05] bg-black/80 backdrop-blur-2xl' : 'bg-transparent'}`}>
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 md:px-10">

          {/* Logo */}
          <a href="#hero" className="text-xs font-bold tracking-[0.2em] text-white uppercase hover:text-white/60 transition-colors" aria-label="Back to top">
            MR
          </a>

          {/* Desktop links */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="nav-link">{l.label}</a>
            ))}
            <a
              href={portfolioData.resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.1] bg-white/[0.03] px-4 py-2 text-[0.75rem] font-semibold text-white/60 transition hover:border-white/20 hover:text-white"
              aria-label="View resume (opens in new tab)"
            >
              <FileText size={12} />
              Resume
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="p-2 text-white/40 transition hover:text-white md:hidden"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/97 backdrop-blur-xl md:hidden"
          >
            <button onClick={() => setOpen(false)} className="absolute right-5 top-5 p-2 text-white/30 hover:text-white" aria-label="Close menu">
              <X size={20} />
            </button>
            <nav className="flex flex-col items-center gap-9">
              {navLinks.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="text-2xl font-bold text-white/70 hover:text-white transition-colors"
                >
                  {l.label}
                </motion.a>
              ))}
              <motion.a
                href={portfolioData.resumeLink}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.07 }}
                className="btn-ghost mt-4"
              >
                <FileText size={14} />
                Resume
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}