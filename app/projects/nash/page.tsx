import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaFileDownload } from "react-icons/fa"; // Importing file icon
import { Link as LinkIcon } from "lucide-react";
import { ProjectHeader, MediaList, type MediaItem, MediaCard } from '@/app/components/projects/ProjectScaffold';
import { Card } from '@/app/components/ui/Card';

export default function ProjectPage() {
  const project = {
    name: "Wartortle",
    media: [
      {
        type: "image",
        src: "/nashwithlabels.png",
        alt: "Demo Image 1",
        description: "Robot built for FIRST Tech Challenge as part of a team. I fully designed the robot myself, programmed the robot's driver controls/automations, and helped with autonomous pathing.",
      },
      {
        type: "image",
        src: "/nashiterations.png",
        alt: "Demo Image 1",
        description: "Box of past iterations for Nash.",
      },
      {
        type: "video",
        src: "https://www.youtube.com/watch?v=XB2RzayVRN8",
        description: "Nash in action! (our robot is the black and blue one)",
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
            <a
              href="https://drive.google.com/file/d/1nE7wyFtPz6EL7p6OghwGtKaGTj95jwlG/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/15 ring-1 ring-white/10 bg-white/10 hover:bg-white/15 py-3 font-semibold text-sky-200 transition"
            >
              <LinkIcon size={18} />
              More Info
            </a>
          </div>
        </div>
      );
}
