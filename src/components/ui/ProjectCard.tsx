import { SiGithub } from 'react-icons/si';
import { FaGlobe } from 'react-icons/fa6';
import { IconType } from 'react-icons';
import { motion } from 'framer-motion';

interface TechStackItem {
  icon: IconType;
  name: string;
  color?: string;
}

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  link?: string;
  github?: string;
  isOngoing?: boolean;
  techStack: TechStackItem[];
}

export function ProjectCard({
  title,
  description,
  image,
  link,
  github,
  isOngoing,
  techStack,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="glass p-4 rounded-[2.5rem] border-white/10 group flex flex-col h-full"
    >
      {/* Image Container */}
      <div className="relative aspect-video rounded-[2rem] overflow-hidden mb-6">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
          <div className="flex gap-4">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 glass rounded-full flex items-center justify-center text-white hover:bg-primary transition-colors"
              >
                <SiGithub size={24} />
              </a>
            )}
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 glass rounded-full flex items-center justify-center text-white hover:bg-secondary transition-colors"
              >
                <FaGlobe size={24} />
              </a>
            )}
          </div>
        </div>

        {isOngoing && (
          <div className="absolute top-4 right-4 glass px-4 py-1.5 rounded-full border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            Ongoing
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow px-2">
        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-gradient transition-all duration-500">
          {title}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
          {description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
          {techStack.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index} 
                className="glass px-3 py-1.5 rounded-full flex items-center gap-2 text-[10px] font-bold text-slate-300 uppercase tracking-tighter"
                style={{ color: item.color }}
              >
                <Icon size={14} />
                <span>{item.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
