import React from "react";
import { ProjectHeader, MediaList, type MediaItem, MediaCard } from '@/app/components/projects/ProjectScaffold';
import { Card } from '@/app/components/ui/Card';

export default function ProjectPage() {
  const project = {
    name: "PipSqueak (In Progress)",
    media: [
      {
        type: "image",
        src: "/pipettecad.png",
        description: "CAD of automatic pipetting gantry, still in progress. Censored because this project is being built for a local biotech firm.",
      },
      {
        type: "image",
        src: "/pipsqueakpcb.png",
        description: "PCB for pipsqueak.",
      },
      {
        type: "image",
        src: "/pipsqueakrouting.png",
        description: "PCB footprint.",
      },
      {
        type: "image",
        src: "/pipsqueaksch.png",
        description: "PCB schematic",
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
  
