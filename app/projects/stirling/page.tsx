import React from "react";
import { ProjectHeader, MediaList, type MediaItem, MediaCard } from '@/app/components/projects/ProjectScaffold';
import { Card } from '@/app/components/ui/Card';

export default function ProjectPage() {
  const project = {
    name: "Stirling Engine",
    media: [
      {
        type: "image",
        src: "/stirlingv1.png",
        alt: "Demo Image 1",
        description: "First version of striling engine. It didn't work, too inefficient :(",
      },
      {
        type: "image",
        src: "/stirlingcad.png",
        alt: "Demo Image 1",
        description: "CAD for new version of stirling engine.",
      },
      {
        type: "image",
        src: "/stirling.png",
        alt: "Demo Image 1",
        description: "Stirling engine v2. I did a lot of tinkering but it isn't working and I'm not sure why. Maybe I'll revist it later.",
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
