// app/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { IoMdHand } from 'react-icons/io';
import { FaGithub, FaLinkedin, FaEnvelope, FaFileDownload } from 'react-icons/fa';
import type { IconType } from 'react-icons';

import Image from 'next/image';

/* ───────────────── Typewriter ───────────────── */
function useTypewriter(fullText: string, speedMs = 34) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count >= fullText.length) return;

    const timer = window.setTimeout(() => {
      setCount((current) => Math.min(current + 1, fullText.length));
    }, speedMs);

    return () => window.clearTimeout(timer);
  }, [count, fullText.length, speedMs]);

  return fullText.slice(0, count);
}

/* ──────────────── Reusable paper card ──────────────── */
function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`paper-card ${className}`}>
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function CollapsibleCard({
  id,
  title,
  children,
  cardClassName = "",
  contentClassName = "",
  defaultOpen = false,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
  cardClassName?: string;
  contentClassName?: string;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentId = `${id}-content`;

  return (
    <Card className={cardClassName}>
      <button
        type="button"
        className="collapsible-trigger"
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={() => setIsOpen((current) => !current)}
      >
        <span className="section-title text-xl">{title}</span>
        <span className="collapsible-action" aria-hidden="true">
          <ChevronDown
            className={`collapsible-chevron ${isOpen ? 'is-open' : ''}`}
            strokeWidth={1.8}
          />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={contentId}
            key={contentId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: 'easeInOut' }}
            className="collapsible-content"
          >
            <div className={`collapsible-body ${contentClassName}`}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}


/* ──────────────── Sections ──────────────── */
function HeroSection() {
  const typed = useTypewriter("hi, i'm cooper!", 68);

  return (
    <Card className="p-4">
      <motion.div
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="grid gap-5 md:grid-cols-[7.5rem_1fr] md:items-stretch"
      >
        <div className="relative min-h-28 overflow-hidden rounded-[0.7rem] border border-[var(--line-soft)] bg-[rgba(239,228,210,0.74)] md:min-h-full">
          <Image
            src="/cooper1.png"
            alt="Cooper"
            fill
            priority
            sizes="(min-width: 768px) 9rem, 7rem"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex items-start justify-between gap-4">
            <h1
              className="min-h-[1.05em] whitespace-nowrap text-3xl font-bold leading-[1.03] tracking-[-0.01em] text-[var(--ink)] sm:text-4xl md:text-5xl"
            >
              {typed}
              <span className="ml-1 inline-block h-[0.9em] w-[2px] bg-[var(--accent)] align-[-0.1em] animate-cursor" />
            </h1>
            <motion.div
              animate={{ rotate: [0, 15, 0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
            >
              <IoMdHand className="mt-0.5 text-3xl text-[var(--accent-light)] sm:text-4xl md:text-5xl" />
            </motion.div>
          </div>
          <p className="max-w-[64ch] text-sm leading-6 text-[var(--ink-muted)] md:text-[0.9rem]">
            i&apos;m a rising freshman at stanford and my goal is to become a &ldquo;full-stack&rdquo; maker, experience in everything from manufacturing, to web dev, to cad.
            i&apos;ve previously ranked 1st in the world in debate and 2nd in the world in robotics.
            i love trying new things and building new projects and <span className="font-semibold text-[var(--accent)]">i&apos;m currently open to work, reach out!</span>
          </p>
        </div>
      </motion.div>
    </Card>
  );
}


function ContactItem({ href, children, icon: Icon }: { href: string; children: React.ReactNode; icon: IconType }) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
      className="group flex items-center gap-4 text-sm text-[var(--ink-muted)] hover:text-[var(--accent)]"
    >
      <Icon className="text-lg transition-transform duration-200 group-hover:-translate-y-0.5" />
      <span>{children}</span>
    </a>
  );
}

function ContactSection() {
  return (
    <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.55 }}>
      <CollapsibleCard
        id="contacts"
        title="Contact & Resume"
        cardClassName="px-5 py-4"
        contentClassName="grid gap-3 sm:grid-cols-2"
      >
        <ContactItem href="mailto:copperli1234@gmail.com" icon={FaEnvelope}>email</ContactItem>
        <ContactItem href="https://github.com/CooperLi1" icon={FaGithub}>github</ContactItem>
        <ContactItem href="https://www.linkedin.com/in/cooper-li-483672341" icon={FaLinkedin}>linkedin</ContactItem>
        <ContactItem href="https://drive.google.com/file/d/1xJ2eMiS8GXGEpoGaKvoetEYNhwGyPBSp/view?usp=sharing" icon={FaFileDownload}>resume</ContactItem>
      </CollapsibleCard>
    </motion.div>
  );
}

