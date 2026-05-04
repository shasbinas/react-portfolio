import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Navigation links
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
    window.addEventListener('scroll', handleScroll, { passive: true });
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
    return () => sections.forEach(section => observer.unobserve(section));
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isScrolled
          ? 'py-3 bg-black/60 backdrop-blur-xl border-b border-white/5 px-4 md:px-8'
          : 'py-4 bg-transparent px-4 md:px-6'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="relative flex items-center justify-between">

          {/* LEFT: Logo */}
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, '#home')}
            className="flex items-center gap-2 lg:gap-3 cursor-pointer group"
          >
            <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center p-1.5 group-hover:rotate-12 transition shadow-lg shadow-purple-500/20">
              <img
                src="/assets/favicon.png"
                alt="Logo"
                className="w-full h-full object-contain"
              />
            </div>

            <span className="font-extrabold text-base sm:text-lg lg:text-xl tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300 group-hover:from-purple-400 group-hover:to-cyan-400 transition-all duration-300">
              Shasbin
            </span>
          </a>

          {/* CENTER NAV (desktop only) */}
          <div className="absolute left-1/2 -translate-x-1/2 hidden lg:block">
            <div className="flex glass-premium rounded-full items-center px-2 py-1.5 gap-1">
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

          {/* RIGHT: Hamburger (mobile) + Button (desktop) */}
          <div className="flex items-center gap-3">

            {/* Desktop Request Button */}
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, '#contact')}
              className="hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-400 hover:to-cyan-400 text-white text-sm font-semibold transition group shadow-lg"
            >
              <span>Request</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </a>

            {/* 🔥 Hamburger RIGHT */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-slate-300 hover:text-white transition z-50"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
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
              transition={{ duration: 0.3 }}
              className="absolute inset-x-4 top-24 bottom-4 rounded-[2rem] bg-slate-900/80 border border-white/10 p-6 flex flex-col items-center justify-center"
            >
              <div className="flex flex-col items-center gap-6 w-full max-w-sm">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`text-2xl font-bold ${
                      activeSection === link.id
                        ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}