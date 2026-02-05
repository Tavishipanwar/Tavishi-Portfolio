"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const experiences = [
  {
    year: "Sep 2025 - Present",
    title: "Master's in Engineering Management",
    company: "Northwestern University",
    location: "Evanston, United States",
    description: "Currently pursuing graduate studies with a focus on engineering management and product leadership.",
    achievements: ["CGPA: 4.0/4.0", "Product Strategy", "Leadership"],
    type: "education",
  },
  {
    year: "Sep 2021 - Aug 2025",
    title: "Product Analyst",
    company: "Accenture",
    location: "Gurugram, India",
    description: "Managed cross-functional teams to deliver enterprise HR and automation solutions. Owned end-to-end product lifecycle for SAP HR enhancements.",
    achievements: [
      "FY22 All-Star Award",
      "FY24 Growth Catalyst",
      "250+ hours automated",
      "20% efficiency gain",
    ],
    type: "work",
  },
  {
    year: "Apr 2021 - Aug 2021",
    title: "Software Engineer Intern",
    company: "Quokka Labs",
    location: "Noida, India",
    description: "Led core website UI/UX redesign and analytics implementation. Collaborated with stakeholders to translate user behavior insights into features.",
    achievements: ["+40% traffic", "+15% conversion", "A/B Testing"],
    type: "work",
  },
  {
    year: "Aug 2017 - Aug 2021",
    title: "B.Tech in Information Technology",
    company: "Dr APJ Abdul Kalam Technical University",
    location: "India",
    description: "Bachelor's degree with strong foundation in technology and software development.",
    achievements: ["CGPA: 9.45/10", "~3.8/4.0 GPA", "IT Fundamentals"],
    type: "education",
  },
];

const certifications = [
  "SAP SuccessFactors Employee Central",
  "Intro to Data Science - Uni. of Michigan",
  "Web Development - Coursera",
  "Microsoft SQL Server - Udemy",
];

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-16 sm:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute left-0 top-0 bottom-0 w-1/2 bg-gradient-to-r from-primary/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-16 lg:min-h-[600px]">
          {/* Left Column - Header (Fixed/Non-scrollable) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-32 lg:self-start lg:h-fit"
          >
            <span className="text-primary font-semibold tracking-wider uppercase text-sm">
              Career Journey
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 mb-4 sm:mb-6">
              Experience & <span className="gradient-text">Education</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              A track record of driving product success across enterprise environments,
              combined with strong academic foundations in engineering and technology.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="bg-card rounded-xl p-4 sm:p-6 border border-border">
                <div className="text-3xl sm:text-4xl font-bold gradient-text">4+</div>
                <div className="text-muted-foreground">Years Experience</div>
              </div>
              <div className="bg-card rounded-xl p-4 sm:p-6 border border-border">
                <div className="text-3xl sm:text-4xl font-bold gradient-text">4.0</div>
                <div className="text-muted-foreground">GPA at Northwestern</div>
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-card rounded-xl p-4 sm:p-6 border border-border">
              <h3 className="font-semibold mb-3 sm:mb-4">Certifications</h3>
              <div className="flex flex-wrap gap-2">
                {certifications.map((cert) => (
                  <span
                    key={cert}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>

            {/* Download Resume Button */}
            <motion.a
              href="/TavishiResume.pdf"
              download
              className="mt-6 sm:mt-8 px-6 sm:px-8 py-3 sm:py-4 rounded-full gradient-bg text-white font-semibold flex items-center gap-2 w-fit text-sm sm:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Resume
            </motion.a>
          </motion.div>

          {/* Right Column - Timeline (Scrollable) */}
          <div className="relative lg:max-h-[600px] lg:overflow-y-auto lg:pr-4 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent hidden md:block" />

            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.year}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="relative pl-0 md:pl-20"
                >
                  {/* Timeline Dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: index * 0.15 + 0.3 }}
                    className={`absolute left-4 top-8 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold hidden md:flex ${
                      exp.type === "education" ? "bg-blue-500" : "gradient-bg"
                    }`}
                  >
                    {exp.type === "education" ? (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    )}
                  </motion.div>

                  {/* Card */}
                  <div className="bg-card rounded-2xl p-6 border border-border card-hover">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm text-primary font-semibold">{exp.year}</span>
                      <span className={`px-2 py-0.5 rounded text-xs ${
                        exp.type === "education"
                          ? "bg-blue-500/10 text-blue-500"
                          : "bg-primary/10 text-primary"
                      }`}>
                        {exp.type === "education" ? "Education" : "Work"}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold">{exp.title}</h3>
                    <p className="text-muted-foreground mt-1">{exp.company}</p>
                    <p className="text-sm text-muted-foreground">{exp.location}</p>
                    <p className="mt-4 text-muted-foreground">{exp.description}</p>

                    {/* Achievements */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {exp.achievements.map((achievement) => (
                        <span
                          key={achievement}
                          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
                        >
                          {achievement}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
