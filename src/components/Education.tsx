import { SectionTitle } from './ui/SectionTitle';
import { EducationCard } from './ui/EducationCard';
import { motion } from 'framer-motion';

const education = [
  {
    degree: 'Bachelor of Computer Applications (BCA) - Online Degree',
    institution: 'Yenepoya University',
    period: 'Jul 2025 – Expected Jul 2028',
    score: 'Ongoing',
  },
  {
    degree: 'Senior Secondary (Plus Two)',
    institution: 'Lbsm Higher Secondary School',
    period: 'Jul 2021 – Mar 2023',
    score: '74%',
  },
  {
    degree: 'Secondary (SSLC)',
    institution: `Lbsm Higher Secondary School`,
    period: 'Jul 2020 – Mar 2021',
    score: '92%',
  },
];

export function Education() {
  return (
    <section id="education" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <SectionTitle subtitle="A solid academic foundation fueling my passion for tech innovation.">
          Education
        </SectionTitle>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto flex flex-col gap-8"
        >
          {education.map((edu, index) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
            >
              <EducationCard {...edu} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