const awards = [
  {
    label: "2x FTC Worlds Inspire Award",
    detail: <>Top award in FIRST Tech Challenge given to <span className="award-highlight">4/8000+ teams</span>.</>,
  },
  {
    label: "Public Forum Debate Bid Leader",
    detail: <><span className="award-highlight">1st/8000+ globally</span> based on number of TOC qualifying performances.</>,
  },
  {
    label: "International Debate Champion",
    detail: <>New York City Invitational, Harvard RR, Durham, Blue Key RR, Ivy Street RR.</>,
  },
  {
    label: "Cameron Impact Scholarship Finalist",
    detail: <><span className="award-highlight">Top 100/3000+</span> for leadership and impactful community service.</>,
  },
  {
    label: "Palantir Meritocracy Fellow",
    detail: <>Accepted for commercial sector technical internship at Palantir, <span className="award-highlight">&asymp;Top 4%</span>.</>,
  },
  {
    label: "2x FTC Worlds Innovate Award",
    detail: <><span className="award-highlight">Top 0.15%</span> for robot innovation globally.</>,
  },
  {
    label: "FBLA Management Information Systems",
    detail: <>Placed <span className="award-highlight">Top 10 nationally</span> out of <span className="award-highlight">&asymp;1,000 competing teams</span>.</>,
  },
  {
    label: "Wharton Investment Comp. Semifinalist",
    detail: <>Led financial modeling software to place <span className="award-highlight">top 50/1800+ teams</span>.</>,
  },
  {
    label: "Certificate of Meritorious Service",
    detail: <><span className="award-highlight">700+</span> county-recognized service hours.</>,
  },
];

function SkillsSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55 }}
    >
      <CollapsibleCard
        id="skills"
        title="Skills"
        cardClassName="skills-card px-4 py-3"
        contentClassName="resume-lines"
      >
        <p>
          <strong>Engineering:</strong> CAD/CAM (Onshape, Solidworks), PCB Design (Altium, KiCAD), Machine Design, Manufacturing, FEA
        </p>
        <p>
          <strong>Software/AI:</strong> Python, Java, Embedded, Full-Stack, Controls, Git, LLMs, AI-assisted Coding
        </p>
      </CollapsibleCard>
    </motion.div>
  );
}

function AwardsSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55 }}
    >
      <CollapsibleCard
        id="awards"
        title="Awards"
        cardClassName="px-5 py-4 md:px-5 md:py-4"
      >
        <ul className="award-list">
          {awards.map((award) => (
            <li key={award.label} className="award-item">
              <strong>{award.label}:</strong>{" "}
              <span>{award.detail}</span>
            </li>
          ))}
        </ul>
      </CollapsibleCard>
    </motion.div>
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

const projectTileClasses = [
  "sm:col-span-2 xl:col-span-3 xl:row-span-2",
  "sm:col-span-2 xl:col-span-3 xl:row-span-2",
  "sm:col-span-2 xl:col-span-3",
  "sm:col-span-2 xl:col-span-3",
  "sm:col-span-2 xl:col-span-4",
  "xl:col-span-2",
  "xl:col-span-2",
  "xl:col-span-2",
  "xl:col-span-2",
];

function getProjectTileClass(index: number, total: number) {
  if (index < projectTileClasses.length) return projectTileClasses[index];

  const remainingCount = Math.max(total - projectTileClasses.length, 0);
  const remainingIndex = index - projectTileClasses.length;
  const isLastRemaining = remainingIndex === remainingCount - 1;
  const remainder = remainingCount % 3;

  if (isLastRemaining && remainder === 1) return "sm:col-span-2 xl:col-span-6";
  if (isLastRemaining && remainder === 2) return "sm:col-span-2 xl:col-span-4";

  return "xl:col-span-2";
}

