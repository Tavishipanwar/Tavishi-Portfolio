"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const awards = [
  {
    title: "FY22 All-Star Award: Growth Markets",
    company: "Accenture",
    description: "Recognized for exceptional contributions to growth markets initiatives and delivering outstanding results.",
  },
  {
    title: "FY24 Growth Catalyst Award",
    company: "Accenture",
    description: "Awarded for driving significant business growth and demonstrating leadership in product delivery.",
  },
  {
    title: "Power of Team Award: Q3 FY24",
    company: "Accenture",
    description: "Honored for outstanding collaboration and teamwork in delivering enterprise solutions.",
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 bg-secondary/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold tracking-wider uppercase text-sm">
            Recognition
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Awards & <span className="gradient-text">Achievements</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Recognition received for driving product excellence and delivering
            impactful results at enterprise scale.
          </p>
        </motion.div>

        {/* Awards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {awards.map((award, index) => (
            <motion.div
              key={award.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group"
            >
              <div className="bg-card rounded-2xl p-8 border border-border card-hover h-full relative overflow-hidden">
                {/* Trophy Icon */}
                <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center text-white mb-6">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {award.title}
                </h3>
                <p className="text-primary font-medium text-sm mb-4">
                  {award.company}
                </p>
                <p className="text-muted-foreground">
                  {award.description}
                </p>

                {/* Decorative gradient */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Key Metrics Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 bg-card rounded-2xl p-8 border border-border"
        >
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold gradient-text">250+</div>
              <div className="text-muted-foreground mt-2">Manual Hours Eliminated Annually</div>
            </div>
            <div>
              <div className="text-4xl font-bold gradient-text">20%</div>
              <div className="text-muted-foreground mt-2">Workflow Efficiency Improvement</div>
            </div>
            <div>
              <div className="text-4xl font-bold gradient-text">40%</div>
              <div className="text-muted-foreground mt-2">Traffic Increase (Quokka Labs)</div>
            </div>
            <div>
              <div className="text-4xl font-bold gradient-text">15%</div>
              <div className="text-muted-foreground mt-2">Conversion Rate Lift</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
