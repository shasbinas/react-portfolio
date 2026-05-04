import { SectionTitle } from './ui/SectionTitle';
import { ProjectCard } from './ui/ProjectCard';
import { motion } from 'framer-motion';
import {
  SiReact,
  SiNodedotjs,
  SiFirebase,
  SiTailwindcss,
  SiTypescript,
  SiNextdotjs,
  SiMongodb,
  SiPrisma,
  SiShadcnui,
  SiFramer,
  SiSocketdotio,
  SiStripe,
  SiAppwrite,
  SiHtml5,
  SiCss3,
  SiExpress,
  SiPostgresql,
  SiRedis,
  SiDocker,
} from 'react-icons/si';

const techStacks = {
  react: { icon: SiReact, name: 'React', color: '#00cfff' },
  node: { icon: SiNodedotjs, name: 'Node.js', color: '#228b22' },
  firebase: { icon: SiFirebase, name: 'Firebase', color: '#fbbf00' },
  tailwind: { icon: SiTailwindcss, name: 'Tailwind CSS', color: '#06b6d4' },
  typescript: { icon: SiTypescript, name: 'TypeScript', color: '#1f6feb' },
  next: { icon: SiNextdotjs, name: 'Next.js', color: '#ffffff' },
  mongodb: { icon: SiMongodb, name: 'MongoDB', color: '#10b981' },
  prisma: { icon: SiPrisma, name: 'Prisma', color: '#186997' },
  postgresql: { icon: SiPostgresql, name: 'PostgreSQL', color: '#336791' },
  shadcn: { icon: SiShadcnui, name: 'ShadCN', color: '#ffffff' },
  framer: { icon: SiFramer, name: 'Framer Motion', color: '#2563eb' },
  socket: { icon: SiSocketdotio, name: 'Socket.io', color: '#ffffff' },
  stripe: { icon: SiStripe, name: 'Stripe', color: '#5b4df1' },
  appwrite: { icon: SiAppwrite, name: 'Appwrite', color: '#ff3d00' },
  redis: { icon: SiRedis, name: 'Redis', color: '#dc382d' },
  docker: { icon: SiDocker, name: 'Docker', color: '#2496ed' },
};

const projects = [
  {
    title: '',
    description:
      '',
    image: '',
    link: '',
    github: '',
    techStack: [
      { icon: SiHtml5, name: 'HTML', color: '#e34c26' },
      { icon: SiCss3, name: 'CSS', color: '#264de4' },
      techStacks.react,
      techStacks.tailwind,
      techStacks.typescript,
    ],
  },
  {
    title: 'Task Manager APIs',
    description:
      'Production-grade REST API built with Node.js, TypeScript, Express, Postgresql, Redis and Docker. Includes Jest, Supertest, test Coverage and Docker Compose.',
    image: '/assets/img/Backend API.png',
    link: '',
    github: 'https://github.com/shasbinas/task-manager-api-ts.git',
    techStack: [
      techStacks.node,
      techStacks.typescript,
      techStacks.postgresql,
      { icon: SiExpress, name: 'Express', color: '#ffffff' },
      techStacks.redis,
      techStacks.docker,
    ],
  },
  {
    title: 'Modern Portfolio',
    description:
      'This is a modern developer portfolio. Designed with a clean UI/UX, smooth animations, and dynamic content. it is fully responsive and optimized for performance.',
    image: '/assets/img/modern-portfolio.png',
    link: 'https://personal-website-psi-eight-78.vercel.app/',
    github: 'https://github.com/shasbinas/my-portfolio-nextjs.git',
    techStack: [
      techStacks.next,
      techStacks.react,
      techStacks.typescript,
      techStacks.tailwind,
      techStacks.framer,
    ],
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <SectionTitle subtitle="Every project, a product. Every product, a solution with a story.">
          Projects
        </SectionTitle>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
