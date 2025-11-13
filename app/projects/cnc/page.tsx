import React from "react";
import { ProjectHeader, MediaList, type MediaItem, MediaCard } from '@/app/components/projects/ProjectScaffold';
import { Card } from '@/app/components/ui/Card';


export default function ProjectPage() {
  const project = {
    name: "CNC Machine",
    media: [
      {
        type: "image",
        src: "/cncpic.png",
        alt: "Demo Image 1",
        description: "My CAD for the CNC Machine.",
      },
      {
        type: "image",
        src: "/cncenclosure.png",
        alt: "Demo Image 1",
        description: "Electronics enclosure! Modified off open source design from PrintNC.",
      },
      {
        type: "image",
        src: "/cncdone.png",
        alt: "Demo Image 1",
        description: "Finally finished!",
      },
      {
        type: "video",
        src: "/cncfirstcut.mov",
        alt: "Demo Image 1",
        description: "First cut!",
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
  