// app/page.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PiArrowUpRight, PiEnvelopeSimple, PiGithubLogo, PiLinkedinLogo } from 'react-icons/pi';
import type { IconType } from 'react-icons';

// Adds `.is-visible` to [data-reveal] / [data-reveal-line] elements as they
// enter the viewport (once each). All visual states live in globals.css and
// are gated behind prefers-reduced-motion, so this is purely progressive.
function useScrollReveal(deps: React.DependencyList = []) {
  React.useEffect(() => {
    const pending = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal], [data-reveal-line]'),
    ).filter((el) => !el.classList.contains('is-visible'));

    if (pending.length === 0) return;

    if (typeof IntersectionObserver === 'undefined') {
      pending.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px' },
    );

    pending.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

function revealDelay(index: number, step = 50, cap = 350): React.CSSProperties {
  return { '--reveal-delay': `${Math.min(index * step, cap)}ms` } as React.CSSProperties;
}

function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <div className="section-heading-row" data-reveal>
      <h2 id={id} className="portfolio-section-title">{children}</h2>
    </div>
  );
}

function ContactItem({ href, children, icon: Icon }: { href: string; children: React.ReactNode; icon: IconType }) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      className="contact-link"
    >
      <Icon aria-hidden="true" />
      <span>{children}</span>
    </a>
  );
}

function HeroSection() {
  return (
    <header className="portfolio-hero">
      <div className="portfolio-portrait">
        <Image
          src="/cooper-pit.jpg"
          alt="Cooper working on his FTC robot in the competition pit"
          fill
          priority
          // Matches the hero grid: 17rem / 14rem portrait column on desktop,
          // full-bleed once the hero stacks below 50rem.
          sizes="(min-width: 1100px) 17rem, (min-width: 800px) 14rem, 100vw"
          className="object-cover"
        />
      </div>

      <div className="portfolio-hero-copy">
        <p className="hero-status">
          <span className="hero-status-dot" aria-hidden="true" />
          open to summer 2027 internships
        </p>
        <h1>hi, i&apos;m cooper!</h1>
        <p className="portfolio-intro">
          i&apos;m a rising freshman at stanford and a <span className="nowrap">&ldquo;full-stack&rdquo;</span> maker: cad, manufacturing, electronics, web dev.
          previously <span className="portfolio-intro-ranking">1st</span> in the world in debate and{' '}
          <span className="portfolio-intro-ranking">2nd</span> in robotics. <strong>reach out!</strong>
        </p>
        <nav className="contact-nav" aria-label="Contact links">
          <ContactItem href="mailto:cooper.liu.li1@gmail.com" icon={PiEnvelopeSimple}>email</ContactItem>
          <ContactItem href="https://github.com/CooperLi1" icon={PiGithubLogo}>github</ContactItem>
          <ContactItem href="https://www.linkedin.com/in/cooper-li/" icon={PiLinkedinLogo}>linkedin</ContactItem>
        </nav>
      </div>
    </header>
  );
}

const experience = [
  { organization: 'Conduit', role: 'Robotics Intern', dates: 'July 2026 - Present' },
  { organization: 'Bambu Lab', role: 'Mechanical Design Intern', dates: 'June 2026 - July 2026' },
  { organization: 'Arculus Solutions', role: 'Mechatronics Intern', dates: 'July 2025 - August 2025' },
  { organization: 'Nostopharma', role: 'Robotics Lead, Contractor', dates: 'Feb 2026 - Present' },
  { organization: 'University of Maryland', role: 'Machine Learning Researcher', dates: 'June 2024 - Feb 2026' },
  { organization: 'Debatify.app', role: 'Founder, Full-Stack Developer', dates: 'Feb 2025 - Present' },
  { organization: 'Johns Hopkins Applied Physics Lab', role: 'Electrical Engineering Intern', dates: 'June 2024 - August 2024' },
];

function ExperienceSection() {
  return (
    <section
      className="portfolio-section portfolio-section--experience"
      aria-labelledby="experience-heading"
      data-reveal-line
    >
      <SectionHeading id="experience-heading">Experience</SectionHeading>
      <ul className="experience-list">
        {experience.map((item, index) => (
          <li key={`${item.organization}-${item.role}`} data-reveal style={revealDelay(index)}>
            <div>
              <h3>{item.organization}</h3>
              <p>{item.role}</p>
            </div>
            <time>{item.dates}</time>
          </li>
        ))}
      </ul>
    </section>
  );
}

