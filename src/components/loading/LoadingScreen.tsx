import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Custom easing function for progress to make it feel organic
    let currentProgress = 0;
    let animationFrameId: number;
    const duration = 2200; // 2.2 seconds total
    const startTime = performance.now();

    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const t = Math.min(elapsed / duration, 1);
      
      // easeOutExpo for that fast-then-slow premium feel
      const ease = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      currentProgress = Math.floor(ease * 100);
      
      setProgress(currentProgress);

      if (t < 1) {
        animationFrameId = requestAnimationFrame(updateProgress);
      } else {
        setTimeout(() => setIsReady(true), 400); // Brief pause at 100%
        setTimeout(onComplete, 1600); // Give time for exit animations
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(animationFrameId);
  }, [onComplete]);

  // Framer motion variants for staggered text
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const letterAnim = {
    hidden: { y: 100, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  const nameLetters = "SHASBIN".split("");
  const surnameLetters = "AS".split("");

  return (
    <AnimatePresence>
      {!isReady && (
        <motion.div
          key="loader-container"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            y: "-100%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Subtle noise overlay for texture */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-screen bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          
          <div className="relative z-10 w-full max-w-sm px-8 md:max-w-xl flex flex-col items-center">
            
            {/* The Main Name Reveal */}
            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="flex gap-4 overflow-hidden mb-12"
            >
              <div className="flex">
                {nameLetters.map((letter, index) => (
                  <motion.span 
                    key={index} 
                    variants={letterAnim}
                    className="text-4xl md:text-6xl font-black text-white tracking-widest uppercase"
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>
              <div className="flex">
                {surnameLetters.map((letter, index) => (
                  <motion.span 
                    key={`surname-${index}`} 
                    variants={letterAnim}
                    className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 tracking-widest uppercase"
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* The Progress Counter */}
            <div className="w-full flex justify-between items-end mb-4 font-mono text-sm tracking-widest text-slate-400">
              <motion.span 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 1 }}
                className="uppercase text-[10px]"
              >
                System Initialization
              </motion.span>
              <span className="text-xl text-white font-medium">
                {progress.toString().padStart(3, '0')}%
              </span>
            </div>

            {/* The Minimalist Progress Line */}
            <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden relative">
              <motion.div 
                className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-purple-500 to-cyan-400"
                style={{ width: `${progress}%` }}
                layout
              />
              {/* Flare effect on the leading edge */}
              <motion.div
                className="absolute top-0 bottom-0 w-20 bg-gradient-to-r from-transparent to-white/50 blur-[2px]"
                style={{ left: `calc(${progress}% - 20px)` }}
                layout
              />
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Optional: Second sweep overlay for an ultra-premium exit feel */}
      {!isReady && (
        <motion.div
          key="loader-sweep"
          initial={{ top: "100%" }}
          exit={{ 
            top: "-100%", 
            transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.1 } 
          }}
          className="fixed inset-0 z-[9998] bg-gradient-to-t from-purple-900/20 to-cyan-900/20 backdrop-blur-md"
        />
      )}
    </AnimatePresence>
  );
};
