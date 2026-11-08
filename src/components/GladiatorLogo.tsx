import Image from "next/image";

export function GladiatorLogo() {
  return (
    <div className="logo-stage">
      <div className="logo-aura" aria-hidden="true" />
      <div className="logo-frame">
        <Image
          className="gladiator-logo"
          src="/images/gladiator-logo.svg"
          alt="GLADIATOR — hełm gladiatora, tarcza i ciężary"
          width={1200}
          height={1200}
          priority
          unoptimized
        />
      </div>
    </div>
  );
}