const awards = [
  {
    label: "2x FTC Worlds Inspire Award",
    detail: <>FTC&apos;s top award, given to <span className="award-highlight">4/7,000+ teams</span> for innovative engineering and community impact.</>,
  },
  {
    label: "Public Forum Debate Bid Leader",
    detail: <>Ranked <span className="award-highlight">1st globally out of 8,000+ debate teams</span>.</>,
  },
  {
    label: "International Debate Champion",
    detail: <>New York City Invitational, Harvard RR, Durham, Blue Key RR, Ivy Street RR.</>,
  },
  {
    label: "Cameron Impact Scholarship Finalist",
    detail: <><span className="award-highlight">Top 100 of 3,000+</span> for leadership and community impact.</>,
  },
  /*
  {
    label: "Palantir Meritocracy Fellowship Offer",
    detail: <>Selected for a direct-entry forward-deployed role at Palantir as an alternative to college.</>,
  },
  */
  {
    label: "U.S. Presidential Scholars Semifinalist",
    detail: <>One of <span className="award-highlight">627 U.S. seniors</span> selected for one of the nation&apos;s highest academic honors.</>,
  },
  {
    label: "2x FTC Worlds Innovate Award",
    detail: <><span className="award-highlight">Top 0.15% globally</span> for robot innovation.</>,
  },
  {
    label: "FBLA Management Information Systems",
    detail: <><span className="award-highlight">Top 10 nationally</span> out of roughly 1,000 competing teams.</>,
  },
  {
    label: "Wharton Investment Comp. Semifinalist",
    detail: <>Built financial modeling software placing <span className="award-highlight">top 50 of 1,800+ teams</span>.</>,
  },
  {
    label: "Certificate of Meritorious Service",
    detail: <><span className="award-highlight">700+</span> county-recognized service hours.</>,
  },
];

const skillGroups = [
  {
    label: "Mechanical Engineering",
    sections: [
      { label: "CAD & design", skills: "Onshape, Creo/Windchill, SolidWorks, Mechanism Design, DFM/DFA" },
      { label: "Analysis & documentation", skills: "FEA, Topology Optimization, GD&T, Engineering Drawings, Materials and Process Selection" },
      { label: "Manufacturing", skills: "CAM, CNC Machining, Injection Molding, Additive Manufacturing, Rapid Prototyping" },
    ],
  },
  {
    label: "Electrical & Embedded Systems",
    sections: [
      { label: "PCB design", skills: "KiCad, Altium, Schematic Capture, PCB Layout, Board Bring-up" },
      { label: "Embedded systems", skills: "Microcontrollers, Firmware, I2C, SPI, UART, CAN" },
      { label: "Hardware integration", skills: "Soldering, Circuit Debugging, Sensors, Actuators" },
    ],
  },
  {
    label: "Software Engineering",
    sections: [
      { label: "Languages & frontend", skills: "Python, Java, TypeScript, React, Next.js" },
      { label: "Backend & data", skills: "REST APIs, Relational Databases, Supabase, Authentication/OAuth, Stripe" },
      { label: "Infrastructure & tools", skills: "Linux, Docker, Git, Vercel, Codex, Claude Code" },
    ],
  },
  {
    label: "Robotics & Machine Learning",
    sections: [
      { label: "Robotics & controls", skills: "ROS 2, Finite State Machines, PID Control, Motion Profiling, Inverse Kinematics, SLAM, Isaac Lab" },
      { label: "Computer vision", skills: "Image Classification, Segmentation, CNNs, Model Benchmarking" },
      { label: "ML systems", skills: "PyTorch, TensorFlow, Hugging Face, Data Pipelines, LLMs, RAG, Reinforcement Learning" },
    ],
  },
];

