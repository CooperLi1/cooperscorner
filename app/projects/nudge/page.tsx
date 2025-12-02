import React from "react";
import Link from "next/link";
import { Link as LinkIcon } from "lucide-react";
import { ProjectHeader, MediaList, type MediaItem, MediaCard } from '@/app/components/projects/ProjectScaffold';
import { Card } from '@/app/components/ui/Card';


export default function ProjectPage() {
  const project = {
    name: "Nudge Smartwatch",
    media: [
      {
        type: "image",
        src: "/nudgecad.png",
        alt: "Demo Image 1",
        description: "CAD for smartwatch with touchscreen, vibration, buzzer.",
      },
      {
        type: "image",
        src: "/nudgepcb.png",
        description: "PCB design in KiCad.",
      },
      {
        type: "image",
        src: "/nudgelayout.png",
        description: "PCB layout.",
      },
      {
        type: "image",
        src: "/nudgesch.png",
        description: "PCB schematic.",
      },
      {
        type: "image",
        src: "/nudgeinside.png",
        description: (
          <span>
            The board didn't end up working, I'm almost certain it was because of a ~350ohm leakage caused by me having a 0mm minimum clearance in KiCad settings. When redesigning, I pivoted to a wristphone design since I thought it was cooler.
          </span>
        ),
      }
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

        <a
          href="/projects/wristphone"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/15 ring-1 ring-white/10 bg-white/10 hover:bg-white/15 py-3 font-semibold text-sky-200 transition"
        >
          <LinkIcon size={18} />
          Rev 2 (Wristphone)
        </a>
      </div>
    </div>
  );
}
