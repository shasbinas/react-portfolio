import React from 'react';
import { IconType } from 'react-icons';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface SkillCardProps {
  name: string;
  icon: LucideIcon | IconType;
  color?: string;
  url?: string;
}

export function SkillCard({ name, icon: Icon, color, url }: SkillCardProps) {
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -10, scale: 1.05 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col items-center p-6 glass rounded-3xl border-white/5 hover:border-white/20 transition-all overflow-hidden"
    >
      {/* Background Glow */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-2xl -z-10"
        style={{ background: color }}
      />

      {/* Icon Container */}
      <div
        className="relative w-16 h-16 rounded-2xl glass flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500 shadow-xl"
        style={{ color: color }}
      >
        <Icon size={32} />
        {/* Inner Glow */}
        <div 
          className="absolute inset-0 rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500"
          style={{ background: color }}
        />
      </div>

      {/* Skill Name */}
      <span className="text-xs font-bold uppercase tracking-widest text-slate-400 group-hover:text-white transition-colors">
        {name}
      </span>

      {/* Hover Line */}
      <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent group-hover:w-full transition-all duration-700" />
    </motion.a>
  );
}
