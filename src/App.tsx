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
      {/* ✅ Cursor stays global */}
      <CharacterCursor
        characters={['S', 'H', 'A', 'S', 'B', 'I', 'N', 'A', 'S']}
        colors={['#8b5cf6', '#06b6d4', '#3b82f6', '#6366f1']}
        zIndex={9999}
      />

      {/* ✅ Loader */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen key="loader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* ✅ MAIN APP */}
      {!isLoading && (
        <>
          {/* 🔥 FIX: Navbar OUTSIDE motion wrapper */}
          <Navbar />

          <motion.div
            key="content"
            initial={{ opacity: 0 }}   // ✅ removed scale & blur (safe)
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative min-h-screen selection:bg-primary/30 selection:text-white transition-colors duration-500 overflow-x-hidden"
          >
            <PremiumBackground />

            <div className="relative z-10 flex flex-col gap-32 md:gap-48">
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
          </motion.div>
        </>
      )}
    </>
  );
}

export default App;