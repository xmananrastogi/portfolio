import React, { Suspense, lazy } from 'react';
import './App.css';
import { LoadingProvider, useLoading } from './context/LoadingProvider';
import InitializationLoader from './components/InitializationLoader';
import MagneticCursor from './components/MagneticCursor';
import Navbar from './components/Navbar';
import TerminalHero from './components/TerminalHero';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import ContactSection from './components/ContactSection';
import StatusTicker from './components/StatusTicker';
import { AnimatePresence, motion } from 'framer-motion';

const PortfolioContent = () => {
  const { isLoading } = useLoading();

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <InitializationLoader key="loader" />
      ) : (
        <motion.main
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="min-h-screen bg-background relative"
        >
          <MagneticCursor />
          <Navbar />
          
          <div className="relative z-10 pb-32">
            <TerminalHero />
            <AboutSection />
            <ProjectsSection />
            <SkillsSection />
            <ContactSection />
          </div>

          <StatusTicker />
          
          <footer className="py-12 px-6 flex justify-center text-[10px] font-mono tracking-[0.3em] uppercase text-white/10 select-none">
            Built with precision by Manan Rastogi · /bin/portfolio
          </footer>
        </motion.main>
      )}
    </AnimatePresence>
  );
};

function App() {
  return (
    <LoadingProvider>
      <PortfolioContent />
    </LoadingProvider>
  );
}

export default App;
