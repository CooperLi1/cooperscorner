import React from "react";
import { ProjectHeader, MediaList, type MediaItem, MediaCard } from '@/app/components/projects/ProjectScaffold';
import { Card } from '@/app/components/ui/Card';


export default function ProjectPage() {
  const project = {
    name: "Pipe Traversing Robot",
    media: [
        {
        type: "image",
        src: "/cadarculusbot.png",
        alt: "Demo Image 1",
        description: "Robot CAD in Onshape.",
      },

      {
        type: "image",
        src: "/arculuspcb.png",
        alt: "Demo Image 1",
        description: "Custom designed PCB to control the robot.",
      },
            {
        type: "image",
        src: "/kicadarculuspcb.png",
        alt: "Demo Image 1",
        description: "PCB designed in KiCad.",
      },
      {
        type: "video",
        src: "/demobotmove.mov",
        description: "Bot in action!",
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
  