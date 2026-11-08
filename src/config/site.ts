export const siteConfig = {
  name: "GLADIATOR",
  tagline: "Siła • Honor • Charakter",
  description:
    "GLADIATOR — lokalny sklep z suplementami dla ludzi, którzy budują siłę, honor i charakter.",
  social: {
    instagram: "https://www.instagram.com/gladiator_bydgoszcz_odzywki/" as string | null,
    facebook: "https://www.facebook.com/gladiatorsklep/?locale=pl_PL" as string | null,
  },
  cinematicVideo: {
    src: "/videos/final-animation.mp4",
    poster: "/images/gladiator-intro-poster.webp",
    finalFrame: "/images/gladiator-intro-final.webp",
  },
  intro: {
    enabled: false,
    src: "/videos/intro.mp4",
  },
  arenaVideo: {
    enabled: true,
    src: "/videos/arena-bg.mp4",
    poster: "/images/arena-poster.webp",
  },
} as const;
