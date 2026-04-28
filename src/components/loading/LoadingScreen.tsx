import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ParticleSystem } from './ParticleSystem';

export const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'ambient' | 'assembling' | 'glitch' | 'complete'>('ambient');

  useEffect(() => {
    // Phase 1: Let ambient particles float for a bit
    const t1 = setTimeout(() => setPhase('assembling'), 1000);
    
    // Phase 2 & 3: Final stabilization and exit
    const t2 = setTimeout(() => setPhase('glitch'), 3000);
    const t3 = setTimeout(() => {
      setPhase('complete');
      setTimeout(onComplete, 800);
    }, 3800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'complete' && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 1.1,
            filter: 'blur(20px)',
            transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] } 
          }}
          className="fixed inset-0 z-[9999] bg-[#0a0a0f] flex items-center justify-center overflow-hidden"
        >
          {/* Cinematic Background Elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse [animation-delay:1s]" />
          </div>

          {/* Film Grain/Noise Overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

          {/* Particle Engine */}
          <ParticleSystem isAssembling={phase !== 'ambient'} />

          {/* Main Text Reveal */}
          <div className="relative">
            <AnimatePresence>
              {(phase === 'assembling' || phase === 'glitch') && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: 1,
                    scale: phase === 'glitch' ? [1, 1.02, 0.98, 1] : 1,
                    filter: phase === 'glitch' ? [
                      'none',
                      'hue-rotate(90deg) brightness(1.5)',
                      'hue-rotate(-90deg) brightness(1.2)',
                      'none'
                    ] : 'none'
                  }}
                  transition={{ 
                    duration: phase === 'glitch' ? 0.4 : 1,
                    times: [0, 0.2, 0.4, 1]
                  }}
                  className="relative z-10"
                >
                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-[0.2em] text-white/90 uppercase select-none">
                    <span className="relative inline-block">
                      {/* Glow Layers */}
                      <span className="absolute inset-0 blur-md bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent opacity-50">
                        SHASBIN AS
                      </span>
                      <span className="absolute inset-0 blur-2xl bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent opacity-30">
                        SHASBIN AS
                      </span>
                      
                      {/* Base Text */}
                      <span className="relative z-10">SHASBIN AS</span>

                      {/* Light Sweep Effect */}
                      <motion.div 
                        initial={{ x: '-100%' }}
                        animate={{ x: '200%' }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                        className="absolute inset-0 z-20 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
                      />
                    </span>
                  </h1>

                  {/* Wireframe/Outline Reveal (Subtle) */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: phase === 'glitch' ? 0.3 : 0.1 }}
                    className="absolute inset-0 text-5xl md:text-7xl lg:text-8xl font-black tracking-[0.2em] uppercase text-transparent border-text select-none"
                    style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}
                  >
                    SHASBIN AS
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Micro-Interaction: Bottom Progress Line */}
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 3.5, ease: "linear" }}
            className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent origin-center opacity-30"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
