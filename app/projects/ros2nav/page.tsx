import React from "react";
import { Link as LinkIcon } from "lucide-react";
import { ProjectHeader, MediaList, type MediaItem, MediaCard } from '@/app/components/projects/ProjectScaffold';
import { Card } from '@/app/components/ui/Card';

export default function ProjectPage() {
  const project = {
    name: "Ros 2 + SLAM Explorer",
    media: [
      {
        type: "video",
        src: "/ros2navdemo.mp4",
        alt: "Demo Image 1",
        description: "Demo!",
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
            {/* <a
              href="https://quantatalent.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="project-action-link"
            >
              <LinkIcon size={18} />
              Try It
            </a> */}
          </div>
        </div>
      );
}
