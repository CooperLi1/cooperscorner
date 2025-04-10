import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaFileDownload } from "react-icons/fa"; // Importing file icon
import { Link as LinkIcon } from "lucide-react";

export default function ProjectPage() {
  const project = {
    name: "Macadamia",
    media: [
      {
        type: "image",
        src: "/macwithlabels.png",
        alt: "Demo Image 1",
        description: "Robot built for FIRST Tech Challenge as part of a team. I designed the scoring and intake systems.",
      },
      {
        type: "video",
        src: "https://www.youtube.com/watch?v=K4Hwa720AoU",
        description: "Macadamia in action!",
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
                <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                <iframe
                    src={item.src.replace("watch?v=", "embed/")}
                    title="YouTube video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                />
                </div>
            )}            <div className="p-4">
              <p className="text-gray-300">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className='h-[30px]'/>

        {/* More Info as full-width subtle button */}
        <a
        href={'https://drive.google.com/file/d/13Bv094iedH3Wj7rRBYuclMVWgldvb0Y-/view?usp=sharing'}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full bg-gray-700 hover:bg-gray-600 text-sky-300 text-2xl underline py-3 rounded-lg font-semibold text-center flex items-center justify-center gap-2 transition"
        >
        <LinkIcon size={20} /> More Info
        </a>
    </div>
  );
}
