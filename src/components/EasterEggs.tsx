"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Konami Code: up up down down left right left right b a
const KONAMI_CODE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "KeyB", "KeyA"
];

const funFacts = [
  "I once analyzed 10,000+ data points to find a single bug!",
  "My first product shipped to 50,000 users on day one",
  "I can explain any feature in exactly 3 bullet points",
  "Coffee consumed during product launches: countless cups",
  "I've written PRDs longer than some novels",
  "My favorite framework? The one that solves the problem!",
];

// Confetti particle
interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  rotation: number;
  scale: number;
}

export default function EasterEggs() {
  const [konamiIndex, setKonamiIndex] = useState(0);
  const [showSecret, setShowSecret] = useState(false);
  const [currentFact, setCurrentFact] = useState(0);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [clickCount, setClickCount] = useState(0);
  const [showAchievement, setShowAchievement] = useState(false);
  const [cursorTrail, setCursorTrail] = useState<{ x: number; y: number; id: number }[]>([]);

  // Konami code detection
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === KONAMI_CODE[konamiIndex]) {
        if (konamiIndex === KONAMI_CODE.length - 1) {
          // Code complete!
          setShowSecret(true);
          triggerConfetti();
          setKonamiIndex(0);
        } else {
          setKonamiIndex(konamiIndex + 1);
        }
      } else {
        setKonamiIndex(0);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [konamiIndex]);

  // Cursor trail effect (subtle)
  useEffect(() => {
    let trailId = 0;
    const handleMouseMove = (e: MouseEvent) => {
      if (Math.random() > 0.92) { // Only occasionally add trail
        trailId++;
        setCursorTrail(prev => [...prev.slice(-5), { x: e.clientX, y: e.clientY, id: trailId }]);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Remove old trail particles
  useEffect(() => {
    if (cursorTrail.length > 0) {
      const timer = setTimeout(() => {
        setCursorTrail(prev => prev.slice(1));
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [cursorTrail]);

  // Logo click counter for achievement
  const handleLogoClick = useCallback(() => {
    setClickCount(prev => {
      const newCount = prev + 1;
      if (newCount === 7) {
        setShowAchievement(true);
        triggerConfetti();
        setTimeout(() => setShowAchievement(false), 4000);
      }
      return newCount;
    });
  }, []);

  // Expose logo click handler globally
  useEffect(() => {
    (window as unknown as { handleLogoEasterEgg: () => void }).handleLogoEasterEgg = handleLogoClick;
  }, [handleLogoClick]);

  const triggerConfetti = () => {
    const colors = ["#6366f1", "#ec4899", "#8b5cf6", "#f43f5e", "#10b981", "#f59e0b"];
    const newParticles: Particle[] = [];

    for (let i = 0; i < 50; i++) {
      newParticles.push({
        id: Date.now() + i,
        x: Math.random() * window.innerWidth,
        y: -20,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        scale: 0.5 + Math.random() * 0.5,
      });
    }

    setParticles(newParticles);
    setTimeout(() => setParticles([]), 3000);
  };

  const nextFact = () => {
    setCurrentFact((prev) => (prev + 1) % funFacts.length);
  };

  return (
    <>
      {/* Cursor trail */}
      <AnimatePresence>
        {cursorTrail.map((point) => (
          <motion.div
            key={point.id}
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale: 0, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed pointer-events-none z-[9999] w-3 h-3 rounded-full gradient-bg"
            style={{ left: point.x - 6, top: point.y - 6 }}
          />
        ))}
      </AnimatePresence>

      {/* Confetti */}
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{
              x: particle.x,
              y: particle.y,
              rotate: 0,
              scale: particle.scale
            }}
            animate={{
              y: window.innerHeight + 100,
              rotate: particle.rotation + 720,
              x: particle.x + (Math.random() - 0.5) * 200
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 + Math.random(), ease: "easeIn" }}
            className="fixed pointer-events-none z-[9998] w-3 h-3"
            style={{ backgroundColor: particle.color, borderRadius: Math.random() > 0.5 ? "50%" : "0" }}
          />
        ))}
      </AnimatePresence>

      {/* Secret Modal (Konami Code) */}
      <AnimatePresence>
        {showSecret && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setShowSecret(false)}
          >
            <motion.div
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.5, rotate: 10 }}
              transition={{ type: "spring", damping: 15 }}
              className="bg-card rounded-3xl p-8 max-w-md w-full border border-primary shadow-2xl shadow-primary/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="text-6xl mb-4"
                >
                  🎮
                </motion.div>
                <h3 className="text-2xl font-bold gradient-text mb-2">You Found a Secret!</h3>
                <p className="text-muted-foreground mb-6">
                  Impressive! You know the Konami Code. Here&apos;s a fun fact about me:
                </p>
                <motion.div
                  key={currentFact}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-primary/10 rounded-xl p-4 mb-6"
                >
                  <p className="text-lg font-medium">&quot;{funFacts[currentFact]}&quot;</p>
                </motion.div>
                <div className="flex gap-3 justify-center">
                  <motion.button
                    onClick={nextFact}
                    className="px-6 py-2 rounded-full bg-secondary hover:bg-accent transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Another Fact
                  </motion.button>
                  <motion.button
                    onClick={() => setShowSecret(false)}
                    className="px-6 py-2 rounded-full gradient-bg text-white"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Cool!
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Achievement Toast */}
      <AnimatePresence>
        {showAchievement && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed top-24 right-6 z-[10000] bg-card rounded-2xl p-4 border border-primary shadow-xl shadow-primary/20 flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center text-2xl">
              🏆
            </div>
            <div>
              <p className="font-bold text-sm">Achievement Unlocked!</p>
              <p className="text-xs text-muted-foreground">Persistent Clicker - You&apos;re curious!</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hint (shows briefly on page load) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: [0, 1, 1, 0], y: [20, 0, 0, -10] }}
        transition={{ duration: 4, times: [0, 0.1, 0.9, 1], delay: 3 }}
        className="fixed bottom-6 left-6 z-50 text-xs text-muted-foreground bg-card/80 backdrop-blur-sm px-3 py-2 rounded-full border border-border"
      >
        💡 Tip: Try the Konami Code...
      </motion.div>
    </>
  );
}
