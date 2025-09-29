import React from "react";
import { ProjectHeader, MediaList, type MediaItem, MediaCard } from '@/app/components/projects/ProjectScaffold';
import { Card } from '@/app/components/ui/Card';

export default function ProjectPage() {
  const project = {
    name: "Polyformer",
    media: [
      {
        type: "image",
        src: "/polyformerpic.png",
        alt: "Demo Image 1",
        description: "The polyformer recycles plastic water bottles into 3D printer filament. The build was based on Reiten Cheng's open source Polyformer design.",
      },
      // {
      //   type: "image",
      //   src: "/images/demo2.jpg",
      //   alt: "Demo Image 2",
      //   description: "Bottles are first shredded before they are fed into the machine.",
      // },
      {
        type: "video",
        src: "/polyformer.mov",
        description: "Polyformer in action!",
      },
      {
        type: "image",
        src: "/rpet.png",
        description: "Printed benchy using polyformer filament.",
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
  