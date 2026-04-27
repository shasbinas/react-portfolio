import React, { useState, useEffect } from 'react';
import { SiGithub } from 'react-icons/si';
import { FaStar } from 'react-icons/fa6';
import { motion, AnimatePresence } from 'framer-motion';

export function GithubStarsButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -20, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -20, scale: 0.8 }}
          className="fixed bottom-10 left-10 z-[100] group"
        >
          <a
            href="https://github.com/shasbinas/react-ts-personal-portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 glass px-6 py-4 rounded-full text-white font-bold hover:bg-white/10 transition-all border-white/10 relative overflow-hidden"
            aria-label="Star on GitHub"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <SiGithub className="w-5 h-5 relative z-10" />
            <span className="text-xs uppercase tracking-widest relative z-10">Star on GitHub</span>
            <FaStar className="w-4 h-4 text-yellow-500 group-hover:rotate-[72deg] transition-transform duration-500 relative z-10" />

            {/* Glowing Aura */}
            <div className="absolute inset-0 bg-secondary/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full -z-10" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
