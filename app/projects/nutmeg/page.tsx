import React from "react";
import { Link as LinkIcon } from "lucide-react";
import { ProjectHeader, MediaList, type MediaItem, MediaCard } from '@/app/components/projects/ProjectScaffold';
import { Card } from '@/app/components/ui/Card';

export default function ProjectPage() {
  const project = {
    name: "Nutmeg",
    media: [
      {
        type: "image",
        src: "/nutmegwithlabels.png",
        alt: "Demo Image 1",
        description: "Robot built for FIRST Tech Challenge as part of a team. I fully designed and built the robot myself, programmed the robot's driver controls/automations, and helped with autonomous pathing.",
      },
      {
        type: "video",
        src: "https://www.youtube.com/watch?v=xusgLM1go-0",
        description: "Nutmeg in action!",
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
          <a
            href="https://drive.google.com/file/d/1NUxis38lWd27DtvThgYHkmvACUM3keXy/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="project-action-link"
          >
            <LinkIcon size={18} />
            More Info
          </a>
        </div>
      </div>
    );
}
