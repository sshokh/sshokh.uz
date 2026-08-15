"use client";

import { cn } from "@/lib/utils";

// A spinning vinyl disc that shows `coverArt` as the record label.
// Purely decorative — it never stops moving.
export function MusicPlayer({ className, coverArt, spinDuration = 4, ...props }) {
  return (
    <div
      className={cn(
        "relative aspect-square shrink-0 overflow-hidden rounded-full",
        className,
      )}
      {...props}
    >
      <div
        className="h-full w-full animate-spin rounded-full border-2 border-black/10 bg-black shadow-md dark:border-white/10"
        style={{ animationDuration: `${spinDuration}s` }}
      >
        {/* album cover */}
        <div
          className="absolute inset-0 rounded-full bg-cover bg-center opacity-90"
          style={{ backgroundImage: `url(${coverArt})` }}
        />

        {/* grooves */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle, transparent 20%, rgba(0,0,0,0.4) 21%, transparent 22%, transparent 35%, rgba(0,0,0,0.5) 36%, transparent 37%, transparent 50%, rgba(0,0,0,0.3) 51%, transparent 52%, transparent 65%, rgba(0,0,0,0.6) 66%, transparent 67%, transparent 80%, rgba(0,0,0,0.4) 81%, transparent 82%)",
          }}
        />

        {/* glare */}
        <div
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.2) 100%)",
          }}
        />

        {/* center label + pin hole */}
        <div className="absolute left-1/2 top-1/2 flex size-1/3 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 shadow-inner">
          <div className="size-[18%] rounded-full border border-black/40 bg-zinc-300 dark:bg-zinc-600" />
        </div>
      </div>
    </div>
  );
}
