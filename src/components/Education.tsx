import { SectionTitle } from './ui/SectionTitle';
import { SectionBackground } from './ui/SectionBackground';
import { EducationCard } from './ui/EducationCard';

const education = [
  {
    degree: 'Bachelor of Computer Applications (BCA) - Online Degree',
    institution: 'Yenepoya University',
    period: 'Jul 2025 – Expected Jul 2028',
    score: 'Ongoing',
  },
  // {
  //   degree: 'Full Stack Development (MERN)',
  //   institution: 'Brototype',
  //   period: 'Jul 2022 – Aug 2023',
  //   score: '',
  // },
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
    <SectionBackground>
      <section id="education">
        <div className="container mx-auto px-8">
          <SectionTitle subtitle="A solid academic foundation fueling my passion for tech innovation.">
            Education
          </SectionTitle>
          <div className="max-w-5xl mx-auto space-y-10">
            {education.map((edu, index) => (
              <EducationCard
                key={edu.degree}
                {...edu}
                isLast={index === education.length - 1}
              />
            ))}
          </div>
        </div>
      </section>
    </SectionBackground>
  );
}
