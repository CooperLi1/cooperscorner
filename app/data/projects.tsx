import type React from 'react';

export type Project = { title: string; description: React.ReactNode; image: string; link: string; tags?: string[] };

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

export function getProjectParts(title: string) {
  const separatorIndex = title.lastIndexOf(' | ');

  if (separatorIndex === -1) {
    return { name: title, year: '' };
  }

  return {
    name: title.slice(0, separatorIndex),
    year: title.slice(separatorIndex + 3),
  };
}


export const orderedProjects = [...projects].sort((a, b) => (projectPriorityRank.get(a.title) ?? Number.MAX_SAFE_INTEGER) - (projectPriorityRank.get(b.title) ?? Number.MAX_SAFE_INTEGER));
