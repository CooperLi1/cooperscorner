// app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { IoMdHand } from 'react-icons/io';
import { FaGithub, FaLinkedin, FaEnvelope, FaFileDownload } from 'react-icons/fa';

import Image from 'next/image';

/* ───────────────── Typewriter ───────────────── */
function useTypewriter(fullText: string, speedMs = 34) {
  const [text, setText] = useState('');
  useEffect(() => {
    let i = 0;
    let t: number | null = null;
    setText('');
    const step = () => {
      i += 1;
      setText(fullText.slice(0, i));
      if (i < fullText.length) t = window.setTimeout(step, speedMs);
    };
    t = window.setTimeout(step, speedMs);
    return () => { if (t) clearTimeout(t); };
  }, [fullText, speedMs]);
  return text;
}

/* ──────────────── Background (fixed, visible vignette) ──────────────── */
function Background() {
  return (
    <>
      {/* 1) Color wash */}
      <div
        aria-hidden
        className="fixed inset-0 z-0 pointer-events-none transform-gpu will-change-transform
                   bg-[radial-gradient(1200px_700px_at_12%_-10%,rgba(99,102,241,0.60),transparent),
                       radial-gradient(1000px_600px_at_115%_10%,rgba(217,70,239,0.52),transparent),
                       radial-gradient(900px_650px_at_50%_115%,rgba(34,211,238,0.54),transparent)]
                   animate-[slow-pan_22s_ease-in-out_infinite]"
      />
      {/* 2) Sheen */}
      <div
        aria-hidden
        className="fixed inset-0 z-10 pointer-events-none
                   bg-[linear-gradient(140deg,rgba(255,255,255,0.07),transparent_40%,transparent_60%,rgba(0,0,0,0.12))]"
      />
      {/* 3) Strong vignette via SVG */}
      <svg
        aria-hidden
        className="fixed inset-0 z-20 pointer-events-none w-screen h-screen"
        preserveAspectRatio="none"
      >
        <defs>
          <radialGradient id="vig" cx="50%" cy="42%" r="62%">
            <stop offset="60%" stopColor="rgba(0,0,0,0)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.46)" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#vig)" />
      </svg>
    </>
  );
}

