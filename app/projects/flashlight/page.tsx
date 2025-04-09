import React from "react";

export default function ProjectPage() {
  const project = {
    name: "Rechargable Flashlight",
    media: [
      {
        type: "image",
        src: "/flashlightinternals.png",
        alt: "Demo Image 1",
        description: "Group project for engineering class! I did all the electronics and some of the CAD/Assembly. (sorry for the mess) ",
      },
      {
        type: "image",
        src: "/flashlightcad.png",
        alt: "Demo Image 1",
        description: "CAD for the flashlight.",
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
