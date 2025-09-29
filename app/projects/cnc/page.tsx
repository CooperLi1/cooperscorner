import React from "react";

export default function ProjectPage() {
  const project = {
    name: "CNC Machine (In progress)",
    media: [
      {
        type: "image",
        src: "/cncpic.png",
        alt: "Demo Image 1",
        description: "My CAD for the CNC Machine.",
      },
      {
        type: "image",
        src: "/cncmech.png",
        alt: "Demo Image 1",
        description: "Mechanically finished after a messy late night grind!",
      },
      {
        type: "image",
        src: "/cncenclosure.png",
        alt: "Demo Image 1",
        description: "Electronics enclosure! Modified off open source design from PrintNC.",
      }
    ],
  };

  return (
    <div className="bg-gray-800 min-h-screen text-white p-4">
      <h1 className="text-4xl font-bold mb-8">{project.name}</h1>

      <div className="space-y-12">
        {project.media.map((item, index) => (
          <div key={index} className="rounded-xl overflow-hidden shadow-lg bg-gray-700">
            {item.type === "image" && (
              <img src={item.src} alt={item.alt} className="w-full object-cover" />
            )}
            {item.type === "video" && (
              <video controls className="w-full">
                <source src={item.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
            <div className="p-4">
              <p className="text-gray-300">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
