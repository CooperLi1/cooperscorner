import React from "react";
import { ProjectHeader, MediaList, type MediaItem, MediaCard } from '@/app/components/projects/ProjectScaffold';
import { Card } from '@/app/components/ui/Card';

export default function ProjectPage() {
  const project = {
    name: "Rechargable Flashlight",
    media: [
      {
        type: "image",
        src: "/flashlightinternals.png",
        alt: "Demo Image 1",
        description: "Group project for engineering class! I did all the electronics and some of the CAD/Assembly. (sorry for the mess) ",
      },
      {
        type: "image",
        src: "/flashlightcad.png",
        alt: "Demo Image 1",
        description: "CAD for the flashlight.",
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
  