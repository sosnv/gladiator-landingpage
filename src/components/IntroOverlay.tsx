"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site";

/**
 * Warstwa przygotowana pod przyszły materiał 3–4 s. Domyślnie wyłączona,
 * dzięki czemu brak pliku wideo nie wywołuje błędnego playera ani loadera.
 * SVG pozostaje niezależną warstwą sceny końcowej.
 */
export function IntroOverlay() {
  const [visible, setVisible] = useState(siteConfig.intro.enabled);

  if (!visible) return null;

  return (
    <div className="intro-overlay" aria-hidden="true">
      <video
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={() => setVisible(false)}
        onError={() => setVisible(false)}
      >
        <source src={siteConfig.intro.src} type="video/mp4" />
      </video>
    </div>
  );
}
