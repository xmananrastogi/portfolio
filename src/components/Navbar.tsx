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
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[100]"
      role="navigation"
      aria-label="Main navigation"
    >
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? 'bg-black/85 backdrop-blur-xl border-b border-white/[0.06]'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
          {/* Logo */}
          <a
            href="#hero"
            className="text-sm font-semibold tracking-widest text-text-primary uppercase hover:text-accent transition-colors duration-300"
            aria-label="Back to top"
          >
            MR
          </a>

          {/* Desktop nav */}
          <div className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="nav-link text-sm font-medium">
                {link.label}
              </a>
            ))}
            <a
              href={portfolioData.resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 inline-flex items-center gap-2 rounded-md border border-white/[0.1] bg-white/[0.03] px-4 py-2 text-xs font-semibold tracking-wide text-text-primary transition hover:border-accent/40 hover:bg-accent/5 hover:text-accent"
              aria-label="View resume (opens in new tab)"
            >
              <FileText size={13} />
              Resume
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="rounded p-2 text-text-secondary transition hover:text-text-primary md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/98 md:hidden"
          >
            {/* Close button */}
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-5 right-5 p-2 text-text-secondary hover:text-text-primary"
              aria-label="Close menu"
            >
              <X size={22} />
            </button>

            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="text-2xl font-semibold text-text-secondary hover:text-text-primary transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href={portfolioData.resumeLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.07 }}
                className="mt-4 inline-flex items-center gap-2 rounded-md border border-white/10 px-6 py-3 text-sm font-semibold text-text-primary"
              >
                <FileText size={15} />
                Resume
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}