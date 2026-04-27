import { SectionTitle } from './ui/SectionTitle';
import { FaGithub, FaLinkedin, FaEnvelope,  } from 'react-icons/fa6';
import { SiLeetcode } from 'react-icons/si';
import { Phone, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import ContactCards from './ui/ContactCard';

export function Contact() {
  const socialLinks = [
    {
      href: "mailto:shasbin.official@gmail.com",
      icon: FaEnvelope,
      label: "shasbin.official@gmail.com",
      color: "text-blue-400",
      glow: "bg-blue-500/20"
    },
    {
      href: "https://github.com/shasbinas",
      icon: FaGithub,
      label: "github.com/shasbinas",
      color: "text-slate-300",
      glow: "bg-white/10"
    },
    {
      href: "https://www.linkedin.com/in/shasbin-as-58ba50376/",
      icon: FaLinkedin,
      label: "linkedin.com/in/shasbin-as",
      color: "text-blue-500",
      glow: "bg-blue-600/20"
    },
    {
      href: "https://leetcode.com/u/shasbinas/",
      icon: SiLeetcode,
      label: "leetcode.com/u/shasbinas",
      color: "text-orange-400",
      glow: "bg-orange-500/20"
    },
    {
      href: "tel:+919747733770",
      icon: Phone,
      label: "+91 9746998909",
      color: "text-emerald-400",
      glow: "bg-emerald-500/20"
    }
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <SectionTitle subtitle="Let's collaborate on your next big idea — I'm just a message away.">
          Get In Touch
        </SectionTitle>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Left Column: Let's Connect */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-10 rounded-[2.5rem] border-white/10 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
            
            <div className="relative z-10">
              <h3 className="text-4xl font-bold text-white mb-6 group-hover:text-gradient transition-all">
                Let's Connect
              </h3>
              <p className="text-slate-400 text-lg leading-relaxed mb-10">
                I'm always open to discussing new projects, creative ideas, or
                opportunities to be part of your visions.
              </p>

              <div className="space-y-4">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-4 p-4 glass-premium rounded-2xl group/link border-white/5 hover:border-white/20 transition-all"
                  >
                    <div className={`w-12 h-12 glass rounded-xl flex items-center justify-center ${link.color} transition-transform group-hover/link:scale-110`}>
                      <link.icon size={20} />
                    </div>
                    <span className="text-slate-300 font-medium group-hover/link:text-white transition-colors">
                      {link.label}
                    </span>
                    <ArrowRight className="ml-auto w-5 h-5 text-slate-500 opacity-0 group-hover/link:opacity-100 group-hover/link:translate-x-1 transition-all" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Cards */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-10 rounded-[2.5rem] border-white/10 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-primary/5" />
            <div className="relative z-10 h-full">
              <ContactCards />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
