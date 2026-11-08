import { siteConfig } from "@/config/site";

type SocialButtonProps = {
  label: string;
  href: string | null;
  icon: React.ReactNode;
};

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.7" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.7 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5H17V3.9a22 22 0 0 0-2.5-.1c-2.5 0-4.2 1.5-4.2 4.3V10H7.5v3h2.8v8h3.4Z" />
    </svg>
  );
}

function SocialButton({ label, href, icon }: SocialButtonProps) {
  const content = (
    <>
      <span className="social-icon" aria-hidden="true">{icon}</span>
      <span>{label}</span>
      {!href ? <span className="social-status">Wkrótce</span> : null}
    </>
  );

  if (!href) {
    return (
      <span className="social-button is-disabled" aria-label={`${label} — profil wkrótce`} aria-disabled="true">
        {content}
      </span>
    );
  }

  return (
    <a
      className="social-button"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Otwórz profil GLADIATOR na ${label}`}
    >
      {content}
    </a>
  );
}

export function SocialLinks() {
  return (
    <nav className="social-links" aria-label="Profile społecznościowe GLADIATOR">
      <SocialButton
        label="Instagram"
        href={siteConfig.social.instagram}
        icon={<InstagramIcon />}
      />
      <SocialButton
        label="Facebook"
        href={siteConfig.social.facebook}
        icon={<FacebookIcon />}
      />
    </nav>
  );
}
