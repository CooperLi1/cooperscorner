import React from "react";
import { ProjectHeader, MediaList, type MediaItem, MediaCard } from '@/app/components/projects/ProjectScaffold';
import { Card } from '@/app/components/ui/Card';

export default function ProjectPage() {
  const project = {
    name: "Sensor Interface PCB",
    media: [
      {
        type: "image",
        src: "/interfaceschematic.png",
        alt: "Demo Image 1",
        description: "Schematic for sensor interface.",
      },
            {
        type: "image",
        src: "/interfacefootprint.png",
        alt: "Demo Image 1",
        description: "Footprint for PCB.",
      },
            {
        type: "image",
        src: "/interface.png",
        alt: "Demo Image 1",
        description: "3d view for PCB.",
      },
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
  