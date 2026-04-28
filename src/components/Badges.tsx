import { useState } from 'react';
import { SectionTitle } from './ui/SectionTitle';
import { motion } from 'framer-motion';
import RainbowCursor from './ui/RainbowCursor';

const badges = [
  {
    id: 'leetcode-100',
    platform: 'LeetCode',
    title: '100 Days Badge 2025',
    image: 'https://assets.leetcode.com/static_assets/others/25100.gif',
    profile: 'https://leetcode.com/u/shasbinas/',
    color: 'from-orange-500/20 to-yellow-500/20'
  },
  {
    id: 'leetcode-50',
    platform: 'LeetCode',
    title: '50 Days Badge 2025',
    image: 'https://assets.leetcode.com/static_assets/others/2550.gif',
    profile: 'https://leetcode.com/u/shasbinas/',
    color: 'from-blue-500/20 to-cyan-500/20'
  },
  {
    id: 'leetcode-75',
    platform: 'LeetCode',
    title: 'LeetCode 75',
    image: 'https://assets.leetcode.com/static_assets/others/LeetCode_75.gif',
    profile: 'https://leetcode.com/u/shasbinas/',
    color: 'from-purple-500/20 to-pink-500/20'
  },
  {
    id: 'github-shark',
    platform: 'GitHub',
    title: 'Pull Shark',
    image: 'https://github.githubassets.com/assets/pull-shark-default-498c279a747d.png',
    profile: 'https://github.com/shasbinas',
    color: 'from-cyan-500/20 to-blue-500/20'
  },
  {
    id: 'github-arctic',
    platform: 'GitHub',
    title: 'Starstruck',
    image: 'https://github.githubassets.com/assets/starstruck-default--light-a594e2a027e0.png',
    profile: 'https://github.com/shasbinas',
    color: 'from-yellow-500/20 to-orange-500/20'
  },
  {
    id: 'github-yolo',
    platform: 'GitHub',
    title: 'YOLO',
    image: 'https://github.githubassets.com/assets/yolo-default-be0bbff04951.png',
    profile: 'https://github.com/shasbinas',
    color: 'from-red-500/20 to-purple-500/20'
  },
  {
    id: 'github-pair-extraordinary',
    platform: 'GitHub',
    title: 'Pair Extraordinary',
    image: 'https://github.githubassets.com/assets/pair-extraordinaire-default-579438a20e01.png',
    profile: 'https://github.com/shasbinas',
    color: 'from-indigo-500/20 to-blue-500/20'
  },
  {
    id: 'github-quickdraw',
    platform: 'GitHub',
    title: 'Quickdraw',
    image: 'https://github.githubassets.com/assets/quickdraw-default--light-8f798b35341a.png',
    profile: 'https://github.com/shasbinas',
    color: 'from-emerald-500/20 to-teal-500/20'
  },
];

export function Badges() {
  const [sectionElement, setSectionElement] = useState<HTMLElement | null>(null);

  return (
    <section id="badges" ref={setSectionElement} className="py-24 relative overflow-hidden">
      <RainbowCursor element={sectionElement} />
      <div className="container mx-auto max-w-6xl px-6 relative z-10">
        <SectionTitle subtitle="Milestones that reflect the journey of continuous growth and mastery.">
          Coding Badges
        </SectionTitle>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8"
        >
          {badges.map((badge, index) => (
            <motion.a
              key={badge.id}
              href={badge.profile}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -8 }}
              className="glass p-6 rounded-[2.5rem] flex flex-col items-center group relative overflow-hidden border-white/10"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${badge.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-white blur-2xl opacity-0 group-hover:opacity-20 transition-opacity" />
                  <img
                    src={badge.image}
                    alt={badge.title}
                    className="w-32 h-32 object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                
                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-gradient transition-all">
                  {badge.title}
                </h3>
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  {badge.platform}
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
