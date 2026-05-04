import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Navigation links configuration
const navLinks = [
  { href: '#home', id: 'home', label: 'Home' },
  { href: '#about', id: 'about', label: 'About' },
  { href: '#skills', id: 'skills', label: 'Skills' },
  { href: '#projects', id: 'projects', label: 'Projects' },
  { href: '#github', id: 'github', label: 'GitHub' },
  { href: '#leetcode', id: 'leetcode', label: 'LeetCode' },
  { href: '#badges', id: 'badges', label: 'Badges' },
  { href: '#experience', id: 'experience', label: 'Experience' },
  { href: '#education', id: 'education', label: 'Education' },
  { href: '#contact', id: 'contact', label: 'Contact' },
];

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
        const visible = entries.find(entry => entry.isIntersecting);
        if (visible) setActiveSection(visible.target.id);
      },
      { threshold: 0.3, rootMargin: '-20% 0px -20% 0px' }
    );

    sections.forEach(section => observer.observe(section));
    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-6 left-0 right-0 z-[100] px-4 md:px-6"
    >
      <div className="max-w-7xl mx-auto">

        {/* ✅ Proper Layout Wrapper: relative parent container */}
        <div className="relative flex items-center justify-between">

          {/* LEFT: Mobile Hamburger OR Desktop Logo */}
          <div className="flex items-center gap-4">

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-slate-300 hover:text-white transition z-50 relative"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Desktop Logo */}
            <a 
              href="#home" 
              onClick={(e) => scrollToSection(e, '#home')}
              className="hidden lg:flex items-center gap-2 cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center p-1.5 group-hover:rotate-12 transition">
                <img
                  src="/assets/favicon.png"
                  alt="Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </a>
          </div>

          {/* ✅ CENTER NAV (Perfect Center, No Gap Issue) */}
          {/* absolute left-1/2 -translate-x-1/2 to perfectly center without flex-1 */}
          <div className="absolute left-1/2 -translate-x-1/2 hidden lg:block">
            <div
              className={`flex glass-premium rounded-full items-center px-2 py-1.5 gap-1 transition-all duration-500
                ${isScrolled ? 'shadow-2xl border-white/20 bg-black/40 backdrop-blur-md' : 'border-white/5 bg-transparent backdrop-blur-sm'}`}
            >
              {navLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="relative px-3 xl:px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition rounded-full"
                >
                  <span className="relative z-10">{link.label}</span>

                  {activeSection === link.id && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 bg-white/10 rounded-full"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT: Desktop Request Button OR Mobile Logo */}
          <div className="flex items-center gap-3">

            {/* Request Button */}
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, '#contact')}
              className="hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-400 hover:to-cyan-400 text-white text-sm font-semibold transition relative overflow-hidden group shadow-lg shadow-primary/20"
            >
              <span className="relative z-10">Request</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition" />
              <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition" />
            </a>

            {/* Mobile Logo */}
            <a 
              href="#home" 
              onClick={(e) => scrollToSection(e, '#home')}
              className="lg:hidden w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center p-1.5 relative z-50"
            >
              <img
                src="/assets/favicon.png"
                alt="Logo"
                className="w-full h-full object-contain"
              />
            </a>
          </div>

        </div>
      </div>

      {/* ✅ Mobile Menu Full Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 lg:hidden z-40 bg-black/60 backdrop-blur-lg"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="absolute inset-x-4 top-24 bottom-4 rounded-[2rem] bg-slate-900/80 border border-white/10 shadow-2xl p-6 flex flex-col items-center justify-center overflow-y-auto"
            >
              <div className="flex flex-col items-center gap-6 w-full max-w-sm my-auto">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ delay: i * 0.05 }}
                    className="w-full text-center"
                  >
                    <a
                      href={link.href}
                      onClick={(e) => scrollToSection(e, link.href)}
                      className={`block w-full py-2 text-2xl font-bold transition-colors ${
                        activeSection === link.id
                          ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      {link.label}
                    </a>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}