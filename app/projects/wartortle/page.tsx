import React from "react";
import { Card } from '@/app/components/ui/Card';
import { ProjectHeader, MediaList, type MediaItem, MediaCard } from '@/app/components/projects/ProjectScaffold';
import { Link as LinkIcon } from 'lucide-react';


export default function ProjectPage() {
  const project = {
    name: "Wartortle",
    media: [
      {
        type: "image",
        src: "/wartortlewithlabels.png",
        alt: "Demo Image 1",
        description: "Robot built for FIRST Tech Challenge as part of a team. I worked primarily on hardware+electronics (with a bit of software) and designed the robot individually.",
      },
      {
        type: "video",
        src: "https://www.youtube.com/watch?v=jKsmP8jkICs",
        description: "Wartortle in action!",
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
          href="https://drive.google.com/file/d/1HFIE8NhjZSdRIJ9tZvY2M0uQHqLXi4MV/view?usp=sharing"
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
