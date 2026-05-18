import React from "react";
import { ProjectHeader, MediaList, type MediaItem, MediaCard } from '@/app/components/projects/ProjectScaffold';
import { Card } from '@/app/components/ui/Card';
import { Link as LinkIcon } from "lucide-react";


export default function ProjectPage() {
    const project = {
        name: "Dugtrio",
        media: [
            {
                type: "video",
                src: "https://www.youtube.com/watch?v=c5ZM6A-tWvc",
                description: "Dugtrio in action!",
            },
            {
                type: "image",
                src: "/dugtriocad.png",
                alt: "Demo Image 1",
                description: "CAD of Dugtrio.",
            },
            // {
            //     type: "image",
            //     src: "/dugtrio.png",
            //     alt: "Demo Image 1",
            //     description: "Triple shooter + turret robot.",
            // },
            // {
            //     type: "video",
            //     src: "/6wd.mov",
            //     alt: "Demo Image 1",
            //     description: "6WD chassis prevents pushing.",
            // },
            {
                type: "video",
                src: "/ratchetpto.mov",
                alt: "Demo Image 1",
                description: "Old ratchet + power takeoff assembly to lift robot off the floor.",
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
                    href="https://drive.google.com/file/d/1yZF7Rh9eeIUfDzdKA-Iqfd0n8_niBwGM/view?usp=sharing"
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
