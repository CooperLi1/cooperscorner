import React from "react";
import { ProjectHeader, MediaList, type MediaItem, MediaCard } from '@/app/components/projects/ProjectScaffold';
import { Card } from '@/app/components/ui/Card';


export default function ProjectPage() {
  const project = {
    name: "Birthday Gift",
    media: [
      {
        type: "video",
        src: "/birthday.mov",
        description: "Demo.",
      },
      {
        type: "image",
        src: "/birthdaysch.png",
        alt: "Demo Image 1",
        description: "Schematic in KiCAD.",
      },
      {
        type: "image",
        src: "/birthdaypcb.png",
        description: "PCB in KiCad.",
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
      </div>
    </div>
  );
}
