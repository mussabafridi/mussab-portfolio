import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Linkedin, Github, Copy, Check } from 'lucide-react';
import { useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  'Python (Pandas, NumPy, Matplotlib)',
  'SQL (SQL Server, MySQL, PostgreSQL)',
  'Power BI',
  'Excel (VLOOKUP, PivotTables)',
  'AI/ML (OpenCV, classification, statistical modeling)',
];

const experiences = [
  {
    title: 'Data Analyst Intern',
    company: 'Internee.pk',
    period: 'Present',
  },
  {
    title: 'AI Intern',
    company: 'Medsuccour AI',
    period: 'Oct 2022 – Mar 2023',
  },
  {
    title: 'Social Media Analyst',
    company: 'Hanma / Fitshop Pakistan / Revolution MMA',
    period: '2023 – 2024',
  },
];

const education = [
  {
    degree: 'BS Artificial Intelligence',
    school: 'Sindh Madressatul Islam University',
    year: '2025',
  },
];

const certifications = [
  'Certified Data Analyst — Alex The Analyst Bootcamp (2025)',
  'Data Analytics & Business Intelligence — DigiSkills (2025)',
  'Internship — Medsuccour AI (2023)',
  'Appreciation — NIC National Expansion Plan (2023)',
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const leftCol = leftColRef.current;
    const rightCol = rightColRef.current;

    if (!section || !heading || !leftCol || !rightCol) return;

    const leftBlocks = leftCol.querySelectorAll('.content-block');

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(heading,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: heading,
            start: 'top 80%',
            end: 'top 55%',
            scrub: 0.5,
          }
        }
      );

      // Left column blocks
      leftBlocks.forEach((block, index) => {
        gsap.fromTo(block,
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            delay: index * 0.08,
            scrollTrigger: {
              trigger: block,
              start: 'top 85%',
              end: 'top 60%',
              scrub: 0.5,
            }
          }
        );
      });

      // Right column (portrait)
      gsap.fromTo(rightCol,
        { scale: 0.92, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: rightCol,
            start: 'top 80%',
            end: 'top 55%',
            scrub: 0.5,
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText('mussabafridi@outlook.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full min-h-screen bg-bg-primary py-[8vh] px-[6vw] z-[70]"
    >
      {/* Heading */}
      <div ref={headingRef} className="mb-12">
        <h2 className="heading-display text-[clamp(34px,3.6vw,56px)] text-text-primary mb-4">
          Mussab — Analyst & BI Developer
        </h2>
        <p className="text-[clamp(15px,1.2vw,18px)] text-text-secondary leading-relaxed max-w-[700px]">
          I'm a data analyst with a background in AI and hands-on experience in SQL, 
          Power BI, Excel, and Python. I enjoy turning messy data into clean stories—
          whether it's a dashboard for leadership or an ad-hoc investigation for operations.
        </p>
      </div>

      {/* Two Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[58%_38%] gap-[4%]">
        {/* Left Column */}
        <div ref={leftColRef} className="space-y-10">
          {/* Skills */}
          <div className="content-block">
            <h3 className="text-label text-text-secondary mb-4">SKILLS</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 bg-white/50 border border-gray-200 rounded-full text-sm text-text-primary"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div className="content-block">
            <h3 className="text-label text-text-secondary mb-4">EXPERIENCE</h3>
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div
                  key={exp.title}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 border-b border-gray-200"
                >
                  <div>
                    <p className="font-medium text-text-primary">{exp.title}</p>
                    <p className="text-sm text-text-secondary">{exp.company}</p>
                  </div>
                  <span className="text-label text-text-secondary mt-1 sm:mt-0">
                    {exp.period}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="content-block">
            <h3 className="text-label text-text-secondary mb-4">EDUCATION</h3>
            {education.map((edu) => (
              <div
                key={edu.degree}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 border-b border-gray-200"
              >
                <div>
                  <p className="font-medium text-text-primary">{edu.degree}</p>
                  <p className="text-sm text-text-secondary">{edu.school}</p>
                </div>
                <span className="text-label text-text-secondary mt-1 sm:mt-0">
                  {edu.year}
                </span>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div className="content-block">
            <h3 className="text-label text-text-secondary mb-4">CERTIFICATIONS</h3>
            <div className="space-y-2">
              {certifications.map((cert) => (
                <div
                  key={cert}
                  className="flex items-start gap-3 py-2"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-indigo mt-2 flex-shrink-0" />
                  <p className="text-sm text-text-primary">{cert}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div ref={rightColRef} className="space-y-6">
          {/* Portrait */}
          <div className="circular-mask-ring mx-auto lg:mx-0">
            <img
              src="/images/about_portrait.jpg"
              alt="Mussab"
              className="w-[280px] h-[280px] lg:w-[320px] lg:h-[320px] object-cover"
            />
          </div>

          {/* Contact Card */}
          <div className="bg-white/50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-label text-text-secondary mb-4">GET IN TOUCH</h3>
            
            <div className="space-y-3 mb-6">
              <a
                href="mailto:mussabafridi@outlook.com"
                className="flex items-center gap-3 text-text-primary hover:text-accent-indigo transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span className="text-sm">mussabafridi@outlook.com</span>
              </a>
              <a
                href="https://linkedin.com/in/muhammad-mussab-bin-tahir"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-text-primary hover:text-accent-indigo transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                <span className="text-sm">LinkedIn</span>
              </a>
              <a
                href="https://github.com/mussabafridi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-text-primary hover:text-accent-indigo transition-colors"
              >
                <Github className="w-4 h-4" />
                <span className="text-sm">GitHub</span>
              </a>
            </div>

            <div className="flex gap-2">
              <a
                href="mailto:mussabafridi@outlook.com"
                className="flex-1 pill-button text-center text-sm py-2"
              >
                Send email
              </a>
              <button
                onClick={copyEmail}
                className="px-3 py-2 border-2 border-accent-indigo text-accent-indigo rounded-full hover:bg-accent-indigo hover:text-white transition-colors"
                title="Copy email"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