/* ──────────────── Reusable glass card ──────────────── */
function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white/10 backdrop-blur-xl border border-white/15 ring-1 ring-white/10 rounded-2xl shadow-[0_12px_45px_-12px_rgba(0,0,0,0.6)] ${className}`}>
      {children}
    </div>
  );
}

/* ──────────────── Sections ──────────────── */
function HeroSection() {
  const typed = useTypewriter("hi, i'm cooper!", 68);
  return (
    <Card className="p-5 md:p-7">
      <motion.div
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="flex items-start gap-5"
      >
        <Image
          src="/cooper1.png"
          alt="Cooper"
          width={96}
          height={96}
          className="h-20 w-20 md:h-24 md:w-24 rounded-full object-cover border border-white/25 shadow-lg"
        />
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              {typed}
              <span className="ml-1 inline-block h-[0.9em] w-[2px] align-[-0.1em] bg-current animate-cursor" />
            </h1>
            <motion.div
              animate={{ rotate: [0, 15, 0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
            >
              <IoMdHand className="text-yellow-300 text-4xl drop-shadow" />
            </motion.div>
          </div>
          <p className="mt-3 text-zinc-100/90">
            student at montgomery blair high school always eager to learn more about robotics, debate, ai, and climate change.
            my goal is to one day become a "full-stack" maker, experienced in everything from manufacturing to web dev to cad.
            <span className="text-yellow-200"> i love trying new things and building new projects. reach out!</span>
          </p>
        </div>
      </motion.div>
    </Card>
  );
}

function AboutSection() {
  return (
    <Card className="p-5 md:p-6">
      <motion.div
        initial={{ opacity: 0, x: -36 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55 }}
        className="flex gap-5 items-center"
      >
        <Image
          src="/cooper1.png"
          alt="Profile"
          width={96}
          height={96}
          className="h-20 w-20 md:h-24 md:w-24 rounded-full object-cover border border-white/20 shadow-md"
        />
        <div>
          <h2 className="text-2xl font-semibold">About</h2>
          <p className="text-zinc-100/85 mt-1">
            building things, breaking things (then fixing them), and sharing what i learn along the way.
          </p>
        </div>
      </motion.div>
    </Card>
  );
}

function ContactSection() {
  const Item = ({ href, children, icon: Icon }: { href: string; children: React.ReactNode; icon: any }) => (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
      className="flex items-center gap-4 text-zinc-100/90 hover:text-yellow-200 transition"
    >
      <Icon className="text-xl" />
      <span>{children}</span>
    </a>
  );

  return (
    <Card className="p-5 md:p-6">
      <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.55 }}>
        <h2 className="text-2xl font-semibold mb-4">Contact & Resume</h2>
        <div className="space-y-3">
          <Item href="mailto:copperli1234@gmail.com" icon={FaEnvelope}>email</Item>
          <Item href="https://github.com/CooperLi1" icon={FaGithub}>github</Item>
          <Item href="https://www.linkedin.com/in/cooper-li-483672341" icon={FaLinkedin}>linkedin</Item>
          <Item href="https://drive.google.com/file/d/1xJ2eMiS8GXGEpoGaKvoetEYNhwGyPBSp/view?usp=sharing" icon={FaFileDownload}>resume</Item>
        </div>
      </motion.div>
    </Card>
  );
}


function ProjectsSection() {
  const projects = [
    { title: "📌 CoopCNC | 2024-2025", description: "Custom designed CNC machine with 1x1 meter bed to cut wood/aluminum.", image: "/cncdone.png", link: "/projects/cnc" },
    { title: "📌 Debatify | 2025", description: "AI-powered personal assistant for competitive debate. Includes debate search engines, evidence archives, reformatters. 12k+ Users, ~7k ARR.", image: "/debatifyhome.png", link: "/projects/debatify" },
    { title: "📌 Recycla V1 | 2025", description: "Custom designed water bottle to filament recycler with a split ring compound planetary gearbox. ", image: "/recyclav1.png", link: "/projects/recycla" },
    { title: "📌 Nash | 2023-2024", description: "Dual extension differential arm robot for FIRST Tech Challenge Centerstage Season. Top 4 at worlds; Chesapeake state champion.", image: "/nash.png", link: "/projects/nash" },
    { title: "Lucky | 2025-Now", description: "Wheeled bipedal robot with coaxial powered legs and custom PCB. In Progress.", image: "/bobocad.png", link: "/projects/lucky" },
    { title: "Dugtrio | 2025-Now", description: "Triple shooter robot for FIRST Tech Challenge Decode. In Progress.", image: "/dugtrio.png", link: "/projects/dugtrio" },
    { title: "Rope Climbing Robot | 2025", description: "Designed for my physics teacher's class demo.", image: "/climbthumbnail.png", link: "/projects/rope" },
    { title: "Nudge Wristphone | 2025", description: "Custom wristphone with touchscreen, vibration, buzzer. V2 of Nudge Smartwatch.", image: "/nudgeonwrist.png", link: "/projects/wristphone" },
    { title: "Nudge Smartwatch | 2025", description: "Custom smartwatch with touchscreen, vibration, buzzer. PCB had leakage current (not enough clearance), pivoted to Nudge Wristphone.", image: "/nudgev1.png", link: "/projects/nudge" },
    { title: "Pipe Traversing Robot | 2025", description: "Robot to climb through pipes with custom PCB. Designed for Arculus Solutions.", image: "/arculusbot.png", link: "/projects/pipebot" },
    { title: "Sensor Interface PCB | 2025", description: "Sensor interface PCB designed for Arculus Solutions.", image: "/interface.png", link: "/projects/interface" },
    { title: "Robot in 12 Hours | 2025", description: "Design->build->electronics->programming in under 12 hours. Built as a demonstration robot to take to Uganda.", image: "/ri12h.png", link: "/projects/ri12h" },
    { title: "InvestorBriefs | 2025", description: "Website providing real-time stock insights using AI. Built with NextJS.", image: "/investorbriefs1.png", link: "/projects/investorbriefs" },
    { title: "Stirling Engine | 2025", description: "Homemade stirling engine.", image: "/stirling.png", link: "/projects/stirling" },
    { title: "Medalarm | 2025", description: "Alarm for morning meds. Built with my friend to keep healthy!", image: "/medalarm.png", link: "/projects/medalarm" },
    { title: "MathMadeSimple Site | 2025", description: "Website made for my friend's nonprofit", image: "/mathmadesimple.png", link: "https://mathmadesimple.vercel.app/" },
    { title: "Wartortle | 2024-2025", description: "Telescoping arm robot with 2-stage hang for FIRST Tech Challenge Into the Deep Season. Peaked 7th OPR worldwide, 1st OPR Chesapeake, finals at Chesapeake states.", image: "/wartortle.png", link: "/projects/wartortle" },
    { title: "Polyformer | 2024-2025", description: "Recycling water-bottles into 3D printer filament.", image: "/polyformerpic.png", link: "/projects/polyformer" },
    { title: "Mini Me | 2024-2025", description: "Custom 60-cent educational robotics kit. Small robot, big personality!", image: "/minime.png", link: "https://minimerobotics.vercel.app/" },
    { title: "ESP32 Breakout Board | 2024", description: "Compact PCB designed in Altium for JHU APL internship.", image: "/board.png", link: "/projects/esp32" },
    { title: "Rechargeable Flashlight | 2024", description: "Flashlight with 3 recharging mechanisms: ripcord, barreljack, battery.", image: "/flashlightexternal.png", link: "/projects/flashlight" },
    { title: "Backbrace | 2024", description: "Custom designed+built backbrace out of TPU and surgical tubing.", image: "/backbrace2.png", link: "/projects/backbrace" },
    { title: "Linear Odometry | 2023", description: "Custom designed odometry pod for tracking robot position.", image: "/odo.png", link: "/projects/odo" },
    { title: "Diffy | 2023", description: "Differential drive pod built as a gift.", image: "/differential.jpg", link: "/projects/diffy" },
    { title: "Nutmeg | 2022-2023", description: "Turret crane robot for FTC Powerplay Season. Alabama state champion.", image: "/nutmeg.png", link: "/projects/nutmeg" },
    { title: "Macadamia | 2021-2022", description: "Suspension robot for FTC Freight Frenzy. Worlds division semifinalist; state champion.", image: "/mac.png", link: "/projects/mac" },
    {
      title: "Rube Goldberg | 2021",
      description: "Rube goldberg machine for science olympiad.",
      image: "/rubegoldberg.png",
      link: "/projects/rubegoldberg"
    },
    {
      title: "Collision Preventer | 2019-2020",
      description: "Detects and warns of collisions in hallway deadzones.",
      image: "/collision.png",
      link: "/projects/collision"
    },
  ];

  return (
    // Make the card the clipper (rounded + overflow-hidden) and remove padding here
    <Card className="rounded-3xl overflow-hidden p-0">
      {/* Put padding on inner content and make THAT the scroller */}
      <motion.section
        initial={{ opacity: 0, x: 42 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        // fixed height on large screens so scrolling happens inside the card
        className="h-auto lg:h-[calc(100vh-6rem)] lg:overflow-y-auto"
      >
        <div className="p-6 md:p-7">
          <h2 className="text-3xl font-semibold text-center mb-6">Projects</h2>
          <div className="space-y-5 divide-y divide-white/10">
            {projects.map((p, i) => (
              <a key={i} href={p.link} target="_blank" className="block group pt-5 first:pt-0">
                <div className="flex flex-col md:flex-row gap-5 items-start">
                  <Image
                    src={p.image}
                    alt={p.title}
                    width={112}
                    height={112}
                    className="w-28 h-28 object-cover rounded-lg border border-white/20 shadow-md group-hover:scale-[1.03] transition"
                  />
                  <div>
                    <h3 className="text-xl font-semibold leading-tight group-hover:text-yellow-200 transition">
                      {p.title}
                    </h3>
                    <p className="text-zinc-100/80 text-sm mt-1">{p.description}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </motion.section>
    </Card>
  );
}

/* ───────────────── Page ───────────────── */
export default function Page() {
  return (
    <div className="relative min-h-screen text-white">
      <Background />
      {/* content above background */}
      <div className="relative z-30 px-4 md:px-8 lg:px-16">
        <div className="flex flex-col lg:flex-row lg:h-screen gap-8 lg:gap-6">
          <div className="w-full lg:w-1/2 lg:pr-2 lg:overflow-y-auto">
            <div className="space-y-8 pt-12 pb-10">
              <HeroSection />
              {/* <AboutSection /> */}
              <ContactSection />
            </div>
          </div>
          <div className="w-full lg:w-1/2 lg:pl-2 lg:overflow-y-auto mt-2 lg:mt-12 lg:mb-10">
            {/* <div className="lg:h-[calc(100vh-6rem)]"> */}
            <ProjectsSection />
            {/* </div> */}
          </div>
        </div>
      </div>

      {/* Local keyframes (client-safe) */}
      <style jsx global>{`
        @keyframes slow-pan {
          0% { transform: translate3d(0,0,0) scale(1); }
          50% { transform: translate3d(-2%, -1%, 0) scale(1.02); }
          100% { transform: translate3d(0,0,0) scale(1); }
        }
        @keyframes cursor { 0%,49% { opacity: 1 } 50%,100% { opacity: 0 } }
        .animate-cursor { animation: cursor 1.05s step-end infinite; }
      `}</style>
    </div>
  );
}
