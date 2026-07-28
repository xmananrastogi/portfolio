import { Suspense } from 'react';
import ResearchHero from './components/ResearchHero';
import ProjectsSection from './components/ProjectsSection';
import StackSection from './components/StackSection';
import ContactSection from './components/ContactSection';
import SmoothScroll from './components/SmoothScroll';
import Navbar from './components/Navbar';
import ErrorBoundary from './components/ErrorBoundary';
import { motion } from 'framer-motion';

function App() {
  return (
    <ErrorBoundary>
      <SmoothScroll>
        <Navbar />

        <motion.main
          id="main-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="relative z-10 min-h-screen bg-transparent text-text-primary"
          role="main"
        >
          <ResearchHero />
          <ProjectsSection />
          <StackSection />
          <ContactSection />

          <footer className="border-t border-white/10 px-6 py-10 text-center text-xs text-muted">
            <p>© {new Date().getFullYear()} Manan Rastogi</p>
            <a
              href="#hero"
              className="mt-3 inline-block text-text-secondary transition hover:text-signal-cyan"
              aria-label="Back to top"
            >
              ↑ Back to top
            </a>
          </footer>
        </motion.main>
      </SmoothScroll>
    </ErrorBoundary>
  );
}

export default App;