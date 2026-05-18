import React from "react";
import { ProjectHeader, MediaList, type MediaItem, MediaCard } from '@/app/components/projects/ProjectScaffold';
import { Card } from '@/app/components/ui/Card';


export default function ProjectPage() {
  const project = {
    name: "Recycla V1",
    media: [
      {
        type: "image",
        src: "/planetary.png",
        alt: "Demo Image 1",
        description: "Split-ring compound planetary gearbox for spooling achieving 72.5 to 1 reduction.",
      },
            {
        type: "image",
        src: "/recycla.png",
        alt: "Demo Image 1",
        description: "Full design.",
      },
      {
        type: "image",
        src: "/recyclav1.png",
        alt: "Demo Image 1",
        description: "Recycla build.",
      },
      {
        type: "video",
        src: "/cut.mov",
        description: "Bottle cutter",
      },
      {
        type: "video",
        src: "/recycle.mov",
        description: "Recycla in action!",
      },
      {
        type: "image",
        src: "/rpet.png",
        description: "Recycled bottle Benchy.",
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
  