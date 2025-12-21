import React from "react";
import { ProjectHeader, MediaList, type MediaItem, MediaCard } from '@/app/components/projects/ProjectScaffold';
import { Card } from '@/app/components/ui/Card';


export default function ProjectPage() {
  const project = {
    name: "Rope Climbing Bot",
    media: [
      {
        type: "video",
        src: "/climbup.mov",
        description: "Climbing up the rope!",
      },
      {
        type: "image",
        src: "/physicsprob.png",
        description: "The scenario I'm replicating for my physics teacher.",
      },
      {
        type: "video",
        src: "/zipline.mov",
        description: "Zipline!",
      },
      {
        type: "image",
        src: "/climbpcb.png",
        description: "PCB for rope-climbing bot.",
      },
      {
        type: "image",
        src: "/ropecad.png",
        alt: "Demo Image 1",
        description: "CAD of rope climbing bot. Utilizes sprung 4-bar, designed for physics teacher demo.",
      },
      {
        type: "image",
        src: "/ropelayout.png",
        description: "PCB layout in KiCad.",
      },
      {
        type: "image",
        src: "/ropesch.png",
        description: "PCB schematic.",
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

        {/* Separate More Info */}
      </div>
    </div>
  );
}
