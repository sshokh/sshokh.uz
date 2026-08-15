"use client";

import { useEffect, useState } from "react";

import { MusicPlayer } from "./ui/music-player";

const verbs = {
  0: "playing",
  1: "streaming",
  2: "listening to",
  3: "watching",
  5: "competing in",
};

function fmt(totalSeconds) {
  const s = Math.max(0, Math.floor(totalSeconds));
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${String(sec).padStart(2, "0")}`;
}

export function ActivityCard({ activity }) {
  const { name, details, state, assets, type, timestamps } = activity;

  const verb = verbs[type] ?? "playing";
  const sub = [details, state].filter(Boolean).join(" — ");
  const start = timestamps?.start ? new Date(timestamps.start).getTime() : null;
  const end = timestamps?.end ? new Date(timestamps.end).getTime() : null;

  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!start) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [start]);

  const elapsed = start ? (now - start) / 1000 : 0;
  const total = start && end ? (end - start) / 1000 : 0;
  const progress = total ? Math.min((elapsed / total) * 100, 100) : 0;

  return (
    <div className="flex items-center gap-2.5">
      {type === 2 && assets?.largeImage ? (
        <MusicPlayer coverArt={assets.largeImage} className="size-14" />
      ) : (
        assets?.largeImage && (
          <img
            src={assets.largeImage}
            alt={assets.largeText ?? name}
            className="size-14 shrink-0 rounded object-cover"
          />
        )
      )}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm">
          <span className="text-muted-foreground">{verb} </span>
          <span className="text-foreground lowercase">{name}</span>
        </p>
        {sub && (
          <p className="truncate text-xs text-muted-foreground">{sub}</p>
        )}

        {total ? (
          <div className="mt-1 flex items-center gap-2">
            <div className="h-0.5 flex-1 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full bg-foreground transition-[width] duration-1000 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="shrink-0 text-[10px] tabular-nums text-muted-foreground">
              {fmt(elapsed)} / {fmt(total)}
            </span>
          </div>
        ) : (
          start && (
            <p className="mt-0.5 text-[10px] tabular-nums text-muted-foreground">
              {fmt(elapsed)}
            </p>
          )
        )}
      </div>
    </div>
  );
}
