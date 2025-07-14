'use client';
import React, { useEffect, useRef } from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaFileDownload } from "react-icons/fa";
import { Link as LinkIcon } from "lucide-react";

export default function ProjectPage() {
  const playerRef = useRef<any>(null);

  const project = {
    name: "Debatify",
    media: [
      {
        type: "video",
        src: "https://www.youtube.com/watch?v=mmJlVw_wZig",
        description:
          "Debatify demo video. Uses NextJS and Supabase. DebatifyAI pipeline uses search with brave search, scraping with cheerio, and AI using fine-tuned gemini model.",
      },
    ],
  };

  useEffect(() => {
    // Load the YouTube IFrame API
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    // This function will be called by the YouTube API
    (window as any).onYouTubeIframeAPIReady = () => {
      playerRef.current = new (window as any).YT.Player("youtube-player", {
        videoId: "mmJlVw_wZig", // Extracted from the URL
        events: {
          onReady: (event: any) => {
            event.target.setPlaybackRate(2); // Set to 2x speed
          },
        },
        playerVars: {
          autoplay: 0,
          modestbranding: 1,
          rel: 0,
        },
      });
    };
  }, []);

  return (
    <div className="bg-gray-800 min-h-screen text-white p-4">
      <h1 className="text-4xl font-bold mb-8">{project.name}</h1>

      <div className="space-y-12">
        {project.media.map((item, index) => (
          <div
            key={index}
            className="rounded-xl overflow-hidden shadow-lg bg-gray-700"
          >
            {item.type === "video" && (
              <div
                style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}
              >
                <div
                  id="youtube-player"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                />
              </div>
            )}
            <div className="p-4">
              <p className="text-gray-300">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="h-[30px]" />

      <a
        href={"https://www.debatify.app/"}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full bg-gray-700 hover:bg-gray-600 text-sky-300 text-2xl underline py-3 rounded-lg font-semibold text-center flex items-center justify-center gap-2 transition"
      >
        <LinkIcon size={20} /> Try it for yourself!
      </a>
    </div>
  );
}
