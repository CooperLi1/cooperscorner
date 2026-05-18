"use client";

import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";

interface DarkModeToggleProps {
  setDarkMode: (value: boolean) => void;
}

const DarkModeToggle = ({ setDarkMode }: DarkModeToggleProps) => {
  const [darkMode, setDarkModeLocal] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    setDarkMode(darkMode);
  }, [darkMode, setDarkMode]);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkModeLocal(newMode);
    setDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="fixed top-2 right-2 circlebutton"
    >
      {darkMode ? (
        <SunIcon className="w-6 h-6 text-white" />
      ) : (
        <MoonIcon className="w-6 h-6 text-gray-900 dark:text-white" />
      )}
    </button>
  );
};

export default DarkModeToggle;