function SkillsSection() {
  return (
    <section
      className="portfolio-section portfolio-section--skills"
      aria-labelledby="skills-heading"
      data-reveal-line
    >
      <SectionHeading id="skills-heading">Skills</SectionHeading>
      <dl className="skills-grid">
        {skillGroups.map((group, index) => (
          <div key={group.label} data-reveal style={revealDelay(index, 60)}>
            <dt>{group.label}</dt>
            <dd>
              <ul className="skill-subsections">
                {group.sections.map((section) => (
                  <li key={section.label}>
                    <span>{section.label}</span>
                    <p>{section.skills}</p>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function AwardsSection() {
  return (
    <section
      className="portfolio-section portfolio-section--awards"
      aria-labelledby="awards-heading"
      data-reveal-line
    >
      <SectionHeading id="awards-heading">Awards</SectionHeading>
      <ul className="award-list">
        {awards.map((award, index) => (
          <li key={award.label} className="award-item" data-reveal style={revealDelay(index, 35)}>
            <h3>{award.label}</h3>
            <p>{award.detail}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

type Project = { title: string; description: React.ReactNode; image: string; link: string; tags?: string[] };

const projectPriority = [
  "CoopCNC | 2024-2025",
  "Dugtrio | 2025-2026",
  "Debatify | 2025",
  "Nash | 2023-2024",
  "Recycla | 2025",
  "Aksis | 2026-Now",
  "PipSqueak | 2026-Now",
  "Pipe Traversing Robot | 2025",
  "Lucky | 2025-2026",
  "Pick and Place Sim | 2026",
  "Wartortle | 2024-2025",
  "Nudge Wristphone | 2025",
  "Nutmeg | 2022-2023",
  "CounselorCart | 2026",
  "PlanROS | 2026-Now",
  "Ros 2 + SLAM Explorer | 2026",
  "Cabo! | 2026",
  "Rope Climbing Robot | 2025",
  "Macadamia | 2021-2022",
  "Polyformer | 2024-2025",
  "Venture Scout Infra | 2026",
  "Sensor Interface PCB | 2025",
  "FTC Chat | 2026",
  "Birthday Gift | 2026",
  "Nudge Smartwatch | 2025",
  "InvestorBriefs | 2025",
  "ESP32 Breakout Board | 2024",
  "Rechargeable Flashlight | 2024",
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
    title: "Recycla | 2025",
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
  title: "Aksis | 2026-Now",
  description: <>Easy-to-use AI-powered browser studio to <strong>train robots with RL</strong> from CAD in minutes. In Progress.</>,
  image: "/aksispreview.png",
  link: "https://aksisrobotics.vercel.app/",
  tags: ["AI", "Mechatronics", "WebDev", "Product"]
},
{
  title: "Cabo! | 2026",
  description: <>My favorite card game made for multiplayer online play.</>,
  image: "/cabo.png",
  link: "https://www.cabocards.online/",
  tags: ["WebDev", "Product"]
},
  {
    title: "PipSqueak | 2026-Now",
    description: <>3-axis <strong>automatic-pipetting gantry</strong> to create different solutions. Built for local biotech firm. In Progress.</>,
    image: "/pipsqueakcad.png",
    link: "/projects/auto-pipette",
    tags: ["Mechatronics", "Manufacturing", "PCB Design", "Controls"]
  },
      {
    title: "PlanROS | 2026-Now",
    description: <>Visual planner for <strong>ROS 2</strong>. Lay out nodes and export a base project. In Progress.</>,
    image: "/planros.png",
    link: "https://planros.vercel.app/",
    tags: ["WebDev", "Controls"]
  },
    {
    title: "Pick and Place Sim | 2026",
    description: <>Simulation of pick and place robot trained via <strong>reinforcement learning</strong> using Isaac Lab.</>,
    image: "/pickandplace.png",
    link: "/projects/pickandplace",
    tags: ["AI", "Mechatronics", "Controls"]
  },
    {
    title: "Ros 2 + SLAM Explorer | 2026",
    description: <>Simulation of robot using SLAM to explore an environment. Programmed using ROS 2.</>,
    image: "/ros2nav.png",
    link: "/projects/ros2nav",
    tags: ["Mechatronics", "Controls"]
  },
  {
    title: "Venture Scout Infra | 2026",
    description: <>Talent sign-up, <strong>embedding-based retrieval, and AI analyzers</strong> built for Quanta Ventures.</>,
    image: "/venturescout.png",
    link: "/projects/venturescout",
    tags: ["AI", "WebDev"]
  },
    {
    title: "CounselorCart | 2026",
    description: <>Marketplace and organizer for college counselors.</>,
    image: "/counselorcart.png",
    link: "https://www.counselorcart.com/",
    tags: ["WebDev", "Product"]
  },
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

function getProjectParts(title: string) {
  const separatorIndex = title.lastIndexOf(' | ');

  if (separatorIndex === -1) {
    return { name: title, year: '' };
  }

  return {
    name: title.slice(0, separatorIndex),
    year: title.slice(separatorIndex + 3),
  };
}

function ProjectCard({
  project,
  variant,
  priority = false,
  revealDelayStyle,
}: {
  project: Project;
  variant: 'featured' | 'compact';
  priority?: boolean;
  revealDelayStyle?: React.CSSProperties;
}) {
  const { name, year } = getProjectParts(project.title);
  const isExternal = project.link.startsWith('http');

  return (
    <Link
      href={project.link}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      prefetch={isExternal ? undefined : false}
      className={`project-card project-card--${variant}`}
      data-reveal={revealDelayStyle ? '' : undefined}
      style={revealDelayStyle}
    >
      <div className="project-card-media">
        <Image
          src={project.image}
          alt={name}
          fill
          priority={priority}
          sizes={variant === 'featured'
            ? '(min-width: 1100px) 55vw, (min-width: 800px) 50vw, 100vw'
            : '(min-width: 1100px) 9rem, (min-width: 800px) 8rem, (min-width: 512px) 34vw, 7rem'}
          className="object-cover"
        />
      </div>
      <div className="project-card-copy">
        <div className="project-card-meta">
          {year && <time>{year}</time>}
          <PiArrowUpRight className="project-card-arrow" size={14} aria-hidden="true" />
        </div>
        <h3>{name}</h3>
        <p className="project-card-description">{project.description}</p>
        {project.tags && project.tags.length > 0 && (
          <div className="project-tags" aria-label="Project categories">
            {project.tags.map((tag) => (
              <span key={tag} className="tag-chip">{tag}</span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}

function ProjectsSection() {
  const [filter, setFilter] = useState('All');

  // Re-observe after a filter change so the remounted grid animates back in.
  useScrollReveal([filter]);

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

  const featuredProjects = filter === 'All' ? filteredProjects.slice(0, 5) : [];
  const indexedProjects = filter === 'All' ? filteredProjects.slice(5) : filteredProjects;

  return (
    <section className="projects-section" aria-labelledby="projects-heading" data-reveal-line>
      <div className="projects-heading-row">
        <SectionHeading id="projects-heading">Projects</SectionHeading>
        <div className="project-filters" aria-label="Filter projects">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              aria-pressed={filter === cat}
              aria-controls="project-list"
              className={filter === cat ? 'project-filter is-active' : 'project-filter'}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div id="project-list" key={filter}>
        {featuredProjects.length > 0 && (
          <div className="featured-project-grid">
            {featuredProjects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                variant="featured"
                priority={index < 2}
                revealDelayStyle={revealDelay(index, 70)}
              />
            ))}
          </div>
        )}

        <div
          className={featuredProjects.length > 0 ? 'project-index-grid has-featured' : 'project-index-grid'}
          data-reveal
          style={featuredProjects.length > 0 ? revealDelay(1, 80) : undefined}
        >
          {indexedProjects.map((project) => (
            <ProjectCard
              key={project.title}
              project={project}
              variant="compact"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function PublicationsSection() {
  return (
    <section
      className="portfolio-section portfolio-section--publications"
      aria-labelledby="publications-heading"
      data-reveal-line
    >
      <SectionHeading id="publications-heading">Publications</SectionHeading>
      <div className="publication-list">
        <article data-reveal>
          <a href="https://www3.cs.stonybrook.edu/~icdm2025/icdmw2025proceedings/813200c994.pdf" target="_blank" rel="noopener noreferrer">
            <h3>
              Multimodal Foundation Models as Router Models for High-Resolution Aerial Image Segmentation.
            </h3>
            <p>
              <strong>Cooper Li</strong>, Zhihao Wang, Yiqun Xie.
            </p>
            <p className="publication-venue">
              In Proceedings of the IEEE International Conference on Data Mining (ICDM), 2025.
            </p>
          </a>
        </article>

        <article data-reveal style={revealDelay(1, 70)}>
          <a href="https://neurips.cc/virtual/2025/loc/san-diego/poster/121794" target="_blank" rel="noopener noreferrer">
            <h3>
              TreeFinder: A US-Scale Benchmark Dataset for Individual Tree Mortality Monitoring Using High-Resolution Aerial Imagery.
            </h3>
            <p>
              Zhihao Wang, <strong>Cooper Li</strong>, Ruichen Wang, Lei Ma, George Hurtt, Xiaowei Jia, Gengchen Mai, Zhili Li, Yiqun Xie.
            </p>
            <p className="publication-venue">
              In Proceedings of the 39th Conference on Neural Information Processing Systems (NeurIPS), 2025.
            </p>
          </a>
        </article>

        <article data-reveal style={revealDelay(2, 70)}>
          <a href="https://dl.acm.org/doi/10.1145/3764919.3770871" target="_blank" rel="noopener noreferrer">
            <h3>
              Characterizing the Effectiveness of DINOv2 as an Off-the-Shelf Foundation Model for Earth Monitoring Tasks: Preliminary Results.
            </h3>
            <p>
              Ruichen Wang, <strong>Cooper Li</strong>, Sophia Hou, Alexander Lu, Zhihao Wang, Xiaowei Jia, and Yiqun Xie.
            </p>
            <p className="publication-venue">
              In Proceedings of the 4th ACM SIGSPATIAL International Workshop on Spatial Big Data and AI for Industrial Applications (GeoIndustry &apos;25), 2025.
            </p>
          </a>
        </article>
      </div>
    </section>
  );
}

export default function Page() {
  useScrollReveal();

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <main id="main-content" className="portfolio-page">
        <div className="portfolio-shell">
          <HeroSection />
          <div className="portfolio-ledger">
            <ExperienceSection />
            <AwardsSection />
            <PublicationsSection />
            <SkillsSection />
          </div>
          <ProjectsSection />
        </div>
      </main>
    </>
  );
}
