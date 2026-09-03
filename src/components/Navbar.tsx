import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, FileText } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const navLinks = [
  { href: '#about',      label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects',   label: 'Projects' },
  { href: '#contact',    label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > 150 && latest > previous!) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

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
    <>
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: "-150%" },
        }}
        initial="visible"
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed left-1/2 top-6 z-[100] flex w-11/12 max-w-fit -translate-x-1/2 items-center justify-between gap-6 rounded-full border border-white/10 bg-black/60 px-6 py-3 shadow-2xl backdrop-blur-xl md:w-auto"
        role="navigation" 
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a href="#hero" className="text-xs font-bold tracking-[0.2em] text-white uppercase hover:text-white/60 transition-colors" aria-label="Back to top">
          MR
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-white/60 transition-colors hover:text-white">
              {l.label}
            </a>
          ))}
          <a
            href={portfolioData.resumeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-white/20"
            aria-label="View resume (opens in new tab)"
          >
            <FileText size={14} />
            Resume
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="p-1 text-white/60 transition hover:text-white md:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </motion.nav>

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
                className="btn-secondary mt-4"
              >
                <FileText size={16} />
                Resume
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}