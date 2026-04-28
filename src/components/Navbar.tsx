import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Link } from './Link';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver(
      entries => {
        const visibleSection = entries.find(entry => entry.isIntersecting);
        if (visibleSection) {
          setActiveSection(visibleSection.target.id);
        }
      },
      { threshold: 0.5 }
    );

    sections.forEach(section => observer.observe(section));
    return () => sections.forEach(section => observer.unobserve(section));
  }, []);

  const navLinks = [
    { href: '#home', id: 'home', label: 'Home' },
    { href: '#about', id: 'about', label: 'About' },
    { href: '#skills', id: 'skills', label: 'Skills' },
    { href: '#projects', id: 'projects', label: 'Projects' },
    { href: '#experience', id: 'experience', label: 'Experience' },
    { href: '#contact', id: 'contact', label: 'Contact' },
  ];

  return (
    <nav className="fixed top-6 left-0 right-0 z-[100] px-4 md:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Mobile Hamburger (Left) / Desktop Logo (Left) */}
        <div className="flex items-center gap-4 flex-1">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="hidden md:flex items-center gap-2 group cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center p-1.5 transition-transform group-hover:rotate-12">
              <img src="/assets/favicon.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
          </div>
        </div>

        {/* Desktop Nav (Center Pill) */}
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`hidden lg:flex glass-premium rounded-full items-center px-2 py-1.5 gap-1 transition-all duration-500
                      ${isScrolled ? 'shadow-2xl border-white/20' : 'border-white/5'}`}
        >
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="relative px-4 py-2 text-sm font-medium transition-colors hover:text-white text-slate-400"
            >
              <span className="relative z-10">{link.label}</span>
              {activeSection === link.id && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-white/10 rounded-full shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.1)]"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Link>
          ))}
        </motion.div>

        {/* Right Group: Request Button & Desktop Hamburger */}
        <div className="flex items-center justify-end gap-3 flex-1">
          <Link
            href="#contact"
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-primary hover:bg-primary/80 text-white text-sm font-semibold transition-all relative overflow-hidden group shadow-lg shadow-primary/20"
          >
            <span className="relative z-10">Request</span>
            <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>

          {/* Mobile Logo (Right) / Desktop Hamburger (Right) */}
          <div className="flex items-center gap-3">
            <div className="md:hidden w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center p-1.5 transition-transform">
              <img src="/assets/favicon.png" alt="Logo" className="w-full h-full object-contain" />
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="hidden md:block p-2 text-slate-300 hover:text-white transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 top-24 left-6 right-6 lg:hidden z-[99]" // ✅ Fixed: z-[99] instead of z-[-1]
          >
            <div className="bg-black rounded-[2rem] p-8 flex flex-col items-center gap-6 shadow-2xl"> {/* ✅ Fixed: bg-black instead of glass-premium */}
              {navLinks.map((link, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={link.href}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-2xl font-bold ${activeSection === link.id ? 'text-gradient' : 'text-white'}`} // ✅ Fixed: text-white instead of text-slate-400
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}