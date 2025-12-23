"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Volume2, VolumeX } from "lucide-react";

interface LazyVimeoPlayerProps {
  videoId: string;
  title?: string;
  className?: string;
  autoPlayOnScroll?: boolean;
}

export default function LazyVimeoPlayer({
  videoId,
  title = "Video",
  className = "",
  autoPlayOnScroll = true,
}: LazyVimeoPlayerProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldPlay, setShouldPlay] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(true); // Start muted for autoplay
  const containerRef = useRef<HTMLDivElement>(null);
  const hasTriggeredAutoplay = useRef(false);

  // Fetch Vimeo thumbnail immediately on mount
  useEffect(() => {
    const fetchThumbnail = async () => {
      try {
        const response = await fetch(
          `https://vimeo.com/api/oembed.json?url=https://vimeo.com/${videoId}&width=1280`
        );
        const data = await response.json();
        if (data.thumbnail_url) {
          // Get higher quality thumbnail
          const hdThumbnail = data.thumbnail_url
            .replace(/_\d+x\d+/, "_1280x720")
            .replace(/\?.*$/, "");
          setThumbnailUrl(hdThumbnail);
        }
      } catch (error) {
        console.error("Failed to fetch Vimeo thumbnail:", error);
      }
    };

    fetchThumbnail();
  }, [videoId]);

  // Auto-play when scrolled into view
  useEffect(() => {
    if (!autoPlayOnScroll || hasTriggeredAutoplay.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Trigger when 50% of the video is visible
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            hasTriggeredAutoplay.current = true;
            setShouldPlay(true);
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.5, // 50% visibility required
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [autoPlayOnScroll]);

  const handleManualPlay = () => {
    setShouldPlay(true);
    setIsMuted(false); // Unmute when manually clicked
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // Build Vimeo URL with parameters
  const vimeoUrl = `https://player.vimeo.com/video/${videoId}?badge=0&autopause=0&autoplay=1&muted=${isMuted ? 1 : 0}&player_id=0&app_id=58479`;

  return (
    <div
      ref={containerRef}
      className={`relative aspect-video bg-slate-800 rounded-xl overflow-hidden ${className}`}
    >
      {!shouldPlay ? (
        // Thumbnail with play button - shows presenter
        <button
          onClick={handleManualPlay}
          className="absolute inset-0 w-full h-full group cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900"
          aria-label={`Play ${title}`}
        >
          {/* Thumbnail showing the presenter */}
          {thumbnailUrl ? (
            <img
              src={thumbnailUrl}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            // Loading skeleton while thumbnail loads
            <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 animate-pulse" />
          )}

          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

          {/* Play button - smaller and more elegant */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-white shadow-2xl">
              <Play className="w-7 h-7 md:w-8 md:h-8 text-slate-900 ml-1" fill="currentColor" />
            </div>
          </div>

          {/* Video duration badge */}
          <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-md">
            <span className="text-white text-sm font-medium">0:55</span>
          </div>
        </button>
      ) : (
        // Vimeo iframe - loads when auto-played or clicked
        <>
          {!isLoaded && (
            // Loading state with thumbnail background
            <div className="absolute inset-0 flex items-center justify-center">
              {thumbnailUrl && (
                <img
                  src={thumbnailUrl}
                  alt={title}
                  className="absolute inset-0 w-full h-full object-cover opacity-50"
                />
              )}
              <div className="relative flex flex-col items-center gap-3 z-10">
                <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
                <p className="text-white text-sm font-medium">Loading video...</p>
              </div>
            </div>
          )}
          <iframe
            src={vimeoUrl}
            className={`w-full h-full transition-opacity duration-500 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
            title={title}
            allowFullScreen
            onLoad={() => setIsLoaded(true)}
          />
          
          {/* Unmute prompt for autoplay */}
          {isLoaded && isMuted && (
            <button
              onClick={toggleMute}
              className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/80 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-black transition-colors animate-pulse"
            >
              <VolumeX className="w-4 h-4" />
              Click to unmute
            </button>
          )}
        </>
      )}
    </div>
  );
}
