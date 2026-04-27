import { SectionTitle } from './ui/SectionTitle';
import { ExperienceCard } from './ui/ExperienceCard';
import { motion } from 'framer-motion';

const experiences = [
  {
    title: 'Full Stack Development Intern',
    company: 'G-Tec Computer Education, Irinjalakuda',
    period: 'Jul 2025 – Present',
    description: `Working on full-stack development with a focus on backend engineering. Building secure RESTful APIs, implementing caching and session management with Redis, designing scalable architectures, and integrating relational and NoSQL databases. Gaining hands-on experience with containerization, API performance optimization, and modern JavaScript development workflows.`,
    skills: [
      'React.js',
      'Node.js',
      'Express.js',
      'PostgreSQL',
      'MongoDB',
      'TypeScript',
      "Docker",
      "Redis",
      'Git & GitHub',
    ],
  },
];

export function Experience() {
  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <SectionTitle subtitle="Where engineering, teaching, and real-world problem-solving come together.">
          Experience
        </SectionTitle>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} {...exp} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
