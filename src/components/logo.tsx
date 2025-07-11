import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary"
      >
        <path
          d="M28 12L18.8571 18.2857L28 24.5714V12Z"
          fill="currentColor"
          fillOpacity="0.5"
        />
        <path
          d="M13.1429 3.42856L4 9.71428V22.2857L13.1429 28.5714L22.2857 22.2857V9.71428L13.1429 3.42856Z"
          fill="currentColor"
        />
      </svg>
      <span className="text-xl font-bold text-foreground">Flux Academy</span>
    </div>
  );
}
