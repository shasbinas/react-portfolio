import { useState, useEffect } from 'react';
import GitHubCalendar from 'react-github-calendar';
import { SectionTitle } from './ui/SectionTitle';
import { FaGithub, FaStar, FaCodeFork, FaUsers, FaBoxArchive } from 'react-icons/fa6';
import { motion } from 'framer-motion';

interface Repo {
  name: string;
  description?: string;
  stars: number;
  forks: number;
  language?: string;
  html_url: string;
}

interface UserProfile {
  avatar_url: string;
  name: string;
  login: string;
  bio: string;
  followers: number;
  public_repos: number;
  html_url: string;
}

const SPECIFIC_REPOS: Repo[] = [
  {
    name: 'task-manager-api-ts',
    description: 'Production-grade REST API built with Node.js, TypeScript, Express, PostgreSQL, Redis and Docker.',
    stars: 1,
    forks: 0,
    language: 'TypeScript',
    html_url: 'https://github.com/shasbinas/task-manager-api-ts.git',
  },
  {
    name: 'react-ts-personal-portfolio',
    description: 'My personal developer portfolio built with React and TypeScript. Features a component-driven architecture.',
    stars: 1,
    forks: 0,
    language: 'TypeScript',
    html_url: 'https://github.com/shasbinas/react-ts-personal-portfolio.git',
  },
  {
    name: 'my-portfolio-nextjs',
    description: 'This is a modern developer portfolio. Designed with a clean UI/UX, smooth animations, and dynamic content.',
    stars: 22,
    forks: 0,
    language: 'TypeScript',
    html_url: 'https://github.com/shasbinas/my-portfolio-nextjs.git',
  },
];

export function GitHub() {
  const [repos] = useState<Repo[]>(SPECIFIC_REPOS);
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    fetch('https://api.github.com/users/shasbinas')
      .then(res => res.json())
      .then((data: UserProfile) => setUser(data))
      .catch(() => {});
  }, []);

  return (
    <section id="github" className="py-24 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl px-6 relative z-10">
        <SectionTitle subtitle="Code that lives, breathes, and contributes — open source and beyond.">
          GitHub Contributions
        </SectionTitle>

        {/* Contribution Graph */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 glass p-8 rounded-[2.5rem] border-white/10"
        >
          <div className="flex justify-center overflow-x-auto pb-4 scrollbar-hide">
            <GitHubCalendar
              username="shasbinas"
              blockSize={14}
              blockMargin={5}
              colorScheme="dark"
              theme={{
                dark: ['#1e293b', '#4c1d95', '#7c3aed', '#2dd4bf', '#5eead4'],
              }}
            />
          </div>
        </motion.div>

        {/* Top Repositories */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
          {repos.map((repo, index) => (
            <motion.a
              key={repo.name}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass p-8 rounded-[2.5rem] border-white/10 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10 h-full flex flex-col">
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-gradient transition-all">
                  {repo.name}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                  {repo.description}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-500">{repo.language}</span>
                  <div className="flex gap-4 text-slate-300">
                    <span className="flex items-center gap-1.5 text-sm"><FaStar className="text-yellow-500" /> {repo.stars}</span>
                    <span className="flex items-center gap-1.5 text-sm"><FaCodeFork className="text-slate-400" /> {repo.forks}</span>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* GitHub Profile Widget */}
        {user && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass p-8 rounded-[2.5rem] border-white/10 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5" />
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10">
              <div className="relative">
                <div className="absolute inset-0 bg-primary blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
                <img
                  src={user.avatar_url}
                  alt={user.name}
                  className="w-24 h-24 lg:w-32 lg:h-32 rounded-3xl relative z-10 glass p-1 border-white/20"
                />
              </div>
              
              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-3xl font-bold text-white mb-2">{user.name}</h3>
                <p className="text-slate-400 mb-6 max-w-xl mx-auto lg:mx-0">{user.bio}</p>
                
                <div className="flex flex-wrap justify-center lg:justify-start gap-6">
                  <div className="flex items-center gap-2 text-slate-300">
                    <div className="w-10 h-10 glass rounded-xl flex items-center justify-center text-primary"><FaUsers /></div>
                    <div className="flex flex-col">
                      <span className="text-lg font-bold leading-none">{user.followers}</span>
                      <span className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Followers</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <div className="w-10 h-10 glass rounded-xl flex items-center justify-center text-secondary"><FaBoxArchive /></div>
                    <div className="flex flex-col">
                      <span className="text-lg font-bold leading-none">{user.public_repos}</span>
                      <span className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Repositories</span>
                    </div>
                  </div>
                </div>
              </div>

              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass px-8 py-4 rounded-full text-white font-bold hover:bg-white/10 transition-all flex items-center gap-3 group/btn"
              >
                <FaGithub size={20} />
                View Profile
                <div className="w-2 h-2 bg-primary rounded-full group-hover/btn:animate-ping" />
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
