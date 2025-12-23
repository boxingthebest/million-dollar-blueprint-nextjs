"use client";

import { useState, useEffect, useRef } from "react";
import { Play } from "lucide-react";

interface LazyVimeoPlayerProps {
  videoId: string;
  title?: string;
  className?: string;
  thumbnailQuality?: "default" | "hd";
}

export default function LazyVimeoPlayer({
  videoId,
  title = "Video",
  className = "",
  thumbnailQuality = "hd",
}: LazyVimeoPlayerProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: "200px", // Start loading 200px before it comes into view
        threshold: 0,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Fetch Vimeo thumbnail when in view
  useEffect(() => {
    if (!isInView || thumbnailUrl) return;

    // Use Vimeo's oEmbed API to get thumbnail
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
        // Fallback - still allow playing
        setThumbnailUrl(null);
      }
    };

    fetchThumbnail();
  }, [isInView, videoId, thumbnailUrl]);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div
      ref={containerRef}
      className={`relative aspect-video bg-slate-800 rounded-xl overflow-hidden ${className}`}
    >
      {!isPlaying ? (
        // Thumbnail with play button
        <button
          onClick={handlePlay}
          className="absolute inset-0 w-full h-full group cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900"
          aria-label={`Play ${title}`}
        >
          {/* Thumbnail or skeleton */}
          {thumbnailUrl ? (
            <img
              src={thumbnailUrl}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            // Loading skeleton
            <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 animate-pulse flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-slate-600 animate-pulse" />
            </div>
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-cyan-500/90 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-cyan-400 shadow-lg shadow-cyan-500/30">
              <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" fill="white" />
            </div>
          </div>

          {/* Video title */}
          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-white text-sm md:text-base font-medium truncate opacity-90">
              {title}
            </p>
          </div>
        </button>
      ) : (
        // Vimeo iframe (only loads when user clicks play)
        <>
          {!isLoaded && (
            // Loading state while iframe loads
            <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-slate-400 text-sm">Loading video...</p>
              </div>
            </div>
          )}
          <iframe
            src={`https://player.vimeo.com/video/${videoId}?badge=0&autopause=0&autoplay=1&player_id=0&app_id=58479`}
            className={`w-full h-full transition-opacity duration-300 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
            title={title}
            allowFullScreen
            onLoad={() => setIsLoaded(true)}
          />
        </>
      )}
    </div>
  );
}
