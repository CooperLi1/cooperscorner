import React from "react";
import { ProjectHeader, MediaList, type MediaItem, MediaCard } from '@/app/components/projects/ProjectScaffold';
import { Card } from '@/app/components/ui/Card';


export default function ProjectPage() {
  const project = {
    name: "Lucky (In Progress)",
    media: [
      {
        type: "video",
        src: "/luckyik.mov",
        alt: "Demo Image 1",
        description: "Inverse kinematics + motion profiled PIDs demo.",
      },
      {
        type: "video",
        src: "/luckydances.mov",
        alt: "Demo Image 1",
        description: "Lucky performing actions on voice command for my AP Lit project (imitating Lucky from Waiting for Godot).",
      },
      {
        type: "video",
        src: "/luckybalance.mov",
        alt: "Demo Image 1",
        description: "Currently working on improving balancing code so I can remove Lucky's training wheels.",
      },
      {
        type: "image",
        src: "/luckycircuit.png",
        alt: "Demo Image 1",
        description: "Test circuit. Lucky is controlled by a PC communicating to ESP32 with UDP, and then the ESP32 communicating with the main Teensy microcontroler via UART.",
      },
      {
        type: "image",
        src: "/luckypcb.png",
        alt: "Demo Image 1",
        description: "PCB on the robot.",
      },
      {
        type: "image",
        src: "/luckyparts.png",
        alt: "Demo Image 1",
        description: "Parts for Lucky manufactured in house.",
      },
      {
        type: "image",
        src: "/bobocad.png",
        alt: "Demo Image 1",
        description: "CAD in Onshape.",
      },
      {
        type: "image",
        src: "/bobopcb.png",
        alt: "Demo Image 1",
        description: "PCB design in KiCad. Includes slots for sensors, encoders, motor driver signals, etc.",
      },
      {
        type: "image",
        src: "/bobolayout.png",
        alt: "Demo Image 1",
        description: "PCB layout.",
      },
      {
        type: "image",
        src: "/boboschematic.png",
        alt: "Demo Image 1",
        description: "PCB schematic.",
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
