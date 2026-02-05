"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

interface Feature {
  id: string;
  name: string;
  impact: "high" | "medium" | "low";
  effort: "high" | "medium" | "low";
  description: string;
  icon: string;
  cost: number;
}

const initialFeatures: Feature[] = [
  { id: "auth", name: "User Authentication", impact: "high", effort: "medium", description: "Secure login & signup", icon: "🔐", cost: 2 },
  { id: "dashboard", name: "Analytics Dashboard", impact: "high", effort: "high", description: "Real-time metrics view", icon: "📊", cost: 4 },
  { id: "notifications", name: "Push Notifications", impact: "medium", effort: "low", description: "User engagement alerts", icon: "🔔", cost: 1 },
  { id: "darkmode", name: "Dark Mode", impact: "low", effort: "low", description: "Theme customization", icon: "🌙", cost: 1 },
  { id: "search", name: "Search Function", impact: "high", effort: "medium", description: "Find content quickly", icon: "🔍", cost: 2 },
  { id: "export", name: "Data Export", impact: "medium", effort: "medium", description: "Download user data", icon: "📤", cost: 2 },
  { id: "social", name: "Social Sharing", impact: "medium", effort: "low", description: "Share to social media", icon: "📱", cost: 1 },
  { id: "ai", name: "AI Recommendations", impact: "high", effort: "high", description: "Smart suggestions", icon: "🤖", cost: 4 },
];

const TOTAL_BUDGET = 10;

