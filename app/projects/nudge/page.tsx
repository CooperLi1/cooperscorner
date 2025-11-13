import React from "react";
import { ProjectHeader, MediaList, type MediaItem, MediaCard } from '@/app/components/projects/ProjectScaffold';
import { Card } from '@/app/components/ui/Card';


export default function ProjectPage() {
  const project = {
    name: "Nudge Smartwatch (In Progress)",
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
  