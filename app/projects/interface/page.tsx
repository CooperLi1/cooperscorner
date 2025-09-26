import React from "react";

export default function ProjectPage() {
  const project = {
    name: "Sensor Interface PCB",
    media: [
      {
        type: "image",
        src: "/interfaceschematic.png",
        alt: "Demo Image 1",
        description: "Schematic for sensor interface.",
      },
            {
        type: "image",
        src: "/interfacefootprint.png",
        alt: "Demo Image 1",
        description: "Footprint for PCB.",
      },
            {
        type: "image",
        src: "/interface.png",
        alt: "Demo Image 1",
        description: "3d view for PCB.",
      },
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
