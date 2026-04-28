import { ArrowDown } from 'lucide-react';
import { Link } from './Link';
import { TypeWriter } from './ui/TypeWriter';
import { SocialLinks } from './hero/SocialLinks';
import { ContactInfo } from './hero/ContactInfo';
import { ActionButtons } from './hero/ActionButtons';
import { motion, useScroll, useTransform } from 'framer-motion';

export function Hero() {
  const roles = [
    'Full Stack Developer',
    'Node.js Backend Engineer',
    'Next.js & React.js Developer',
  ];

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative py-20 overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Profile Image */}
          <motion.div 
            initial={{ opacity: 0, x: -50, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex justify-center lg:justify-start order-2 lg:order-1"
          >
            {/* Decorative Elements */}
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-blob" />
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl animate-blob [animation-delay:2s]" />
            
            <div className="relative group perspective-1000">
              <motion.div
                whileHover={{ rotateY: -10, rotateX: -10 }}
                className="relative z-10 p-2 glass rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 w-[260px] h-[320px] md:w-[320px] md:h-[420px] lg:w-[380px] lg:h-[480px] flex-shrink-0"
              >
                <img
                  src="/assets/profile.jpeg"
                  alt="Shasbin AS"
                  className="w-full h-full object-cover object-top rounded-[2rem] shadow-2xl"
                />
              </motion.div>
              
              {/* Image Border Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-[2.5rem] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity -z-10" />
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ y: y1, opacity }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 order-1 lg:order-2"
          >
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-8xl font-bold tracking-tight text-gradient leading-tight">
                Shasbin AS
              </h1>
              
              <div className="text-2xl md:text-3xl text-slate-400 font-medium">
                I'm a <TypeWriter words={roles} delay={100} />
              </div>

              <p className="text-lg text-slate-500 max-w-xl leading-relaxed">
                Crafting high-performance, beautiful, and user-centric web experiences with modern technologies.
              </p>
            </div>

            <div className="w-full flex flex-col items-center lg:items-start gap-8">
              <ContactInfo />
              <ActionButtons />
              <SocialLinks />
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <Link href="#about" className="flex flex-col items-center gap-2 text-slate-500 hover:text-white transition-colors">
            <span className="text-xs font-bold tracking-widest uppercase">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowDown className="w-5 h-5" />
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
