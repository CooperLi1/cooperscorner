import React from "react";
import { ProjectHeader, MediaList, type MediaItem, MediaCard } from '@/app/components/projects/ProjectScaffold';
import { Card } from '@/app/components/ui/Card';

export default function ProjectPage() {
  const project = {
    name: "ESP32 Breakout Board",
    media: [
      {
        type: "image",
        src: "/board.png",
        alt: "Demo Image 1",
        description: "Breakout board for an ESP32 chip designed in Altium.",
      },
      {
        type: "image",
        src: "/routing.png",
        alt: "Demo Image 2",
        description: "Routing for the PCB's top layer.",
      },
      {
        type: "image",
        src: "/schematic.png",
        description: "Schematic for the PCB.",
      }
    ],
  };

    return (
      <div className="min-h-screen px-4 md:px-8 lg:px-16">
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
  