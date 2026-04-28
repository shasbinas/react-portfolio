import { ArrowDown } from 'lucide-react';
import { Link } from './Link';
import { TypeWriter } from './ui/TypeWriter';
import { SocialLinks } from './hero/SocialLinks';
import { ContactInfo } from './hero/ContactInfo';
import { ActionButtons } from './hero/ActionButtons';
import { motion } from 'framer-motion';

export function Hero() {
  const roles = [
    'Full Stack Developer',
    'Node.js Backend Engineer',
    'Next.js & React.js Developer',
  ];

  return (
    <section
      id="home"
      className="min-h-screen flex items-center relative overflow-hidden pb-24"
    >
      {/* ✅ FIXED: Removed diagonal div — replaced with unified subtle glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(139,92,246,0.08),transparent_60%)] pointer-events-none" />

      {/* Radial Glow behind name */}
      <div className="absolute top-1/2 left-3/4 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.2),transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-20 relative z-10 pt-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left Column - Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="relative flex justify-center lg:justify-start"
          >
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-br from-purple-500 via-cyan-500 to-purple-500 rounded-2xl blur-xl opacity-40 group-hover:opacity-70 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-purple-500/20 rounded-2xl blur-[30px]" />
              <img
                src="/assets/profile.jpeg"
                alt="Shasbin AS"
                className="relative w-[280px] md:w-[380px] lg:w-[420px] rounded-2xl border border-purple-500/30 object-cover shadow-[0_0_60px_rgba(139,92,246,0.6)] transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex px-4 py-1.5 rounded-lg border border-purple-500 bg-purple-500/10 text-purple-400 text-sm font-bold tracking-widest uppercase animate-pulse"
            >
              Hey! 👋 I'm
            </motion.div>

            {/* Name */}
            <h1 className="text-6xl lg:text-8xl font-black tracking-tight text-gradient leading-none pb-1">
              Shasbin AS
            </h1>

            {/* Typewriter */}
            <div className="text-xl lg:text-2xl text-slate-300 font-bold">
              I'm a <TypeWriter words={roles} delay={100} />
            </div>

            {/* Description */}
            <p className="text-base lg:text-lg text-slate-400 max-w-lg leading-relaxed">
              Crafting high-performance, beautiful, and user-centric web
              experiences with modern technologies.
            </p>

            {/* Contact Info */}
            <div className="w-full">
              <ContactInfo />
            </div>

            {/* Buttons */}
            <div className="w-full flex justify-center lg:justify-start">
              <ActionButtons />
            </div>

            {/* Social Links */}
            <div className="w-full flex justify-center lg:justify-start pt-2">
              <SocialLinks />
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
      >
        <Link
          href="#about"
          className="flex flex-col items-center gap-1 text-slate-500 hover:text-white transition-colors group"
        >
          <span className="text-[9px] font-black tracking-[0.4em] uppercase group-hover:text-purple-400">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown className="w-4 h-4 text-purple-500" />
          </motion.div>
        </Link>
      </motion.div>
    </section>
  );
}