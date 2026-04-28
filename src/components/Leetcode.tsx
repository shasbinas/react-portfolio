import { useState } from 'react';
import { SectionTitle } from './ui/SectionTitle';
import { SiLeetcode } from 'react-icons/si';
import { motion } from 'framer-motion';
export function Leetcode() {
  return (
    <section id="leetcode" className="py-24 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl px-6 relative z-10">
        <SectionTitle subtitle="Coding isn't just practice — it's how I sharpen problem-solving daily.">
          Leetcode Progress
        </SectionTitle>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* LeetCode Stats Card */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-primary blur-3xl opacity-10 group-hover:opacity-20 transition-opacity" />
              <div className="relative glass p-2 rounded-[2.5rem] border-white/10 overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                <img
                  src="https://leetcard.jacoblin.cool/shasbinas?theme=dark&font=Arapey&ext=activity"
                  alt="LeetCode Stats"
                  className="w-full h-auto rounded-[2rem] shadow-2xl"
                />
              </div>
            </div>
          </motion.div>

          {/* Leetcode Journey Text */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6"
          >
            <h3 className="text-3xl font-bold text-white group-hover:text-gradient transition-all">
              My Leetcode Journey
            </h3>
            <div className="space-y-4 text-slate-400 text-lg leading-relaxed">
              <p>
                Solving problems on Leetcode has helped me strengthen my Data
                Structures and Algorithms skills. I enjoy tackling challenges
                that push my problem-solving abilities and prepare me for
                technical interviews.
              </p>
              <p>
                I've completed problems across a variety of topics, including
                arrays, trees, graphs, and dynamic programming. My goal is to
                keep improving and stay consistent in learning and solving new
                problems daily.
              </p>
            </div>

            {/* LeetCode Profile Button */}
            <div className="pt-4">
              <a
                href="https://leetcode.com/u/shasbinas/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 glass px-8 py-4 rounded-full text-white font-bold hover:bg-white/10 transition-all group"
              >
                <SiLeetcode className="w-5 h-5 text-secondary group-hover:scale-110 transition-transform" />
                View Profile
                <div className="w-2 h-2 bg-secondary rounded-full group-hover:animate-ping" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
