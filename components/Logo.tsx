import Image from "next/image";
import { theme } from "./theme";

interface LogoProps {
  color?: string;
  accent?: string;
  size?: number;
}

export function Logo({ color = theme.ink, size = 24 }: LogoProps) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: size * 0.42, color }}>
      <Image
        src="/logo.png"
        alt="Recurv mark"
        width={size}
        height={size}
        style={{ width: size, height: "auto", display: "block" }}
      />
      <span style={{ fontWeight: 700, fontSize: size * 0.95, letterSpacing: "-0.03em" }}>Recurv</span>
    </div>
  );
}
