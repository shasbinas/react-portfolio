import { GraduationCap, Calendar, Award } from 'lucide-react';
import { motion } from 'framer-motion';

interface EducationCardProps {
  degree: string;
  institution: string;
  period: string;
  score: string;
}

export function EducationCard({
  degree,
  institution,
  period,
  score,
}: EducationCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="glass p-8 rounded-[2.5rem] border-white/10 group relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-8">
        <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center text-secondary group-hover:scale-110 transition-transform duration-500">
          <GraduationCap size={32} />
        </div>

        <div className="flex-1">
          <h3 className="text-2xl font-bold text-white mb-1">
            {degree}
          </h3>
          <p className="text-lg font-bold text-gradient mb-4">
            {institution}
          </p>

          <div className="flex flex-wrap gap-4">
            <div className="glass px-4 py-2 rounded-full flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500">
              <Calendar size={14} className="text-secondary" />
              {period}
            </div>
            <div className="glass px-4 py-2 rounded-full flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500">
              <Award size={14} className="text-primary" />
              Score: {score}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