function isFeatureTile(index: number) {
  return index < 2 || index === 4;
}

function ProjectImage({
  src,
  alt,
  feature,
}: {
  src: string;
  alt: string;
  feature: boolean;
}) {
  return (
    <div className={`relative overflow-hidden rounded-[0.65rem] ${feature ? 'min-h-56 md:min-h-full' : 'h-80'}`}>
      <Image
        src={src}
        alt={alt}
        fill
        loading="eager"
        sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="rounded-[0.65rem] object-cover transition duration-300 group-hover:scale-[1.02]"
      />
    </div>
  );
}

const projectPriority = [
  "CoopCNC | 2024-2025",
  "Dugtrio | 2025-2026",
  "Debatify | 2025",
  "Recycla V1 | 2025",
  "Nash | 2023-2024",
  "PipSqueak | 2026-Now",
  "CounselorCart | 2026-Now",
  "Pipe Traversing Robot | 2025",
  "Lucky | 2025-2026",
  "Nudge Wristphone | 2025",
  "Pick and Place Sim | 2026",
  "Rope Climbing Robot | 2025",
  "Wartortle | 2024-2025",
  "FTC Chat | 2026",
  "Birthday Gift | 2026",
  "Nudge Smartwatch | 2025",
  "InvestorBriefs | 2025",
  "Sensor Interface PCB | 2025",
  "ESP32 Breakout Board | 2024",
];

const projectPriorityRank = new Map(projectPriority.map((title, index) => [title, index]));

