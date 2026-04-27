import { SectionTitle } from './ui/SectionTitle';
import { SectionBackground } from './ui/SectionBackground';
import { ExperienceCard } from './ui/ExperienceCard';

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
      // 'AWS',
      'Git & GitHub',
      // 'Training & Mentorship',
    ],
  },
  // {
  //   title: 'Freelance Full Stack Web Developer',
  //   company: 'Upwork & Codyinger',
  //   period: 'Nov 2024 – Present',
  //   description: `Delivered 7+ full-stack projects including business websites and modern web applications with 78% client satisfaction. 
  //   Built scalable solutions with cloud integration using modern frameworks and backend technologies. 
  //   Managed full project cycles from architecture and development to deployment and long-term client support.`,
  //   skills: [
  //     'Next.js',
  //     'TypeScript',
  //     'React.js',
  //     'Node.js',
  //     'Express.js',
  //     'MongoDB',
  //     'PostgreSQL',
  //     'Cloud Integrations',
  //     'Client Communication',
  //   ],
  // },
  // {
  //   title: 'Junior Software Engineer',
  //   company: 'Estro Tech Robotics and Innovations Pvt. Ltd',
  //   period: 'Aug 2023 – Aug 2024',
  //   description: `Developed and optimized backend services using Node.js, Express.js, and TypeScript. 
  //   Improved testing efficiency using Playwright and Jest, achieving 90% test coverage. 
  //   Managed AWS Lambda-based serverless infrastructure, improving scalability and reducing operational costs by 30%.`,
  //   skills: [
  //     'Node.js',
  //     'Express.js',
  //     'TypeScript',
  //     'MongoDB',
  //     'AWS Lambda',
  //     'API Development',
  //     'Jest',
  //     'Playwright',
  //     'Serverless Architecture',
  //   ],
  // },
];

export function Experience() {
  return (
    <SectionBackground>
      <section id="experience">
        <div className="container mx-auto px-8">
          <SectionTitle subtitle="Where engineering, teaching, and real-world problem-solving come together.">
            Experience
          </SectionTitle>
          <div className="relative border-l-2 border-blue-600 dark:border-blue-500 max-w-5xl mx-auto space-y-10">
            {experiences.map((exp, index) => (
              <ExperienceCard key={index} {...exp} />
            ))}
          </div>
        </div>
      </section>
    </SectionBackground>
  );
}
