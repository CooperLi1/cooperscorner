import React from "react";
import { ProjectHeader, MediaList, type MediaItem, MediaCard } from '@/app/components/projects/ProjectScaffold';
import { Card } from '@/app/components/ui/Card';


export default function ProjectPage() {
  const project = {
    name: "Robot in 12 Hours",
    media: [
        {
        type: "video",
        src: "/ri12hvid.mov",
        alt: "Demo Image 1",
        description: "First finite state machine test! I fixed the slapping later but didn't take another video :(",
      },
    {
        type: "video",
        src: "/ri12hclaw.mov",
        alt: "Demo Image 1",
        description: "Auto-aligning claw with inverse kinematics.",
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
  