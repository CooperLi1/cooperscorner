import Image from 'next/image';
import Link from 'next/link';
import { orderedProjects, getProjectParts, type Project } from '@/app/data/projects';
import styles from './collage.module.css';

function Photo({ src, alt, priority = false }: { src: string; alt: string; priority?: boolean }) {
  return (
    <div className={styles.print}>
      <div className={styles.image}>
        <Image src={src} alt={alt} fill priority={priority} sizes="(max-width: 600px) 85vw, (max-width: 900px) 44vw, 32vw" />
      </div>
    </div>
  );
}

function ProjectPhoto({ project, index }: { project: Project; index: number }) {
  const { name, year } = getProjectParts(project.title);
  const external = project.link.startsWith('https://');
  return (
    <Link href={project.link} prefetch={false} className={`${styles.photo} ${styles.project}`} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>
      <figure>
        <Photo src={project.image} alt={name} priority={index < 2} />
        <figcaption><strong>{name.toLowerCase()}</strong> / {year}<span className={styles.caption}>{project.description}</span></figcaption>
      </figure>
    </Link>
  );
}

function Note({ href, title, action, children }: { href: string; title: string; action: string; children: React.ReactNode }) {
  return (
    <Link href={href} className={`${styles.photo} ${styles.note}`}>
      <div className={styles.notePaper}><strong>{title}</strong>{children}<span className={styles.noteLink}>{action}</span></div>
    </Link>
  );
}

export default function Page() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <main id="main-content" className={styles.page}>
        <div className={styles.board}>
          <header className={styles.intro}>
            <div className={styles.greeting}>
              <h1>hi, i&apos;m cooper! <span className={styles.welcome}>welcome to my (semi-retired) personal website!</span></h1>
              <Image src="/cooper-pixel.png" alt="Pixel-art Cooper waving, with a big head and tiny body" width={56} height={56} sizes="56px" className={styles.avatar} />
            </div>
            <p>i spend a lot of time making stuff — <strong>robots, web apps, pcbs,</strong> and more!</p>
            <p>i&apos;m an incoming freshman at <strong>stanford</strong>, and i previously ranked <strong>1st in the world in debate</strong>, and <strong>2nd in the world in robotics.</strong></p>
            <nav aria-label="Contact links"><a href="mailto:cooper.liu.li1@gmail.com">email</a> / <a href="https://github.com/CooperLi1" target="_blank" rel="noopener noreferrer">github</a> / <a href="https://www.linkedin.com/in/cooper-li/" target="_blank" rel="noopener noreferrer">linkedin</a></nav>
            <p className={styles.invitation}>a few things i&apos;ve been working on.<br />click a photo to look closer ↓</p>
          </header>
          <ProjectPhoto project={orderedProjects[0]} index={0} />
          <ProjectPhoto project={orderedProjects[1]} index={1} />
          <ProjectPhoto project={orderedProjects[2]} index={2} />
          <ProjectPhoto project={orderedProjects[3]} index={3} />
          <Note href="/about/experience" title="my work experience" action="more info">
            <p>most recently, i worked on robotics at <strong>Conduit Industries</strong> and mechanical design at <strong>Bambu Lab</strong></p>
          </Note>
          <Note href="/about/skills" title="my skillset" action="learn more">
            <p>mechanical, electrical, software, ml, and robotics</p>
          </Note>
          <ProjectPhoto project={orderedProjects[6]} index={6} />
          <ProjectPhoto project={orderedProjects[7]} index={7} />
          <ProjectPhoto project={orderedProjects[4]} index={4} />
          <Note href="/about/publications" title="publications" action="take a look">
            <p>remote sensing &amp; machine learning: neurips, icdm, geoindustry</p>
          </Note>
          {orderedProjects.slice(8, 12).map((project, i) => <ProjectPhoto key={project.title} project={project} index={i + 8} />)}
        </div>
        <details className={styles.archive}>
          <summary>archived projects ({orderedProjects.length - 11})</summary>
          <div className={styles.archiveGrid}>
            <ProjectPhoto project={orderedProjects[5]} index={5} />
            {orderedProjects.slice(12).map((project, i) => <ProjectPhoto key={project.title} project={project} index={i + 12} />)}
          </div>
        </details>
      </main>
    </>
  );
}
