import { Suspense } from 'react';
import ResearchHero from './components/ResearchHero';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import GithubSection from './components/GithubSection';
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
          <ExperienceSection />
          <ProjectsSection />
          <GithubSection />
          <StackSection />
          <ContactSection />

          <footer className="border-t border-white/[0.05] px-6 py-10 text-center">
            <p className="text-xs text-muted">© {new Date().getFullYear()} Manan Rastogi</p>
            <a
              href="#hero"
              className="mt-3 inline-block text-xs text-muted transition hover:text-text-secondary"
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