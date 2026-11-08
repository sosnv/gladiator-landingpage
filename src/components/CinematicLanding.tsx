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

    video.defaultMuted = true;
    video.muted = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");

    try {
      await video.play();

      // Autoplay may begin before React attaches `onPlaying` during hydration.
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

    const retryPlayback = () => {
      const video = videoRef.current;
      if (motionQuery.matches || !video || !video.paused || video.ended) return;
      void playIntro();
    };

    const retryWhenVisible = () => {
      if (document.visibilityState === "visible") retryPlayback();
    };

    applyMotionPreference();
    motionQuery.addEventListener("change", applyMotionPreference);
    window.addEventListener("pageshow", retryPlayback);
    window.addEventListener("pointerdown", retryPlayback, { capture: true });
    window.addEventListener("touchstart", retryPlayback, {
      capture: true,
      passive: true,
    });
    window.addEventListener("keydown", retryPlayback, { capture: true });
    document.addEventListener("visibilitychange", retryWhenVisible);

    return () => {
      motionQuery.removeEventListener("change", applyMotionPreference);
      window.removeEventListener("pageshow", retryPlayback);
      window.removeEventListener("pointerdown", retryPlayback, { capture: true });
      window.removeEventListener("touchstart", retryPlayback, { capture: true });
      window.removeEventListener("keydown", retryPlayback, { capture: true });
      document.removeEventListener("visibilitychange", retryWhenVisible);
    };
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
          onCanPlay={() => {
            if (state !== "reduced" && state !== "ended") void playIntro();
          }}
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
        <SocialLinks />
      </section>

      <p className="sr-only" aria-live="polite">
        {state === "ended"
          ? "Intro zakończone. Linki społecznościowe są dostępne."
          : ""}
        {state === "blocked"
          ? "Animacja uruchomi się po pierwszej interakcji ze stroną."
          : ""}
        {state === "fallback"
          ? "Film nie został załadowany. Wyświetlono ekran końcowy."
          : ""}
      </p>
    </main>
  );
}