export default function ProductGame() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [backlog, setBacklog] = useState<Feature[]>(initialFeatures);
  const [mvp, setMvp] = useState<Feature[]>([]);
  const [showResult, setShowResult] = useState(false);

  const usedBudget = mvp.reduce((sum, f) => sum + f.cost, 0);
  const remainingBudget = TOTAL_BUDGET - usedBudget;

  const addToMvp = (feature: Feature) => {
    if (feature.cost <= remainingBudget) {
      setMvp(prev => [...prev, feature]);
      setBacklog(prev => prev.filter(f => f.id !== feature.id));
    }
  };

  const removeFromMvp = (feature: Feature) => {
    setMvp(prev => prev.filter(f => f.id !== feature.id));
    setBacklog(prev => [...prev, feature]);
  };

  const resetGame = () => {
    setBacklog(initialFeatures);
    setMvp([]);
    setShowResult(false);
  };

  const calculateScore = () => {
    let score = 0;
    mvp.forEach(f => {
      const impactScore = f.impact === "high" ? 3 : f.impact === "medium" ? 2 : 1;
      const efficiencyBonus = f.effort === "low" ? 1.5 : f.effort === "medium" ? 1 : 0.7;
      score += impactScore * efficiencyBonus;
    });
    return Math.round(score * 10);
  };

  const getGrade = () => {
    const score = calculateScore();
    const highImpactCount = mvp.filter(f => f.impact === "high").length;

    if (score >= 70 && highImpactCount >= 2) return { grade: "A+", emoji: "🏆", title: "PM Superstar!", message: "You prioritized high-impact features efficiently!" };
    if (score >= 50) return { grade: "B+", emoji: "🌟", title: "Strong Product Sense!", message: "Good balance of impact and effort." };
    if (score >= 30) return { grade: "C+", emoji: "💪", title: "Getting There!", message: "Focus more on high-impact, low-effort wins." };
    return { grade: "D", emoji: "📈", title: "Keep Practicing!", message: "Prioritize impact over features." };
  };

  const getImpactColor = (impact: string) => {
    if (impact === "high") return "bg-green-500/20 text-green-500";
    if (impact === "medium") return "bg-yellow-500/20 text-yellow-500";
    return "bg-red-500/20 text-red-500";
  };

  const getEffortColor = (effort: string) => {
    if (effort === "low") return "bg-green-500/20 text-green-500";
    if (effort === "medium") return "bg-yellow-500/20 text-yellow-500";
    return "bg-red-500/20 text-red-500";
  };

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="max-w-5xl mx-auto px-6 relative" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-10"
        >
          <span className="text-primary font-semibold tracking-wider uppercase text-sm">
            Interactive Game
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4">
            Build Your <span className="gradient-text">MVP</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            You have <strong>{TOTAL_BUDGET} points</strong> to spend. Pick features wisely - balance impact vs effort like a real PM!
          </p>
        </motion.div>

        {/* Budget Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="max-w-md mx-auto mb-8"
        >
          <div className="flex justify-between text-sm mb-2">
            <span>Budget</span>
            <span className={remainingBudget <= 2 ? "text-red-500 font-bold" : ""}>
              {usedBudget} / {TOTAL_BUDGET} used
            </span>
          </div>
          <div className="h-4 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full gradient-bg"
              animate={{ width: `${(usedBudget / TOTAL_BUDGET) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1 text-center">
            {remainingBudget} points remaining
          </p>
        </motion.div>

        {/* Game Area */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
          {/* Backlog */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              📦 Feature Backlog
              <span className="text-xs text-muted-foreground">({backlog.length} items)</span>
            </h3>
            <div className="space-y-2 min-h-[200px] sm:min-h-[320px]">
              <AnimatePresence mode="popLayout">
                {backlog.map((feature) => {
                  const canAfford = feature.cost <= remainingBudget;
                  return (
                    <motion.div
                      key={feature.id}
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                      whileHover={canAfford ? { scale: 1.02 } : {}}
                      whileTap={canAfford ? { scale: 0.98 } : {}}
                      onClick={() => canAfford && addToMvp(feature)}
                      className={`p-4 rounded-xl border bg-card transition-all ${
                        canAfford
                          ? "cursor-pointer border-border hover:border-primary hover:shadow-md"
                          : "opacity-40 cursor-not-allowed border-border/50"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{feature.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h4 className="font-medium text-sm truncate">{feature.name}</h4>
                            <span className="text-xs font-bold text-primary whitespace-nowrap">{feature.cost} pts</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">{feature.description}</p>
                          <div className="flex gap-2 mt-2">
                            <span className={`text-[10px] px-2 py-0.5 rounded-full ${getImpactColor(feature.impact)}`}>
                              Impact: {feature.impact}
                            </span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full ${getEffortColor(feature.effort)}`}>
                              Effort: {feature.effort}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
              {backlog.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  All features added to MVP!
                </div>
              )}
            </div>
          </motion.div>

          {/* MVP */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              🚀 Your MVP
              <span className="text-xs text-muted-foreground">({mvp.length} features)</span>
            </h3>
            <div className="min-h-[200px] sm:min-h-[320px] p-3 sm:p-4 rounded-xl border-2 border-dashed border-primary/30 bg-primary/5">
              <AnimatePresence mode="popLayout">
                {mvp.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-full flex flex-col items-center justify-center text-muted-foreground py-12"
                  >
                    <span className="text-4xl mb-2">🎯</span>
                    <p className="text-sm">Click features to add them here</p>
                  </motion.div>
                ) : (
                  <div className="space-y-2">
                    {mvp.map((feature) => (
                      <motion.div
                        key={feature.id}
                        layout
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => removeFromMvp(feature)}
                        className="p-3 rounded-xl border border-primary/30 bg-card cursor-pointer hover:border-red-500 hover:bg-red-500/5 transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{feature.icon}</span>
                          <span className="font-medium text-sm flex-1">{feature.name}</span>
                          <span className="text-xs text-muted-foreground group-hover:text-red-500">
                            ✕
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-4">
              <motion.button
                onClick={resetGame}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 py-3 rounded-xl bg-secondary hover:bg-accent transition-colors font-medium"
              >
                Reset
              </motion.button>
              <motion.button
                onClick={() => mvp.length > 0 && setShowResult(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={mvp.length === 0}
                className="flex-1 py-3 rounded-xl gradient-bg text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Ship MVP! 🚀
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Result Modal */}
        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowResult(false)}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-card rounded-2xl p-8 max-w-md w-full border border-border shadow-2xl"
              >
                <div className="text-center">
                  <div className="text-6xl mb-4">{getGrade().emoji}</div>
                  <h3 className="text-2xl font-bold mb-2">{getGrade().title}</h3>
                  <div className="text-5xl font-bold gradient-text mb-2">{calculateScore()} pts</div>
                  <div className="text-xl font-semibold text-primary mb-4">Grade: {getGrade().grade}</div>
                  <p className="text-muted-foreground mb-6">{getGrade().message}</p>

                  <div className="bg-secondary/50 rounded-xl p-4 mb-6 text-left">
                    <p className="text-sm font-medium mb-2">Your MVP ({mvp.length} features):</p>
                    <div className="flex flex-wrap gap-2">
                      {mvp.map(f => (
                        <span key={f.id} className="text-xs bg-card px-2 py-1 rounded-full">
                          {f.icon} {f.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  <motion.button
                    onClick={resetGame}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 rounded-xl gradient-bg text-white font-semibold"
                  >
                    Play Again
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
