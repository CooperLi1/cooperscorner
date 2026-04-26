import React from "react";
import Link from "next/link";
import { Link as LinkIcon } from "lucide-react";
import { ProjectHeader, MediaList, type MediaItem, MediaCard } from '@/app/components/projects/ProjectScaffold';
import { Card } from '@/app/components/ui/Card';


export default function ProjectPage() {
  const project = {
    name: "Birthday Gift",
    media: [
      {
        type: "image",
        src: "/birthdaysch.png",
        alt: "Demo Image 1",
        description: "Schematic in KiCAD.",
      },
      {
        type: "image",
        src: "/birthdaypcb.png",
        description: "PCB in KiCad.",
      },
      
    ],
  };

  return (
    <div className="min-h-screen text-white px-4 md:px-8 lg:px-16">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header card */}
        <Card className="p-6 md:p-8">
          <ProjectHeader title={project.name} />
        </Card>

        {/* Media card (NO nested scroll) */}
        <Card className="p-0">
          <MediaCard /* scrollable={false} default */>
            <MediaList items={project.media as MediaItem[]} />
          </MediaCard>
        </Card>
{/* 
        <a
          href="/projects/wristphone"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/15 ring-1 ring-white/10 bg-white/10 hover:bg-white/15 py-3 font-semibold text-sky-200 transition"
        >
          <LinkIcon size={18} />
          Rev 2 (Wristphone)
        </a> */}
      </div>
    </div>
  );
}
