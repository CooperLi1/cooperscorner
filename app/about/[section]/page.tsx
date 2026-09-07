import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ExperienceSection, SkillsSection, PublicationsSection } from '@/app/components/ProfileSections';
import styles from '@/app/collage.module.css';

const sections = {
  experience: { title: 'Work experience', Component: ExperienceSection },
  skills: { title: 'Skills', Component: SkillsSection },
  publications: { title: 'Publications', Component: PublicationsSection },
};

function getSection(section: string) {
  if (!Object.hasOwn(sections, section)) notFound();
  return sections[section as keyof typeof sections];
}

export function generateStaticParams() {
  return Object.keys(sections).map(section => ({ section }));
}

export async function generateMetadata({ params }: { params: Promise<{ section: string }> }): Promise<Metadata> {
  return { title: getSection((await params).section).title };
}

export default async function AboutPage({ params }: { params: Promise<{ section: string }> }) {
  const { Component } = getSection((await params).section);
  return <main className={`${styles.page} ${styles.document}`}>
    <Link href="/">← back to the collage</Link>
    <Component />
    <nav aria-label="More about Cooper"><Link href="/about/experience">experience</Link> / <Link href="/about/skills">skills</Link> / <Link href="/about/publications">publications</Link></nav>
  </main>;
}
