"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const projects = [
  {
    id: 1,
    title: "SAP HR Enterprise Platform",
    category: "Product Management",
    description: "Owned the end-to-end product lifecycle for SAP HR enhancements at Accenture, translating customer needs and stakeholder inputs into prioritized backlogs, user stories, acceptance criteria, and release plans.",
    tags: ["SAP SuccessFactors", "Enterprise HR", "Azure", "Agile"],
    color: "from-violet-500 to-purple-500",
    metrics: [
      { label: "Hours Saved", value: "250+" },
      { label: "Efficiency", value: "+20%" },
    ],
    fullDetails: {
      overview: "Led the product management for SAP SuccessFactors Employee Central enhancements, serving as the bridge between business stakeholders and technical teams to deliver impactful HR automation solutions for enterprise clients.",
      challenge: "The existing HR processes were manual and time-consuming, leading to inefficiencies in employee data management, payroll processing, and compliance tracking across multiple regions.",
      solution: "Developed a comprehensive product roadmap focusing on automation of repetitive HR tasks, integration with Azure cloud services, and implementation of self-service portals for employees.",
      keyDeliverables: [
        "Created and maintained product backlog with 100+ user stories",
        "Defined acceptance criteria and release plans for quarterly sprints",
        "Led sprint planning, daily stand-ups, and retrospectives",
        "Collaborated with 3 development teams across time zones",
        "Implemented automated testing frameworks reducing QA time by 35%"
      ],
      impact: [
        "Automated 250+ hours of manual HR processes monthly",
        "Achieved 20% improvement in overall operational efficiency",
        "Reduced employee onboarding time from 5 days to 2 days",
        "Enabled real-time compliance tracking across 12 regions"
      ],
      tools: ["SAP SuccessFactors", "Azure DevOps", "Jira", "Confluence", "Power BI", "SQL Server"]
    }
  },
  {
    id: 2,
    title: "GredMind AI: Smart Energy Platform",
    category: "Product Strategy",
    description: "Defined product vision, use cases, and MVP scope by conducting user research, competitive analysis, and end-to-end workflow mapping to guide feature priorities for an AI-powered energy management solution.",
    tags: ["AI/ML", "User Research", "MVP Definition", "Energy Tech"],
    color: "from-blue-500 to-cyan-500",
    metrics: [
      { label: "Research", value: "User-Led" },
      { label: "Approach", value: "AI-First" },
    ],
    fullDetails: {
      overview: "Spearheaded product strategy for an AI-powered energy management platform designed to help commercial buildings optimize energy consumption and reduce carbon footprint through predictive analytics.",
      challenge: "Commercial buildings account for 40% of energy consumption but lack intelligent tools to predict usage patterns, identify inefficiencies, and automate energy-saving measures in real-time.",
      solution: "Designed an AI-first platform that leverages machine learning models to analyze historical consumption data, weather patterns, and occupancy trends to provide actionable recommendations.",
      keyDeliverables: [
        "Conducted 25+ user interviews with facility managers and sustainability officers",
        "Created comprehensive competitive analysis covering 15 market players",
        "Developed user personas and journey maps for 4 key user segments",
        "Defined MVP scope with prioritized feature list and success metrics",
        "Designed wireframes and interactive prototypes for key workflows"
      ],
      impact: [
        "Validated product-market fit through user research",
        "Identified $2.5B addressable market opportunity",
        "Reduced MVP scope by 40% while maintaining core value proposition",
        "Established partnerships with 3 pilot customers"
      ],
      tools: ["Figma", "Miro", "UserTesting", "Notion", "Google Analytics", "Amplitude"]
    }
  },
  {
    id: 3,
    title: "HomeTouch Meals Platform",
    category: "Product Strategy",
    description: "Driving product definition and strategy by creating MRDs, PRDs, and end-to-end workflows with cross-functional stakeholders to define MVP requirements and long-term roadmap priorities.",
    tags: ["PRD/MRD", "Journey Mapping", "Prototyping", "Food Tech"],
    color: "from-pink-500 to-rose-500",
    metrics: [
      { label: "Docs", value: "MRD/PRD" },
      { label: "Focus", value: "UX-Led" },
    ],
    fullDetails: {
      overview: "Leading product strategy for a home-cooked meal delivery platform connecting home chefs with customers seeking authentic, homemade meals in their local area.",
      challenge: "The food delivery market is saturated with restaurant options, but there's an underserved segment of customers who crave authentic home-cooked meals and want to support local home chefs.",
      solution: "Created a two-sided marketplace platform that enables home chefs to list their specialties and customers to discover, order, and enjoy authentic homemade meals with transparent sourcing.",
      keyDeliverables: [
        "Authored comprehensive MRD outlining market opportunity and business case",
        "Created detailed PRD with 50+ feature specifications",
        "Mapped end-to-end customer and chef journeys with 30+ touchpoints",
        "Designed high-fidelity prototypes for mobile app (iOS/Android)",
        "Defined KPIs and success metrics for launch and growth phases"
      ],
      impact: [
        "Secured stakeholder alignment across engineering, design, and business teams",
        "Prioritized features resulting in focused 8-week MVP timeline",
        "Identified key differentiators through competitive analysis",
        "Established quality and safety standards for home chef onboarding"
      ],
      tools: ["Figma", "Notion", "Jira", "Miro", "Mixpanel", "Hotjar"]
    }
  },
  {
    id: 4,
    title: "Website Redesign & Analytics",
    category: "Product Analytics",
    description: "Led core website UI/UX redesign and analytics implementation at Quokka Labs, collaborating with engineering, product, and security stakeholders to translate user behavior insights into prioritized feature enhancements.",
    tags: ["A/B Testing", "Analytics", "UI/UX", "Conversion"],
    color: "from-amber-500 to-orange-500",
    metrics: [
      { label: "Traffic", value: "+40%" },
      { label: "Conversion", value: "+15%" },
    ],
    fullDetails: {
      overview: "Led a comprehensive website redesign initiative focused on improving user experience, increasing organic traffic, and optimizing conversion funnels through data-driven decisions.",
      challenge: "The existing website had high bounce rates (65%), poor mobile experience, and lacked proper analytics infrastructure to understand user behavior and optimize conversions.",
      solution: "Implemented a complete redesign with responsive design principles, integrated comprehensive analytics tracking, and established a culture of A/B testing for continuous improvement.",
      keyDeliverables: [
        "Set up Google Analytics 4 with custom event tracking",
        "Created comprehensive analytics dashboard for stakeholders",
        "Designed and executed 12 A/B tests across key landing pages",
        "Led UX research including heatmap analysis and session recordings",
        "Collaborated with SEO team to improve site structure and performance"
      ],
      impact: [
        "Increased organic traffic by 40% within 3 months",
        "Improved conversion rate by 15% through optimized CTAs",
        "Reduced bounce rate from 65% to 42%",
        "Decreased page load time by 60% through performance optimization"
      ],
      tools: ["Google Analytics", "Hotjar", "Optimizely", "Figma", "Google Tag Manager", "SEMrush"]
    }
  },
];

