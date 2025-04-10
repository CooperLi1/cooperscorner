"use client";

import { motion } from "framer-motion";
import { IoMdHand } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { FaGithub, FaLinkedin, FaEnvelope, FaFileDownload } from "react-icons/fa"; // Importing file icon

export default function Portfolio() {
  return (
    <div className="relative min-h-screen bg-gray-900 text-white px-6 md:px-16 lg:px-32">
      {/* Background Images */}
      <div
        className="absolute top-0 left-0 w-full h-screen"
        style={{
          backgroundImage: "url('/bg1.png')",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      />
      <div
        className="absolute top-[100vh] left-0 w-full h-screen"
        style={{
          backgroundImage: "url('/bg2.png')",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      />
      <div
        className="absolute top-[200vh] left-0 w-full h-screen"
        style={{
          backgroundImage: "url('/bg3.png')",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      />
      <div
        className="absolute top-[300vh] left-0 w-full h-screen"
        style={{
          backgroundImage: "url('/bg4.png')",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      />
      <div
        className="absolute top-[400vh] left-0 w-full h-screen"
        style={{
          backgroundImage: "url('/bg5.png')",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      />
      {/* Content Sections */}
      <div className='relative z-1'>
        <HeroSection />
        <AboutSection />
        <ContactSection />
        <ProjectsSection />
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -50 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 1 }}
      className="flex flex-col items-center justify-center h-screen text-center"
    >
      <h1 className="text-5xl md:text-7xl font-bold flex items-center gap-2 animate-pulse">
        Welcome to My Corner! 
        <motion.div 
          animate={{ rotate: [0, 20, 0, -20, 0] }} 
          transition={{ repeat: Infinity, duration: 1.2 }}
        >
          <IoMdHand className="text-yellow-400 text-11xl" />
        </motion.div>
      </h1>
      <motion.div 
        animate={{ y: [0, 10, 0] }} 
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="mt-10 flex items-center gap-2"
      >
        <IoIosArrowDown className="text-4xl text-gray-400" />
        <span className="text-lg text-gray-400">Scroll Down</span>
      </motion.div>
    </motion.div>
  );
}

function AboutSection() {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -100 }} 
      whileInView={{ opacity: 1, x: 0 }} 
      transition={{ duration: 1 }}
      className="py-20"
    >
      <h2 className="text-4xl text-center font-bold mb-6">About Me</h2>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="flex items-center gap-6 border-b-4 border-gray-700 pb-6 mb-6">
          <img 
            src="/cooper1.png" 
            alt="My Picture" 
            className="w-40 h-40 rounded-full object-cover border-4 border-gray-700 shadow-lg" 
          />
          <div>
            <p className="text-gray-400 text-lg">
              Hey, I'm Cooper! I am a student at Montgomery Blair High School always eager to learn more about robotics, debate, AI, and climate change. My goal is to one day become a "full-stack" maker, experienced in everything from manufacturing to web dev to CAD.
              <span className="text-yellow-300"> I love trying new things and building new projects. Reach out!</span>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ContactSection() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 100 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 1 }}
      className="py-20"
    >
      <h2 className="text-4xl font-bold mb-6 text-center">Contact/Resume</h2>
      <div>
        <motion.div 
          animate={{ scale: [1, 1.1, 1] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex justify-center"
        >
          <div className="flex gap-10 justify-center items-center p-6 border-4 border-gray-700 rounded-full hover:bg-gray-800 transition duration-300">
            <a 
              href="mailto:copperli1234@gmail.com" 
              className="text-3xl text-gray-400 hover:text-yellow-400 transition duration-300"
            >
              <FaEnvelope />
            </a>
            <a 
              href="https://github.com/CooperLi1" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-3xl text-gray-400 hover:text-yellow-400 transition duration-300"
            >
              <FaGithub />
            </a>
            <a 
              href="https://www.linkedin.com/in/cooper-li-483672341" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-3xl text-gray-400 hover:text-yellow-400 transition duration-300"
            >
              <FaLinkedin />
            </a>
            <a 
              href="https://drive.google.com/file/d/1xJ2eMiS8GXGEpoGaKvoetEYNhwGyPBSp/view?usp=sharing" 
              download
              className="text-3xl text-gray-400 hover:text-yellow-400 transition duration-300"
            >
              <FaFileDownload />
            </a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function ProjectsSection() {
  const projects = [
    {
      title: "📌 Wartortle | 2024-2025", 
      description: "Telescoping arm robot with 2-stage hang for FIRST Tech Challenge Into the Deep Season. Peaked 6th OPR worldwide, 1st OPR Chesapeake, finals at Chesapeake states.",
      image: "/wartortle.png",
      link: "/projects/wartortle" 
    }, 
    { 
      title: "📌 InvestorBriefs | 2025", 
      description: "Website providing real-time stock insights using AI. Built with NextJS.",
      image: "/investorbriefs.png",
      link: "https://investorbriefs.vercel.app" 
    },
    {
      title: "📌 Nash | 2023-2024", 
      description: "Dual Extension differential arm robot for FIRST Tech Challenge Centerstage Season. Top 4 winner at FIRST world championship and Chesapeake state champion.",
      image: "/nash.png",
      link: "/projects/nash" 
    }, 
    { 
      title: "Homemade CNC Machine | 2024-Now", 
      description: "Custom designed machine to cut wood/aluminum.", 
      image: "/cncpic.png",
      link: "/projects/cnc" 
    },
    {
      title: "Polyformer | 2024-2025", 
      description: "Recyling water-bottles into 3D Printer filament.",
      image: "/polyformerpic.png",
      link: "/projects/polyformer" 
    }, 
    {
      title: "Rechargable Flashlight | 2024", 
      description: "Flashlight with 3 recharging mechanisms: ripcord, barreljack, battery.",
      image: "/flashlightexternal.png",
      link: "/projects/flashlight" 
    }, 
    {
      title: "ESP32 Breakout Board | 2024", 
      description: "Compact PCB custom designed in Altium for JHU APL Internship",
      image: "/board.png",
      link: "/projects/esp32" 
    }, 
    {
      title: "Diffy | 2023", 
      description: "Differential drive pod built as a gift to my friend.",
      image: "/diffy.jpg",
      link: "/projects/diffy" 
    }, 
    {
      title: "Nutmeg | 2022-2023", 
      description: "Turret crane robot for FIRST Tech Challenge Powerplay Season. Alabama state champion.",
      image: "/nutmeg.png",
      link: "/projects/nutmeg" 
    }, 
    {
      title: "Macadamia | 2021-2022", 
      description: "Suspension robot for FIRST Tech Challenge Freight Frenzy Season. World championship division semifinalist, Chesapeake state champion.",
      image: "/mac.png",
      link: "/projects/mac" 
    }, 
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 100 }} 
      whileInView={{ opacity: 1, x: 0 }} 
      transition={{ duration: 1 }}
      className="py-20"
    >
      <h2 className="text-4xl font-bold mb-6 text-center">Projects</h2>
      <div className="space-y-6 divide-y divide-gray-700">
        {projects.map((project, index) => (
          <motion.a 
            key={index}
            href={project.link} // Link to the project
            target="_blank" // Opens in a new tab
            whileHover={{ scale: 1.05 }}
            className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-start gap-6"
          >
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-40 h-40 object-cover rounded-lg mb-4 md:mb-0"
            />
            <div>
              <h3 className="text-2xl font-semibold">{project.title}</h3>
              <p className="text-gray-400 mt-2">{project.description}</p>
            </div>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}
