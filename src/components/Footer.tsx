import React from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaHeart } from 'react-icons/fa6';
import { SiVite, SiTailwindcss, SiFramer } from 'react-icons/si';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const links = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#experience', label: 'Experience' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <footer className="relative py-16 border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center gap-12">
          {/* Brand */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gradient mb-4">Shasbin AS</h2>
            <p className="text-slate-500 max-w-md mx-auto">
              Crafting digital experiences with precision, passion, and a touch of magic.
            </p>
          </motion.div>

          {/* Navigation */}
          <nav className="flex flex-wrap gap-8 justify-center">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-slate-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Tech Stack */}
          <div className="flex items-center gap-6 text-slate-500">
            <div className="flex items-center gap-2 group cursor-help">
              <FaReact className="group-hover:text-[#61dafb] transition-colors" />
              <span className="text-[10px] uppercase font-bold tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">React</span>
            </div>
            <div className="flex items-center gap-2 group cursor-help">
              <SiVite className="group-hover:text-[#646cff] transition-colors" />
              <span className="text-[10px] uppercase font-bold tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">Vite</span>
            </div>
            <div className="flex items-center gap-2 group cursor-help">
              <SiTailwindcss className="group-hover:text-[#06b6d4] transition-colors" />
              <span className="text-[10px] uppercase font-bold tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">Tailwind</span>
            </div>
            <div className="flex items-center gap-2 group cursor-help">
              <SiFramer className="group-hover:text-white transition-colors" />
              <span className="text-[10px] uppercase font-bold tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">Motion</span>
            </div>
          </div>

          {/* Copyright */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center space-y-4"
          >
            <div className="flex items-center justify-center gap-2 text-slate-500 text-sm">
              <span>Made with</span>
              <FaHeart className="text-red-500 animate-pulse" />
              <span>by Shasbin AS</span>
            </div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-600 font-bold">
              © {currentYear} ALL RIGHTS RESERVED
            </p>
          </motion.div>
        </div>
      </div>

      {/* Decorative Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </footer>
  );
}
