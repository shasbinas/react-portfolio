import { SectionTitle } from './ui/SectionTitle';
import { SkillCard } from './ui/SkillCard';
import { motion } from 'framer-motion';
import FlowingDots from './ui/FlowingDots';
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
  SiMongodb,
  SiGit,
  SiGithub,
  SiVercel,
  SiFigma,
  SiTailwindcss,
  SiTypescript,
  SiNextdotjs,
  SiExpress,
  SiPostgresql,
  SiPrisma,
  SiDjango,
  SiPython,
  SiDocker,
  SiRedis,
  SiPostman,
} from 'react-icons/si';
import { FaNodeJs } from 'react-icons/fa6';
import { VscVscode, VscTerminalPowershell } from 'react-icons/vsc';

const skills = [
  { name: 'HTML', icon: SiHtml5, color: '#e34f26', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
  { name: 'CSS', icon: SiCss3, color: '#1572b6', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
  { name: 'JavaScript', icon: SiJavascript, color: '#f7df1e', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178c6', url: 'https://www.typescriptlang.org/' },
  { name: 'React', icon: SiReact, color: '#61dafb', url: 'https://react.dev/' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#ffffff', url: 'https://nextjs.org/' },
  { name: 'Tailwind', icon: SiTailwindcss, color: '#06b6d4', url: 'https://tailwindcss.com/' },
  { name: 'Node.js', icon: FaNodeJs, color: '#68a063', url: 'https://nodejs.org/' },
  { name: 'Express', icon: SiExpress, color: '#ffffff', url: 'https://expressjs.com/' },
  { name: 'Python', icon: SiPython, color: '#3776ab', url: 'https://www.python.org/' },
  { name: 'Django', icon: SiDjango, color: '#092e20', url: 'https://www.djangoproject.com/' },
  { name: 'MongoDB', icon: SiMongodb, color: '#47a248', url: 'https://www.mongodb.com/' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#336791', url: 'https://www.postgresql.org/' },
  { name: 'Prisma', icon: SiPrisma, color: '#ffffff', url: 'https://www.prisma.io/' },
  { name: 'Redis', icon: SiRedis, color: '#dc382d', url: 'https://redis.io/' },
  { name: 'Git', icon: SiGit, color: '#f34f29', url: 'https://git-scm.com/' },
  { name: 'Docker', icon: SiDocker, color: '#2496ed', url: 'https://www.docker.com/' },
  { name: 'Vercel', icon: SiVercel, color: '#ffffff', url: 'https://vercel.com/' },
  { name: 'VS Code', icon: VscVscode, color: '#007acc', url: 'https://code.visualstudio.com/' },
  { name: 'Postman', icon: SiPostman, color: '#ff6c37', url: 'https://www.postman.com/' },
];

export function Skills() {
  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <FlowingDots 
        className="absolute inset-0 z-0 opacity-20" 
        particleColor="6, 182, 212" 
        animationSpeed={0.002} 
      />
      <div className="container mx-auto px-6 relative z-10">
        <SectionTitle subtitle="A modern tech stack designed for impact, efficiency, and scale.">
          Skills
        </SectionTitle>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6"
        >
          {skills.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.03, duration: 0.5 }}
            >
              <SkillCard {...tech} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
