import { Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

interface ExperienceCardProps {
  title: string;
  company: string;
  period: string;
  description: string;
  skills: string[];
}

export function ExperienceCard({
  title,
  company,
  period,
  description,
  skills,
}: ExperienceCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="relative group pl-12 sm:pl-16 pb-12 last:pb-0"
    >
      {/* Timeline Line Connector */}
      <div className="absolute left-[15px] top-8 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-transparent" />

      {/* Timeline Dot with Double Ring Glow */}
      <div className="absolute left-0 top-6 flex items-center justify-center w-8 h-8">
        <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
        <div className="w-4 h-4 bg-primary rounded-full ring-4 ring-obsidian z-10" />
      </div>

      {/* Experience Card */}
      <div className="glass p-8 rounded-[2.5rem] border-white/10 group-hover:border-white/20 transition-all relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500">
                <Briefcase size={28} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white group-hover:text-gradient transition-all">
                  {title}
                </h3>
                <p className="text-lg font-semibold text-slate-300">
                  {company}
                </p>
              </div>
            </div>
            <span className="glass px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-slate-500">
              {period}
            </span>
          </div>

          <div className="space-y-4 text-slate-400 leading-relaxed mb-8">
            {description.split('. ').map((point, index) => (
              <p key={index} className="flex gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                {point.trim()}
              </p>
            ))}
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="glass-premium px-4 py-1.5 rounded-full text-xs font-bold text-slate-300 hover:text-white hover:bg-white/10 transition-all cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
