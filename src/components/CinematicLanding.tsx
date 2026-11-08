"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { SocialLinks } from "@/components/SocialLinks";
import { siteConfig } from "@/config/site";

type ExperienceState =
  | "loading"
  | "playing"
  | "ended"
  | "blocked"
  | "fallback"
  | "reduced";

const SOCIAL_REVEAL_TIME_SECONDS = 6;

export function CinematicLanding() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [state, setState] = useState<ExperienceState>("loading");
  const [actionsReady, setActionsReady] = useState(false);

  const playIntro = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    try {
      await video.play();

      // Autoplay can begin before React hydrates and attaches `onPlaying`.
      // Synchronize the visual state after play() resolves so the video never
      // remains transparent while it is already running.
      if (
        !video.paused &&
        !video.ended &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        setState("playing");
      }
    } catch {
      setState("blocked");
    }
  }, []);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const applyMotionPreference = () => {
      if (motionQuery.matches) {
        videoRef.current?.pause();
        setState("reduced");
        return;
      }

      setActionsReady(false);
      setState("loading");
      void playIntro();
    };

    applyMotionPreference();
    motionQuery.addEventListener("change", applyMotionPreference);
    return () => motionQuery.removeEventListener("change", applyMotionPreference);
  }, [playIntro]);

  useEffect(() => {
    if (state !== "playing") return;
    const finalFrame = new window.Image();
    finalFrame.src = siteConfig.cinematicVideo.finalFrame;
  }, [state]);

  const revealActions =
    actionsReady || ["ended", "blocked", "fallback", "reduced"].includes(state);
  const showFinalFrame = ["ended", "fallback", "reduced"].includes(state);

  return (
    <main className="cinematic-shell">
      <h1 className="sr-only">GLADIATOR</h1>

      <div
        className="cinematic-backdrop"
        aria-hidden="true"
        style={{ position: "absolute" }}
      >
        <Image
          src={siteConfig.cinematicVideo.poster}
          alt=""
          fill
          priority
          unoptimized
          sizes="100vw"
        />
      </div>

      <div
        className="cinematic-frame"
        aria-hidden="true"
        style={{ position: "absolute" }}
      >
        <Image
          className="cinematic-still cinematic-poster"
          src={siteConfig.cinematicVideo.poster}
          alt=""
          fill
          priority
          unoptimized
          sizes="(max-aspect-ratio: 9/16) 100vw, 57vh"
        />
        {showFinalFrame ? (
          <Image
            className="cinematic-still cinematic-final is-visible"
            src={siteConfig.cinematicVideo.finalFrame}
            alt=""
            fill
            unoptimized
            sizes="(max-aspect-ratio: 9/16) 100vw, 57vh"
          />
        ) : null}
        <video
          ref={videoRef}
          className={`cinematic-video${state === "playing" ? " is-playing" : ""}`}
          src={siteConfig.cinematicVideo.src}
          autoPlay
          muted
          playsInline
          preload="auto"
          poster={siteConfig.cinematicVideo.poster}
          controls={false}
          controlsList="nodownload noplaybackrate noremoteplayback"
          disablePictureInPicture
          tabIndex={-1}
          onPlaying={() => setState("playing")}
          onTimeUpdate={(event) => {
            if (event.currentTarget.currentTime >= SOCIAL_REVEAL_TIME_SECONDS) {
              setActionsReady(true);
            }
          }}
          onEnded={(event) => {
            event.currentTarget.pause();
            setActionsReady(true);
            setState("ended");
          }}
          onError={() => setState("fallback")}
        />
      </div>

      <div className="cinematic-shade" aria-hidden="true" />

      <section
        className={`final-actions${revealActions ? " is-visible" : ""}`}
        aria-label="Linki GLADIATOR"
        aria-hidden={!revealActions}
        inert={!revealActions}
      >
        {state === "blocked" ? (
          <button className="intro-play-button" type="button" onClick={() => void playIntro()}>
            <span aria-hidden="true">▶</span>
            Odtwórz intro
          </button>
        ) : null}

        <SocialLinks />
      </section>

      <p className="sr-only" aria-live="polite">
        {state === "ended" ? "Intro zakończone. Linki społecznościowe są dostępne." : ""}
        {state === "blocked" ? "Automatyczne odtwarzanie zostało zablokowane. Możesz uruchomić intro ręcznie." : ""}
        {state === "fallback" ? "Film nie został załadowany. Wyświetlono ekran końcowy." : ""}
      </p>
    </main>
  );
}
