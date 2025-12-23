"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [textIndex, setTextIndex] = useState(0);

  const texts = ["Mahadi's", "World"];

  useEffect(() => {
    // Check if user has visited before
    const hasVisited = sessionStorage.getItem("hasVisited");

    if (!hasVisited) {
      // Animate text reveal
      const textTimer = setTimeout(() => {
        if (textIndex < texts.length - 1) {
          setTextIndex(textIndex + 1);
        }
      }, 800);

      // Hide loader after animation
      const loadTimer = setTimeout(() => {
        setIsLoading(false);
        sessionStorage.setItem("hasVisited", "true");
      }, 2800);

      return () => {
        clearTimeout(textTimer);
        clearTimeout(loadTimer);
      };
    } else {
      setTimeout(() => setIsLoading(false), 0);
    }
  }, [textIndex, texts.length]);

  const [particles, setParticles] = useState<
    { left: string; top: string; duration: number; delay: number }[]
  >([]);

  useEffect(() => {
    // Generate particles only on client-side mount
    setTimeout(() => {
      setParticles(
        Array.from({ length: 20 }).map(() => ({
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          duration: 2 + Math.random() * 2,
          delay: Math.random() * 2,
        }))
      );
    }, 0);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 0.9,
            transition: { duration: 0.6, ease: "easeInOut" },
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
        >
          {/* Animated Name Reveal */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-3xl sm:text-5xl md:text-7xl font-bold">
              {texts.map((text, index) => (
                <motion.span
                  key={text}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: index <= textIndex ? 1 : 0,
                    y: index <= textIndex ? 0 : 20,
                  }}
                  transition={{
                    duration: 0.6,
                    ease: "easeOut",
                  }}
                  className="bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
                >
                  {text}
                </motion.span>
              ))}
            </div>

            {/* Loading dots */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.3 }}
              className="flex gap-2"
            >
              {[0, 1, 2].map((dot) => (
                <motion.div
                  key={dot}
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: dot * 0.2,
                  }}
                  className="h-2 w-2 rounded-full bg-primary"
                />
              ))}
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.5 }}
              className="text-sm sm:text-base text-muted-foreground mt-2"
            >
              Welcome to my personal website
            </motion.p>
          </div>

          {/* Background decoration */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            {particles.map((particle, i) => (
              <motion.div
                key={i}
                className="absolute h-1 w-1 rounded-full bg-primary/20"
                style={{
                  left: particle.left,
                  top: particle.top,
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  delay: particle.delay,
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
