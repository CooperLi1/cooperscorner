"use client";

import { motion } from "framer-motion";
import { IoMdHand } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { FaGithub, FaLinkedin, FaEnvelope, FaFileDownload } from "react-icons/fa";

export default function Portfolio() {
  return (
    <div className="relative min-h-screen bg-gray-900 text-white px-4 md:px-8 lg:px-16 overflow-hidden">
      <div className="relative flex flex-col lg:flex-row h-screen">
        <div className="w-full lg:w-1/2 lg:pr-8 overflow-y-auto">
          <HeroSection />
          <AboutSection />
          <ContactSection />
        </div>

        <div
          className="ml-4 w-full lg:w-1/2 lg:pl-8 overflow-y-auto bg-gray-800 rounded-xl mt-14 mb-12 p-3"
          style={{ height: "calc(100vh - 6rem)" }}
        >
            <ProjectsSection />
        </div>
      </div>
    </div>
  );
}


// HeroSection.tsx
function HeroSection() {
    return (
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col justify-center text-left space-y-4"
      >
        <h1 className="text-4xl mt-16 md:text-5xl font-bold flex items-center gap-2">
          hi, i'm cooper!
          <motion.div
            animate={{ rotate: [0, 15, 0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
          >
            <IoMdHand className="text-yellow-400 text-4xl" />
          </motion.div>
        </h1>
      </motion.div>
    );
  }
  
  // AboutSection.tsx
  function AboutSection() {
    return (
      <motion.section
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="py-12"
      >
        <div className="bg-gray-800 p-4 rounded-lg shadow-md flex gap-4">
          <img
            src="/cooper1.png"
            alt="Profile"
            className="h-40 rounded-full object-cover border-2 border-gray-700"
          />
          <p className="text-gray-300 text-md leading-relaxed">
          student at montgomery blair high school always eager to learn more about robotics, debate, ai, and climate change. my goal is to one day become a "full-stack" maker, experienced in everything from manufacturing to web dev to cad.
          <span className="text-yellow-300"> i love trying new things and building new projects. reach out!</span>
          </p>
        </div>
      </motion.section>
    );
  }
  
  // ContactSection.tsx
  function ContactSection() {
    return (
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className=""
      >
        <h2 className="text-2xl font-semibold mb-6">Contact & Resume</h2>
        <div className="space-y-4 bg-gray-800 rounded-lg p-6">
          <a
            href="mailto:copperli1234@gmail.com"
            className="flex items-center gap-4 text-gray-400 hover:text-yellow-400 text-lg"
          >
            <FaEnvelope className="text-2xl" />
            <span>email</span>
          </a>
          <a
            href="https://github.com/CooperLi1"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 text-gray-400 hover:text-yellow-400 text-lg"
          >
            <FaGithub className="text-2xl" />
            <span>github</span>
          </a>
          <a
            href="https://www.linkedin.com/in/cooper-li-483672341"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 text-gray-400 hover:text-yellow-400 text-lg"
          >
            <FaLinkedin className="text-2xl" />
            <span>linkedin</span>
          </a>
          <a
            href="https://drive.google.com/file/d/1xJ2eMiS8GXGEpoGaKvoetEYNhwGyPBSp/view?usp=sharing"
            download
            className="flex items-center gap-4 text-gray-400 hover:text-yellow-400 text-lg"
          >
            <FaFileDownload className="text-2xl" />
            <span>resume</span>
          </a>
        </div>
      </motion.section>
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
      image: "/investorbriefs1.png",
      link: "https://investorbriefs.vercel.app" 
    },
    {
      title: "📌 Nash | 2023-2024", 
      description: "Dual Extension differential arm robot for FIRST Tech Challenge Centerstage Season. Top 4 winner at FIRST world championship and Chesapeake state champion.",
      image: "/nash.png",
      link: "/projects/nash" 
    }, 
    { 
      title: "Debatify | 2025-Now", 
      description: "Debate search engine built with NextJS, Supabase, and Stripe. In Progress.", 
      image: "/debatify.png",
      link: "https://debat-ify.vercel.app" 
    },
    { 
      title: "Homemade CNC Machine | 2024-Now", 
      description: "Custom designed machine to cut wood/aluminum. In Progress.", 
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
      title: "Backbrace | 2024", 
      description: "Custom designed+built backbrace out of TPU and surgical tubing.",
      image: "/backbrace2.png",
      link: "/projects/backbrace" 
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
      image: "/differential.jpg",
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
    <motion.section initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="py-16">
      <h2 className="text-3xl font-semibold text-center mb-8">Projects</h2>
      <div className="space-y-6 divide-y divide-gray-700">
        {projects.map((project, idx) => (
          <motion.a key={idx} href={project.link} target="_blank" whileHover={{ scale: 1.03 }} className="flex flex-col md:flex-row gap-6 bg-gray-750 p-5 rounded-lg shadow-md">
            <img src={project.image} alt={project.title} className="w-32 h-32 object-cover rounded-lg" />
            <div>
              <h3 className="text-xl font-medium">{project.title}</h3>
              <p className="text-gray-400 text-sm mt-1">{project.description}</p>
            </div>
          </motion.a>
        ))}
      </div>
    </motion.section>
  );
}
