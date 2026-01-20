import { cn } from "@/lib/utils";

interface ShineBorderProps {
  borderRadius?: number;
  borderWidth?: number;
  duration?: number;
  color?: string;
  className?: string;
  children: React.ReactNode;
}

export function ShineBorder({
  borderRadius = 8,
  borderWidth = 1,
  duration = 14,
  color = "#fff",
  className,
  children,
}: ShineBorderProps) {
  return (
    <div
      style={
        {
          "--border-radius": `${borderRadius}px`,
          "--border-width": `${borderWidth}px`,
          "--border-color": color,
          "--duration": `${duration}s`,
          "--mask-linear-gradient": `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
          "--background": `linear-gradient(${color}, ${color}) padding-box, conic-gradient(from 0deg, transparent, ${color}, transparent 30%, ${color} calc(100% - 30%), transparent) border-box`,
        } as React.CSSProperties
      }
      className={cn(
        "relative rounded-[var(--border-radius)] p-[var(--border-width)] transition-all duration-300 ease-in-out",
        "before:absolute before:inset-0 before:rounded-[var(--border-radius)] before:p-[var(--border-width)] before:[background:var(--background)] before:[mask:var(--mask-linear-gradient)] before:[mask-composite:xor] before:[mask-composite:exclude] before:opacity-0 before:transition-opacity before:duration-300 before:content-['']",
        "after:absolute after:inset-0 after:rounded-[var(--border-radius)] after:p-[var(--border-width)] after:[background:conic-gradient(from_0deg,transparent,var(--border-color),transparent_65%,var(--border-color)_calc(100%-35%),transparent)] after:[mask:var(--mask-linear-gradient)] after:[mask-composite:xor] after:[mask-composite:exclude] after:animate-[spin_calc(var(--duration)*1s)_linear_infinite] after:opacity-100 after:transition-opacity after:duration-300 after:content-['']",
        "hover:before:opacity-100",
        className,
      )}
    >
      {children}
    </div>
  );
}
