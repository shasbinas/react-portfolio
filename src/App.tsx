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
import FlowingDots from './components/ui/FlowingDots';
import { ScrollToTop } from './components/ui/ScrollToTop';
import { Analytics } from '@vercel/analytics/react';
import { LoadingScreen } from './components/loading/LoadingScreen';
import { useLoading } from './hooks/useLoading';
import { GithubStarsButton } from './components/ui/GithubStarsButton';

import { PremiumBackground } from './components/ui/PremiumBackground';

function App() {
  const isLoading = useLoading();

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      <div className="relative min-h-screen selection:bg-primary/30 selection:text-white transition-colors duration-500 overflow-x-hidden">
        <PremiumBackground />
        <FlowingDots particleColor="45, 212, 191" animationSpeed={0.002} />
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
      </div>
    </>
  );
}

export default App;
