import type { ReactNode } from 'react';
import styles from '@/app/collage.module.css';

function SectionHeading({ id, children }: { id: string; children: ReactNode }) {
  return <h1 id={id}>{children}</h1>;
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

export function ExperienceSection() {
  return (
    <section
      aria-labelledby="experience-heading"
    >
      <SectionHeading id="experience-heading">Experience</SectionHeading>
      <ul>
        {experience.map((item) => (
          <li key={`${item.organization}-${item.role}`}>
            <div>
              <h2>{item.organization}</h2>
              <p>{item.role}</p>
            </div>
            <time>{item.dates}</time>
          </li>
        ))}
      </ul>
    </section>
  );
}

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

export function SkillsSection() {
  return (
    <section
      aria-labelledby="skills-heading"
    >
      <SectionHeading id="skills-heading">Skills</SectionHeading>
      <dl>
        {skillGroups.map((group) => (
          <div key={group.label}>
            <dt>{group.label}</dt>
            <dd>
              <ul>
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

export function PublicationsSection() {
  return (
    <section className={styles.publications} aria-labelledby="publications-heading">
      <SectionHeading id="publications-heading">publications</SectionHeading>
      <p>remote sensing &amp; machine learning.</p>
      <article className={styles.publication}>
        <p className={styles.venue}>ICDM · 2025</p>
        <h2>Multimodal Foundation Models as Router Models for High-Resolution Aerial Image Segmentation.</h2>
        <p className={styles.authors}><strong>Cooper Li</strong>, Zhihao Wang, Yiqun Xie.</p>
        <a href="https://www3.cs.stonybrook.edu/~icdm2025/icdmw2025proceedings/813200c994.pdf" target="_blank" rel="noopener noreferrer" aria-label="Read Multimodal Foundation Models as Router Models">read paper ↗</a>
      </article>
      <article className={styles.publication}>
        <p className={styles.venue}>NeurIPS · 2025</p>
        <h2>TreeFinder: A US-Scale Benchmark Dataset for Individual Tree Mortality Monitoring Using High-Resolution Aerial Imagery.</h2>
        <p className={styles.authors}>Zhihao Wang, <strong>Cooper Li</strong>, Ruichen Wang, Lei Ma, George Hurtt, Xiaowei Jia, Gengchen Mai, Zhili Li, Yiqun Xie.</p>
        <a href="https://neurips.cc/virtual/2025/loc/san-diego/poster/121794" target="_blank" rel="noopener noreferrer" aria-label="View TreeFinder publication">view publication ↗</a>
      </article>
      <article className={styles.publication}>
        <p className={styles.venue}>ACM SIGSPATIAL / GeoIndustry · 2025</p>
        <h2>Characterizing the Effectiveness of DINOv2 as an Off-the-Shelf Foundation Model for Earth Monitoring Tasks: Preliminary Results.</h2>
        <p className={styles.authors}>Ruichen Wang, <strong>Cooper Li</strong>, Sophia Hou, Alexander Lu, Zhihao Wang, Xiaowei Jia, and Yiqun Xie.</p>
        <a href="https://dl.acm.org/doi/10.1145/3764919.3770871" target="_blank" rel="noopener noreferrer" aria-label="Read Characterizing the Effectiveness of DINOv2">read paper ↗</a>
      </article>
    </section>
  );
}
