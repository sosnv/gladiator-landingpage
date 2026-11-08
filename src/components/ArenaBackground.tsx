"use client";

import Image from "next/image";
import { useState } from "react";
import { EmberParticles } from "@/components/EmberParticles";
import { siteConfig } from "@/config/site";

export function ArenaBackground() {
  const showVideo = siteConfig.arenaVideo.enabled;
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="arena" aria-hidden="true">
      <div className="arena-fallback">
        <div className="arena-sky" />
        <div className="arena-architecture">
          <div className="arena-wall arena-wall-left" />
          <div className="arena-wall arena-wall-right" />
          <div className="arena-arches" />
        </div>
        <div className="arena-floor" />
        <div className="torch torch-left"><span /></div>
        <div className="torch torch-right"><span /></div>
        <div className="smoke smoke-one" />
        <div className="smoke smoke-two" />
      </div>

      <div className="arena-poster">
        <Image
          src={siteConfig.arenaVideo.poster}
          alt=""
          fill
          priority
          unoptimized
          sizes="100vw"
        />
      </div>

      {showVideo ? (
        <video
          className={`arena-video${isPlaying ? " is-playing" : ""}`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={siteConfig.arenaVideo.poster}
          disablePictureInPicture
          tabIndex={-1}
          onPlaying={() => setIsPlaying(true)}
          onError={() => setIsPlaying(false)}
        >
          <source
            src={siteConfig.arenaVideo.src}
            type="video/mp4"
            media="(prefers-reduced-motion: no-preference)"
          />
        </video>
      ) : null}

      <div className="arena-overlay" />
      <div className="ambient-light" />
      <EmberParticles />
      <div className="film-grain" />
      <div className="scene-vignette" />
    </div>
  );
}
