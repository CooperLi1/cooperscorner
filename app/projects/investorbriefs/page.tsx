'use client';
import React, { useEffect, useRef } from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaFileDownload } from "react-icons/fa";
import { Link as LinkIcon } from "lucide-react";
import { ProjectHeader, MediaList, type MediaItem, MediaCard } from '@/app/components/projects/ProjectScaffold';
import { Card } from '@/app/components/ui/Card';

export default function ProjectPage() {
  const playerRef = useRef<any>(null);

  const project = {
    name: "InvestorBriefs",
    media: [
      {
        type: "video",
        src: "https://www.youtube.com/watch?v=Fxuv3Z0Ggsw",
        description:
          "InvestorBriefs demo video. Uses finance APIs like AlphaVantage and yfinance, as well as NewsAPI. AI using OpenAI API, graphing with ReCharts, and authentication with Clerk.",
      },
    ],
  };

  useEffect(() => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    (window as any).onYouTubeIframeAPIReady = () => {
      playerRef.current = new (window as any).YT.Player("youtube-player", {
        videoId: "Fxuv3Z0Ggsw",
        events: {
          onReady: (event: any) => {
            event.target.setPlaybackRate(2);
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
                href="https://investorbriefs.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/15 ring-1 ring-white/10 bg-white/10 hover:bg-white/15 py-3 font-semibold text-sky-200 transition"
              >
                <LinkIcon size={18} />
                Try it for yourself!
              </a>
            </div>
          </div>
        );
}
