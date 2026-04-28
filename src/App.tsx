import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { GitHub } from './components/GitHub';
import { Leetcode } from './components/Leetcode';
import { Badges } from './components/Badges';
import { Experience } from './components/Experience';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ui/ScrollToTop';
import { Analytics } from '@vercel/analytics/react';
import { motion, AnimatePresence } from 'framer-motion';
import { LoadingScreen } from './components/loading/LoadingScreen';
import { GithubStarsButton } from './components/ui/GithubStarsButton';
import { PremiumBackground } from './components/ui/PremiumBackground';
import CharacterCursor from './components/ui/CharacterCursor';

function App() {
  const [isLoading, setIsLoading] = React.useState(true);

  return (
    <>
      {/* ✅ CharacterCursor moved here — above everything, never clipped */}
      <CharacterCursor
        characters={['S', 'H', 'A', 'S', 'B', 'I', 'N', 'A', 'S']}
        colors={['#8b5cf6', '#06b6d4', '#3b82f6', '#6366f1']}
        zIndex={9999}
      />

      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen key="loader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isLoading && (
          <motion.div
            key="content"
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative min-h-screen selection:bg-primary/30 selection:text-white transition-colors duration-500 overflow-x-hidden"
          >
            <PremiumBackground />
            <div className="relative z-10 flex flex-col gap-32 md:gap-48">
              <Navbar />
              <main>
                <Hero />
                <About />
                <Skills />
                <Projects />
                <GitHub />
                <Leetcode />
                <Badges />
                <Experience />
                <Education />
                <Contact />
              </main>
              <Footer />
            </div>
            <ScrollToTop />
            <GithubStarsButton />
            <Analytics />
            {/* ❌ Removed CharacterCursor from here */}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;