const categories = ["All", "Product Management", "Product Strategy", "Product Analytics"];

type Project = typeof projects[0];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-16 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold tracking-wider uppercase text-sm">
            Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 mb-4 sm:mb-6">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A selection of projects showcasing my approach to product management,
            data-driven decision making, and cross-functional collaboration.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                activeCategory === category
                  ? "gradient-bg text-white"
                  : "bg-secondary hover:bg-accent"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.08 }}
              className="group relative cursor-pointer"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
                {/* Gradient Header - Compact */}
                <div className={`h-32 bg-gradient-to-br ${project.color} relative overflow-hidden`}>
                  {/* Animated background pattern */}
                  <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-2 left-2 w-16 h-16 border border-white/30 rounded-full" />
                    <div className="absolute bottom-2 right-2 w-12 h-12 border border-white/20 rounded-full" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 border border-white/10 rounded-full" />
                  </div>

                  {/* Hover overlay */}
                  <motion.div
                    className="absolute inset-0 bg-black/40 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{
                        scale: hoveredProject === project.id ? 1 : 0.8,
                        opacity: hoveredProject === project.id ? 1 : 0,
                      }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-2 px-4 py-2 bg-white rounded-full text-black text-sm font-semibold"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      View
                    </motion.div>
                  </motion.div>

                  {/* Category badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-md text-white text-xs font-medium">
                      {project.category.split(' ')[1] || project.category}
                    </span>
                  </div>

                  {/* Key metric */}
                  <div className="absolute bottom-3 right-3">
                    <div className="px-2 py-1 bg-white/90 rounded-md text-xs font-bold text-gray-800">
                      {project.metrics[0].value}
                    </div>
                  </div>
                </div>

                {/* Project Content - Compact */}
                <div className="p-4">
                  <h3 className="text-sm font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                    {project.title}
                  </h3>

                  <p className="text-muted-foreground text-xs mb-3 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tags - Show only 2 */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-secondary rounded-md text-[10px] font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 2 && (
                      <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-md text-[10px] font-medium">
                        +{project.tags.length - 2}
                      </span>
                    )}
                  </div>

                  {/* Bottom action hint */}
                  <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      {project.metrics[1]?.value || 'View Details'}
                    </div>
                    <motion.div
                      className="text-primary"
                      animate={{ x: hoveredProject === project.id ? 4 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative bg-card rounded-t-3xl sm:rounded-3xl max-w-4xl w-full max-h-[85vh] sm:max-h-[90vh] overflow-hidden border border-border shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header with gradient */}
              <div className={`h-32 bg-gradient-to-br ${selectedProject.color} relative`}>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="absolute bottom-4 left-4 sm:left-6 flex gap-2 flex-wrap">
                  {selectedProject.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 text-white text-sm"
                    >
                      <span className="font-bold">{metric.value}</span>
                      <span className="opacity-80 ml-1">{metric.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-8 overflow-y-auto max-h-[calc(85vh-8rem)] sm:max-h-[calc(90vh-8rem)]">
                <span className="text-sm text-primary font-medium">{selectedProject.category}</span>
                <h3 className="text-xl sm:text-3xl font-bold mt-2 mb-4">{selectedProject.title}</h3>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-secondary rounded-full text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Overview */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-2">Overview</h4>
                  <p className="text-muted-foreground">{selectedProject.fullDetails.overview}</p>
                </div>

                {/* Challenge & Solution */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-secondary/50 rounded-xl p-5">
                    <h4 className="text-lg font-semibold mb-2 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                        <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </span>
                      Challenge
                    </h4>
                    <p className="text-muted-foreground text-sm">{selectedProject.fullDetails.challenge}</p>
                  </div>
                  <div className="bg-secondary/50 rounded-xl p-5">
                    <h4 className="text-lg font-semibold mb-2 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                        <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </span>
                      Solution
                    </h4>
                    <p className="text-muted-foreground text-sm">{selectedProject.fullDetails.solution}</p>
                  </div>
                </div>

                {/* Key Deliverables */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-3">Key Deliverables</h4>
                  <ul className="space-y-2">
                    {selectedProject.fullDetails.keyDeliverables.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-muted-foreground">
                        <span className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-3 h-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Impact */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-3">Impact & Results</h4>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {selectedProject.fullDetails.impact.map((item, i) => (
                      <div key={i} className="bg-primary/10 rounded-lg p-4 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                          </svg>
                        </span>
                        <span className="text-sm font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tools Used */}
                <div>
                  <h4 className="text-lg font-semibold mb-3">Tools & Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.fullDetails.tools.map((tool) => (
                      <span
                        key={tool}
                        className="px-4 py-2 bg-secondary rounded-lg text-sm font-medium"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
