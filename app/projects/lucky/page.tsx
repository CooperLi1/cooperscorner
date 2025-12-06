import React from "react";
import { ProjectHeader, MediaList, type MediaItem, MediaCard } from '@/app/components/projects/ProjectScaffold';
import { Card } from '@/app/components/ui/Card';


export default function ProjectPage() {
  const project = {
    name: "Lucky (In Progress)",
    media: [
      {
        type: "image",
        src: "/bobocad.png",
        alt: "Demo Image 1",
        description: "Wheeled bipedal robot with coaxial powered legs.",
      },
      {
        type: "image",
        src: "/bobopcb.png",
        alt: "Demo Image 1",
        description: "PCB design in KiCad. Includes slots for sensors, encoders, motor driver signals, etc.",
      },
      {
        type: "image",
        src: "/bobolayout.png",
        alt: "Demo Image 1",
        description: "PCB layout.",
      },
      {
        type: "image",
        src: "/boboschematic.png",
        alt: "Demo Image 1",
        description: "PCB schematic.",
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

        {/* Separate More Info */}
      </div>
    </div>
  );
}
