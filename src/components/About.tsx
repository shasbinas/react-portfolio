import { User2, Code2, Lightbulb, CheckCircle2 } from 'lucide-react';
import { GoGoal } from 'react-icons/go';
import { SectionTitle } from './ui/SectionTitle';
import { motion, Variants } from 'framer-motion';
import FlowingDots from './ui/FlowingDots';

const aboutSections = [
  {
    icon: User2,
    title: 'Who I Am',
    description: [
      'Full Stack MERN Developer with hands-on experience in scalable web applications.',
      'Passionate about clean architecture and modern JavaScript technologies.',
      'Problem-solver focused on clean, scalable code.',
    ],
    gradient: 'from-blue-500/20 to-cyan-500/20',
    iconColor: 'text-blue-500',
  },
  {
    icon: Code2,
    title: 'What I Do',
    description: [
      'Develop end-to-end applications using React, Next.js, Node.js, TypeScript, and databases.',
      'Create RESTful APIs and integrate cloud services for backend efficiency.',
      'Implement automated testing and maintain production-ready code.',
    ],
    gradient: 'from-purple-500/20 to-indigo-500/20',
    iconColor: 'text-purple-500',
  },
  {
    icon: GoGoal,
    title: 'My Goals',
    description: [
      'Develop impactful technology products for real-world challenges.',
      'Deepen expertise in cloud-native development and DevOps.',
      'Mentor emerging developers through community engagement.',
    ],
    gradient: 'from-emerald-500/20 to-cyan-500/20',
    iconColor: 'text-emerald-500',
  },
  {
    icon: Lightbulb,
    title: 'My Philosophy',
    description: [
      'Software should be simple, reliable, and user-focused.',
      'Continuous learning is vital as technology evolves.',
      'Aim for meaningful problems rather than just complex code.',
    ],
    gradient: 'from-orange-500/20 to-red-500/20',
    iconColor: 'text-orange-500',
  },
];

export function About() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    },
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-transparent">
      {/* Background Layer */}
      <FlowingDots 
        className="absolute inset-0 z-0" 
        particleColor="45, 212, 191" 
        animationSpeed={0.002} 
      />

      <div className="container mx-auto px-6 relative z-10">
        <SectionTitle subtitle="Passionate developer building innovative solutions and solving real-world problems.">
          About Me
        </SectionTitle>

        {/* Introduction */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-20 text-center"
        >
          <p className="text-xl text-slate-400 leading-relaxed">
            Hey there! 👋 I'm <span className="text-gradient font-bold">Shasbin AS</span>,
            a Full Stack MERN Developer. I specialize in
            building scalable web applications using React.js, Next.js,
            Node.js, TypeScript, MongoDB, and PostgreSQL. With experience
            delivering projects for clients worldwide, I focus on creating
            efficient, user-centric digital products.
          </p>
        </motion.div>

        {/* About Section Cards - Equal Height Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch"
        >
          {aboutSections.map(({ icon: Icon, title, description, gradient, iconColor }) => (
            <motion.div
              key={title}
              variants={itemVariants}
              className="group h-full"
            >
              <div 
                data-cursor="hover"
                className="glass-premium p-8 rounded-[2.5rem] relative border-white/10 overflow-hidden h-full min-h-[420px] flex flex-col transition-all duration-500 hover:border-white/20"
              >
                {/* Background Glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
                
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className={`w-14 h-14 glass rounded-2xl flex items-center justify-center ${iconColor} mb-6 transition-transform group-hover:scale-110 duration-500`}>
                      <Icon size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">
                      {title}
                    </h3>
                    <div className="space-y-4">
                      {description.map((point, index) => (
                        <div key={index} className="flex gap-3 items-start">
                          <div className="mt-1.5 text-primary">
                            <CheckCircle2 size={14} />
                          </div>
                          <p className="text-sm text-slate-400 leading-relaxed">
                            {point}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Bottom Decorative Line */}
                  <div className={`w-full h-1 rounded-full bg-gradient-to-r ${gradient} opacity-20 mt-6`} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
