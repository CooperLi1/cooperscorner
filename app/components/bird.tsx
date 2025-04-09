"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function FlyingBird() {
  const totalDots = 40;
  const duration = 4.5;
  const birdOffsetY = -50;

  const [dotPositions, setDotPositions] = useState<{ x: number; y: number }[]>([]);
  const [birdPosition, setBirdPosition] = useState<{ x: number; y: number } | null>(null);
  const [birdRotation, setBirdRotation] = useState(35);
  const [animationComplete, setAnimationComplete] = useState(false);

  const getBezierPosition = (t: number) => {
    const x = (1 - t) * (1 - t) * (1 - t) * 0 +
              3 * (1 - t) * (1 - t) * t * 500 +
              3 * (1 - t) * t * t * 1000 +
              t * t * t * 1500;
    
    const loopFactor = Math.sin(t * Math.PI * 2) * 100; // Creates a looping effect
    const y = (1 - t) * (1 - t) * (1 - t) * 300 +
              3 * (1 - t) * (1 - t) * t * 100 +
              3 * (1 - t) * t * t * 400 +
              t * t * t * 250 + loopFactor;
    return { x, y };
  };

  useEffect(() => {
    let startTime = Date.now();
    let prevX = 0;
    let prevY = 300;

    const interval = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);

      const { x, y } = getBezierPosition(progress);
      setBirdPosition({ x, y });

      if (Math.abs(x - prevX) > 1 || Math.abs(y - prevY) > 1) {
        const angle = Math.atan2(y - prevY, x - prevX) * (180 / Math.PI);
        setBirdRotation(angle * 1.8);
        prevX = x;
        prevY = y;
      }

      setDotPositions((prev) => {
        const newTrail = [...prev, { x, y }];
        if (newTrail.length > totalDots) newTrail.shift();
        return newTrail;
      });

      if (progress >= 1) {
        clearInterval(interval);
        setTimeout(() => setAnimationComplete(true), 1000);
      }
    }, (duration * 1000) / totalDots);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-screen h-screen pointer-events-none z-50">
      {/* Dotted Trail */}
      {!animationComplete && (
        <svg className="absolute w-full h-full">
          {dotPositions.map((dot, i) => (
            <motion.circle
              key={i}
              cx={dot.x}
              cy={dot.y}
              r="4"
              fill="black"
              initial={{ opacity: 1 }}
              animate={{ opacity: animationComplete ? 0 : 1 }}
              transition={{ duration: 0.5, ease: "linear" }}
            />
          ))}
        </svg>
      )}

      {/* Bird following path with more tilt */}
      {birdPosition && !animationComplete && (
        <motion.img
          src="/bird.png"
          alt="Flying Bird"
          className="absolute w-24"
          animate={{
            x: birdPosition.x,
            y: birdPosition.y + birdOffsetY,
            rotate: birdRotation,
          }}
          transition={{
            duration: 0.05,
            ease: "linear",
          }}
        />
      )}
    </div>
  );
}