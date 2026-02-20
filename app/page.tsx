// app/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { IoMdHand } from 'react-icons/io';
import { FaGithub, FaLinkedin, FaEnvelope, FaFileDownload } from 'react-icons/fa';

import Image from 'next/image';
import VertexBackground from '@/app/components/VertexBackground';

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

/* ──────────────── Reusable glass card ──────────────── */
function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [pos, setPos] = React.useState({ x: 0, y: 0, visible: false });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top, visible: true });
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={() => setPos(p => ({ ...p, visible: false }))}
      className={`relative overflow-hidden bg-white/10 backdrop-blur-xl border border-white/15 ring-1 ring-white/10 rounded-2xl shadow-[0_12px_45px_-12px_rgba(0,0,0,0.6)] ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          opacity: pos.visible ? 1 : 0,
          background: `radial-gradient(400px circle at ${pos.x}px ${pos.y}px, rgba(180,140,255,0.13), transparent 70%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
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
            <h1
              className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight"
              style={{
                background: 'linear-gradient(120deg,#fff 25%,#c4b5fd 65%,#a78bfa)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {typed}
              <span
                className="ml-1 inline-block h-[0.9em] w-[2px] align-[-0.1em] animate-cursor"
                style={{ background: '#c4b5fd' }}
              />
            </h1>
            <motion.div
              animate={{ rotate: [0, 15, 0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
            >
              <IoMdHand className="text-yellow-300 text-4xl drop-shadow" />
            </motion.div>
          </div>
          <p className="mt-3 text-zinc-100/90">
            student at montgomery blair high school passionate about engineering.
            my goal is to one day become a &ldquo;full-stack&rdquo; maker, experienced in everything from manufacturing to web dev to cad. i love trying new things and building new projects.
            <span className="text-yellow-200"> i&apos;m currently looking for an internship for summer 2026, reach out!</span>
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
        <h2 className="text-2xl font-semibold mb-4">Contact &amp; Resume</h2>
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

/* ──────────────── Stagger variants ──────────────── */
const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.42, ease: 'easeOut' } },
};

type Project = { title: string; description: React.ReactNode; image: string; link: string; tags?: string[] };

function ProjectsSection() {
  const projects: Project[] = [
    {
      title: "📌 CoopCNC | 2024-2025",
      description: <><strong>Custom designed CNC machine</strong> with 1x1 meter bed to cut wood/aluminum.</>,
      image: "/cncdone.png",
      link: "/projects/cnc",
      tags: ["Mechatronics", "Manufacturing"]
    },
    {
      title: "📌 Debatify | 2025",
      description: <>AI-powered personal assistant for competitive debate. Includes debate search engines, evidence archives, reformatters. <strong>15k+ Users, 8k+ ARR</strong>.</>,
      image: "/debatifyhome.png",
      link: "/projects/debatify",
      tags: ["WebDev", "AI", "Product"]
    },
    {
      title: "📌 Recycla V1 | 2025",
      description: <>Custom designed <strong>water bottle to filament recycler</strong> with a split ring compound planetary gearbox.</>,
      image: "/recyclav1.png",
      link: "/projects/recycla",
      tags: ["Mechatronics", "Manufacturing", "Product"]
    },
    {
      title: "📌 Nash | 2023-2024",
      description: <>Dual extension differential arm robot for FIRST Tech Challenge Centerstage Season. <strong>Top 4 at worlds</strong>; Chesapeake regional champion.</>,
      image: "/nash.png",
      link: "/projects/nash",
      tags: ["Mechatronics", "Controls"]
    },
    {
      title: "Lucky | 2025-Now",
      description: <><strong>Wheeled bipedal robot</strong> with coaxial powered legs and custom PCB. Controlled via inverse kinematics. In Progress.</>,
      image: "/luckybuild.png",
      link: "/projects/lucky",
      tags: ["Mechatronics", "PCB Design", "Controls"]
    },
    {
      title: "Dugtrio | 2025-Now",
      description: <>World&apos;s only &apos;triple shooter on a turret&apos; robot for FIRST Tech Challenge Decode. Placed <strong>first overall in Chesapeake</strong>. In Progress.</>,
      image: "/dugtrio.png",
      link: "/projects/dugtrio",
      tags: ["Mechatronics", "Controls"]
    },
    {
      title: "Hamlet Game | 2026",
      description: <>Turn based video game simulating Hamlet final fight made for AP Lit.</>,
      image: "/hamlet.png",
      link: "https://hamlet-game.vercel.app/",
      tags: ["WebDev"]
    },
    {
      title: "Rope Climbing Robot | 2025",
      description: <>Designed for my physics teacher&apos;s class demo.</>,
      image: "/climbthumbnail.png",
      link: "/projects/rope",
      tags: ["Mechatronics", "PCB Design"]
    },
    {
      title: "Nudge Wristphone | 2025",
      description: <><strong>Custom wristphone</strong> with touchscreen, vibration, buzzer. V2 of Nudge Smartwatch.</>,
      image: "/nudgeonwrist.png",
      link: "/projects/wristphone",
      tags: ["PCB Design", "Product"]
    },
    {
      title: "Nudge Smartwatch | 2025",
      description: <>Custom smartwatch with touchscreen, vibration, buzzer. PCB had leakage current (not enough clearance), pivoted to Nudge Wristphone.</>,
      image: "/nudgev1.png",
      link: "/projects/nudge",
      tags: ["PCB Design", "Product"]
    },
    {
      title: "Pipe Traversing Robot | 2025",
      description: <>Robot to <strong>climb through pipes</strong> with custom PCB. Designed for Arculus Solutions.</>,
      image: "/arculusbot.png",
      link: "/projects/pipebot",
      tags: ["Mechatronics", "PCB Design"]
    },
    {
      title: "Sensor Interface PCB | 2025",
      description: <>Sensor interface PCB designed for Arculus Solutions.</>,
      image: "/interface.png",
      link: "/projects/interface",
      tags: ["PCB Design"]
    },
    {
      title: "Robot in 12 Hours | 2025",
      description: <>Design-&gt;build-&gt;electronics-&gt;programming <strong>in under 12 hours</strong>. Built as a demonstration robot to take to Uganda.</>,
      image: "/ri12h.png",
      link: "/projects/ri12h",
      tags: ["Mechatronics"]
    },
    {
      title: "InvestorBriefs | 2025",
      description: <>Website providing real-time stock insights using AI. Built with NextJS.</>,
      image: "/investorbriefs1.png",
      link: "/projects/investorbriefs",
      tags: ["WebDev", "AI"]
    },
    {
      title: "Stirling Engine | 2025",
      description: <>Homemade stirling engine.</>,
      image: "/stirling.png",
      link: "/projects/stirling",
      tags: ["Misc"]
    },
    {
      title: "Medalarm | 2025",
      description: <>Alarm for morning meds. Built with my friend to keep healthy!</>,
      image: "/medalarm.png",
      link: "/projects/medalarm",
      tags: ["Misc"]
    },
    {
      title: "MathMadeSimple Site | 2025",
      description: <>Website made for my friend&apos;s nonprofit</>,
      image: "/mathmadesimple.png",
      link: "https://mathmadesimple.vercel.app/",
      tags: ["WebDev"]
    },
    {
      title: "Wartortle | 2024-2025",
      description: <>Telescoping arm robot with 2-stage hang for FIRST Tech Challenge Into the Deep Season. <strong>Peaked 7th OPR worldwide</strong>, 1st OPR Chesapeake, finals at Chesapeake states.</>,
      image: "/wartortle.png",
      link: "/projects/wartortle",
      tags: ["Mechatronics", "Controls"]
    },
    {
      title: "Polyformer | 2024-2025",
      description: <><strong>Recycling water-bottles into 3D printer filament.</strong></>,
      image: "/polyformerpic.png",
      link: "/projects/polyformer",
      tags: ["Mechatronics", "Manufacturing"]
    },
    {
      title: "Mini Me | 2024-2025",
      description: <>Custom <strong>60-cent educational robotics kit</strong>. Small robot, big personality!</>,
      image: "/minime.png",
      link: "https://minimerobotics.vercel.app/",
      tags: ["Mechatronics", "Product"]
    },
    {
      title: "ESP32 Breakout Board | 2024",
      description: <>Compact PCB designed in Altium for JHU APL internship.</>,
      image: "/board.png",
      link: "/projects/esp32",
      tags: ["PCB Design"]
    },
    {
      title: "Rechargeable Flashlight | 2024",
      description: <>Flashlight with 3 recharging mechanisms: ripcord, barreljack, battery.</>,
      image: "/flashlightexternal.png",
      link: "/projects/flashlight",
      tags: ["Product", "Mechatronics"]
    },
    {
      title: "Backbrace | 2024",
      description: <>Custom designed+built backbrace out of TPU and surgical tubing.</>,
      image: "/backbrace2.png",
      link: "/projects/backbrace",
      tags: ["Misc"]
    },
    {
      title: "Linear Odometry | 2023",
      description: <>Custom designed odometry pod for tracking robot position.</>,
      image: "/odo.png",
      link: "/projects/odo",
      tags: ["Mechatronics"]
    },
    {
      title: "Diffy | 2023",
      description: <>Differential drive pod built as a gift.</>,
      image: "/differential.jpg",
      link: "/projects/diffy",
      tags: ["Mechatronics"]
    },
    {
      title: "Nutmeg | 2022-2023",
      description: <>Turret crane robot for FTC Powerplay Season. <strong>Alabama state champion.</strong></>,
      image: "/nutmeg.png",
      link: "/projects/nutmeg",
      tags: ["Mechatronics", "Controls"]
    },
    {
      title: "Macadamia | 2021-2022",
      description: <>Suspension robot for FTC Freight Frenzy. <strong>Worlds division semifinalist</strong>; state champion.</>,
      image: "/mac.png",
      link: "/projects/mac",
      tags: ["Mechatronics", "Controls"]
    },

    {
      title: "Rube Goldberg | 2021",
      description: <>Rube goldberg machine for science olympiad.</>,
      image: "/rubegoldberg.png",
      link: "/projects/rubegoldberg",
      tags: ["Misc"]
    },
    {
      title: "Collision Preventer | 2019-2020",
      description: <>Detects and warns of collisions in hallway deadzones.</>,
      image: "/collision.png",
      link: "/projects/collision",
      tags: ["Product"]
    },
  ];

  return (
    <Card className="rounded-3xl overflow-hidden p-0">
      <motion.section
        variants={listVariants}
        initial="hidden"
        animate="visible"
        className="h-auto lg:h-[calc(100vh-6rem)] lg:overflow-y-auto"
      >
        <div className="p-6 md:p-7">
          {/* heading with gradient underline accent */}
          <div className="text-center mb-6">
            <h2 className="text-3xl font-semibold inline-block relative">
              Projects
              <span
                className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full"
                style={{ background: 'linear-gradient(90deg,transparent,#a78bfa,transparent)' }}
              />
            </h2>
          </div>
          <div className="flex flex-col">
            {projects.map((p, i) => (
              <motion.a
                key={i}
                href={p.link}
                target="_blank"
                variants={itemVariants}
                className="block group py-4 border-b border-white/10 last:border-0"
              >
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
                    <p className="text-zinc-100/80 text-sm mt-1 [&_strong]:text-yellow-200 [&_strong]:font-semibold">
                      {p.description}
                    </p>
                    {/* Tags */}
                    {p.tags && p.tags.length > 0 && (
                      <div className="flex flex-wrap gap-3 mt-2.5">
                        {p.tags.map(tag => (
                          <span
                            key={tag}
                            className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded bg-white/10 border border-white/10 text-zinc-300 shadow-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.a>
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
      <VertexBackground />
      {/* content above background */}
      <div className="relative z-30 px-4 md:px-8 lg:px-16">
        <div className="flex flex-col lg:flex-row lg:h-screen gap-8 lg:gap-6">
          <div className="w-full lg:w-1/2 lg:pr-2 lg:overflow-y-auto">
            <div className="space-y-8 pt-12 pb-10">
              <HeroSection />
              <ContactSection />

            </div>
          </div>
          <div className="w-full lg:w-1/2 lg:pl-2 lg:overflow-y-auto mt-2 lg:mt-12 lg:mb-10">
            <ProjectsSection />
          </div>
        </div>
      </div>

      {/* Local keyframes (client-safe) */}
      <style jsx global>{`
        @keyframes cursor { 0%,49% { opacity: 1 } 50%,100% { opacity: 0 } }
        .animate-cursor { animation: cursor 1.05s step-end infinite; }
      `}</style>
    </div>
  );
}