const projects: Project[] = [
  {
    title: "CoopCNC | 2024-2025",
    description: <><strong>Custom designed CNC machine</strong> with 1x1 meter bed to cut wood/aluminum.</>,
    image: "/cncdone.png",
    link: "/projects/cnc",
    tags: ["Mechatronics", "Manufacturing"]
  },
  {
    title: "Dugtrio | 2025-2026",
    description: <>World&apos;s only &apos;triple shooter on a turret&apos; robot for FIRST Tech Challenge Decode. Placed <strong>2nd globally out of 7000+ teams</strong> and first overall in Chesapeake.</>,
    image: "/dugtrio.png",
    link: "/projects/dugtrio",
    tags: ["Mechatronics", "Controls"]
  },
  {
    title: "Debatify | 2025",
    description: <>AI-powered personal assistant for competitive debate. Includes debate search engines, evidence archives, reformatters. <strong>30k+ Visitors, 10k+ ARR</strong>.</>,
    image: "/debatifyhome.png",
    link: "/projects/debatify",
    tags: ["WebDev", "AI", "Product"]
  },
  {
    title: "Recycla V1 | 2025",
    description: <>Custom designed <strong>water bottle to filament recycler</strong> with a split ring compound planetary gearbox.</>,
    image: "/recyclav1.png",
    link: "/projects/recycla",
    tags: ["Mechatronics", "Manufacturing", "Product"]
  },
  {
    title: "Nash | 2023-2024",
    description: <>Dual extension differential arm robot for FIRST Tech Challenge Centerstage Season. <strong>Top 4 globally out of 8000+ teams</strong>; Chesapeake regional champion.</>,
    image: "/nash.png",
    link: "/projects/nash",
    tags: ["Mechatronics", "Controls"]
  },
  {
    title: "PipSqueak | 2026-Now",
    description: <>3-axis <strong>automatic-pipetting gantry</strong> to create different solutions. Built for local biotech firm. In Progress.</>,
    image: "/pipettecad.png",
    link: "/projects/auto-pipette",
    tags: ["Mechatronics", "Manufacturing", "PCB Design", "Controls"]
  },
  //   {
  //   title: "CounselorCart | 2026-Now",
  //   description: <>3-axis <strong>automatic-pipetting gantry</strong> to create different solutions. Built for local biotech firm. In Progress.</>,
  //   image: "/pipettecad.png",
  //   link: "/projects/auto-pipette",
  //   tags: ["WebDev", "Product"]
  // },
  //     {
  //   title: "Pick and Place Sim | 2026",
  //   description: <>3-axis <strong>automatic-pipetting gantry</strong> to create different solutions. Built for local biotech firm. In Progress.</>,
  //   image: "/pickandplace.png",
  //   link: "/projects/pickandplace",
  //   tags: ["AI", "Mechatronics", "Controls"]
  // },
    {
    title: "Birthday Gift | 2026",
    description: <>PCB birthday gift with audio player and astable multivibrator.</>,
    image: "/birthday.png",
    link: "/projects/birthday",
    tags: ["PCB Design"]
  },
  {
    title: "FTC Chat | 2026",
    description: <>Chatbot using <strong>mixture of experts and retrieval augmented generation</strong> to accurately answer questions about FIRST Tech Challenge.</>,
    image: "/ftcrag.png",
    link: "/projects/ftcrag",
    tags: ["WebDev", "AI"]
  },
    {
    title: "Lucky | 2025-2026",
    description: <><strong>Wheeled bipedal robot</strong> with coaxial powered legs and custom PCB. Controlled via inverse kinematics.</>,
    image: "/luckybuild.png",
    link: "/projects/lucky",
    tags: ["Mechatronics", "PCB Design", "Controls"]
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
    title: "Hamlet Game | 2025",
    description: <>Turn based video game simulating Hamlet final fight made for AP Lit.</>,
    image: "/hamlet.png",
    link: "https://hamlet-game.vercel.app/",
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
    description: <>Recycling water-bottles into 3D printer filament.</>,
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
    description: <>Turret crane robot for FTC Powerplay Season. Alabama state champion.</>,
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

function ProjectsSection() {
  const [filter, setFilter] = useState('All');

  // Compute unique tags sorted by frequency
  const allTags = React.useMemo(() => {
    const tagCounts = new Map<string, number>();
    projects.forEach(p => p.tags?.forEach(t => tagCounts.set(t, (tagCounts.get(t) || 0) + 1)));
    return Array.from(tagCounts.keys()).sort((a, b) => {
      const diff = (tagCounts.get(b) || 0) - (tagCounts.get(a) || 0);
      return diff !== 0 ? diff : a.localeCompare(b);
    });
  }, []);

  const categories = ['All', ...allTags];

  const orderedProjects = React.useMemo(() => {
    return projects
      .map((project, index) => ({
        project,
        index,
        rank: projectPriorityRank.get(project.title) ?? Number.MAX_SAFE_INTEGER,
      }))
      .sort((a, b) => a.rank - b.rank || a.index - b.index)
      .map(({ project }) => project);
  }, []);

  const filteredProjects = filter === 'All'
    ? orderedProjects
    : orderedProjects.filter(p => p.tags?.includes(filter));


  return (
    <motion.section
      variants={listVariants}
      initial="hidden"
      animate="visible"
      className="h-auto"
    >
      <div className="relative mb-5 flex items-start justify-between gap-4">
        <h2 className="section-title text-2xl md:text-3xl">
          Projects
        </h2>

        <label className="sr-only" htmlFor="project-filter">Filter projects</label>
        <select
          id="project-filter"
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          className="project-filter-select"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-flow-dense grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-6">
        {filteredProjects.map((p, i) => {
          const feature = isFeatureTile(i);

          return (
            <motion.a
              layout
              key={p.title}
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              className={`paper-card group min-h-[16rem] p-3 ${getProjectTileClass(i, filteredProjects.length)}`}
            >
              <div className={feature ? "grid h-full gap-3 md:grid-cols-[1.05fr_0.95fr]" : "flex h-full flex-col gap-3"}>
                <ProjectImage src={p.image} alt={p.title} feature={feature} />
                <div className="flex flex-1 flex-col px-1 pb-1">
                  <h3 className="text-lg font-semibold leading-tight text-[var(--ink)] transition group-hover:text-[var(--accent)] md:text-xl">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--ink-muted)] [&_strong]:font-semibold [&_strong]:text-[var(--accent)]">
                    {p.description}
                  </p>
                  {p.tags && p.tags.length > 0 && (
                    <div className="mt-auto flex flex-wrap gap-2 pt-4">
                      {p.tags.map(tag => (
                        <span
                          key={tag}
                          className="tag-chip"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.a>
          );
        })}
      </div>
    </motion.section>
  );
}

function PublicationsSection() {
  return (
    <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.55 }}>
      <CollapsibleCard
        id="publications"
        title="Publications"
        cardClassName="px-5 py-4"
        contentClassName="space-y-4 pr-2"
      >
        <div>
          <a href="https://www3.cs.stonybrook.edu/~icdm2025/icdmw2025proceedings/813200c994.pdf" target="_blank" rel="noopener noreferrer" className="group block">
            <h3 className="text-[0.78rem] font-semibold leading-[1.25] text-[var(--ink)] transition group-hover:text-[var(--accent)]">
              Multimodal Foundation Models as Router Models for High-Resolution Aerial Image Segmentation.
            </h3>
            <p className="mt-1 text-[0.68rem] leading-[1.35] text-[var(--ink-muted)]">
              <strong className="font-semibold text-[var(--accent)]">Cooper Li</strong>, Zhihao Wang, Yiqun Xie.
            </p>
            <p className="mt-1 text-[0.56rem] italic leading-[1.25] text-[var(--ink-soft)]">
              In Proceedings of the IEEE International Conference on Data Mining (ICDM), 2025.
            </p>
          </a>
        </div>

        <div>
          <a href="https://neurips.cc/virtual/2025/loc/san-diego/poster/121794" target="_blank" rel="noopener noreferrer" className="group block">
            <h3 className="text-[0.78rem] font-semibold leading-[1.25] text-[var(--ink)] transition group-hover:text-[var(--accent)]">
              TreeFinder: A US-Scale Benchmark Dataset for Individual Tree Mortality Monitoring Using High-Resolution Aerial Imagery.
            </h3>
            <p className="mt-1 text-[0.68rem] leading-[1.35] text-[var(--ink-muted)]">
              Zhihao Wang, <strong className="font-semibold text-[var(--accent)]">Cooper Li</strong>, Ruichen Wang, Lei Ma, George Hurtt, Xiaowei Jia, Gengchen Mai, Zhili Li, Yiqun Xie.
            </p>
            <p className="mt-1 text-[0.56rem] italic leading-[1.25] text-[var(--ink-soft)]">
              In Proceedings of the 39th Conference on Neural Information Processing Systems (NeurIPS), 2025.
            </p>
          </a>
        </div>

        <div>
          <a href="https://dl.acm.org/doi/10.1145/3764919.3770871" target="_blank" rel="noopener noreferrer" className="group block">
            <h3 className="text-[0.78rem] font-semibold leading-[1.25] text-[var(--ink)] transition group-hover:text-[var(--accent)]">
              Characterizing the Effectiveness of DINOv2 as an Off-the-Shelf Foundation Model for Earth Monitoring Tasks: Preliminary Results.
            </h3>
            <p className="mt-1 text-[0.68rem] leading-[1.35] text-[var(--ink-muted)]">
              Ruichen Wang, <strong className="font-semibold text-[var(--accent)]">Cooper Li</strong>, Sophia Hou, Alexander Lu, Zhihao Wang, Xiaowei Jia, and Yiqun Xie.
            </p>
            <p className="mt-1 text-[0.56rem] italic leading-[1.25] text-[var(--ink-soft)]">
              In Proceedings of the 4th ACM SIGSPATIAL International Workshop on Spatial Big Data and AI for Industrial Applications (GeoIndustry &apos;25), 2025.
            </p>
          </a>
        </div>
      </CollapsibleCard>
    </motion.div>
  );
}

/* ───────────────── Page ───────────────── */
export default function Page() {
  return (
    <main id="main-content" className="relative min-h-screen text-[var(--ink)]">
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-6 md:px-8 md:py-8 lg:px-12">
        <div className="space-y-6">
          <section className="grid gap-5 lg:grid-cols-[1.18fr_0.82fr] lg:items-start">
            <div className="space-y-5">
              <HeroSection />
              <AwardsSection />
            </div>
            <div className="space-y-5">
              <ContactSection />
              <PublicationsSection />
              <SkillsSection />
            </div>
          </section>
          <section>
            <ProjectsSection />
          </section>
        </div>
      </div>
    </main>
  );
}
