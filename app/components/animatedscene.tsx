
"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function AnimatedScene() {
  const [showRain, setShowRain] = useState(false);

  useEffect(() => {
    const rainTimeout = setTimeout(() => setShowRain(true), 6000); // Start rain after clouds appear
    const stopRainTimeout = setTimeout(() => setShowRain(false), 9000); // Stop rain after a few seconds

    return () => {
      clearTimeout(rainTimeout);
      clearTimeout(stopRainTimeout);
    };
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-sky-400 flex justify-center items-center">
      {/* White Streaks for Sky */}
      <div className="absolute w-full h-full bg-gradient-to-b from-transparent to-white opacity-20" />

      {/* Grass */}
      <motion.img
        src="/grass.jpeg"
        alt="Grass"
        className="absolute bottom-0 w-full"
        initial={{ y: 200 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay: 1 }}
      />

      {/* Mountains */}
      <motion.img
        src="https://cdn.pixabay.com/photo/2016/04/01/10/10/mountains-1294335_960_720.png"
        alt="Mountains"
        className="absolute bottom-10 w-full"
        initial={{ y: 300 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay: 2 }}
      />

      {/* Sun */}
      <motion.img
        src="https://cdn.pixabay.com/photo/2013/07/13/12/47/sun-160962_960_720.png"
        alt="Sun"
        className="absolute top-10 right-20 w-32"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
        transition={{ duration: 1, delay: 3, repeat: Infinity, repeatType: "reverse" }}
      />

      {/* Clouds */}
      <motion.img
        src="https://cdn.pixabay.com/photo/2014/04/03/10/01/cloud-309622_960_720.png"
        alt="Clouds"
        className="absolute top-20 w-80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 4 }}
      />

      {/* Rain */}
      {showRain && (
        <motion.div
          className="absolute top-40 w-full h-full pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-blue-500 w-1 h-8 opacity-50"
              style={{ left: `${Math.random() * 100}%`, top: "0%" }}
              animate={{ y: "100vh", opacity: 0 }}
              transition={{ duration: 1, delay: Math.random() * 2, repeat: Infinity }}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}
