"use client";

import { useEffect, useState } from "react";

import {
  ThemeToggle,
  AgeCounter,
  ActivityCard,
  SocialButton,
  ProjectCard,
} from "@/components";
import { Skeleton } from "@/components/ui/skeleton";
import { AsciiArt } from "@/components/ui/ascii-art";
import { GitHub, Telegram } from "@/icons";
import resolveImage from "@/lib/app-icons";

// Set NEXT_PUBLIC_TARGET_ID to your Discord user id (and join discord.gg/lanyard)
// to enable live presence. Without it we simply stay "offline".
const TARGET_ID = process.env.NEXT_PUBLIC_TARGET_ID;
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const socials = [
  { type: "link", icon: <GitHub />, value: "https://github.com/sshokh" },
  { type: "copy", icon: <Telegram />, value: "wavdd" },
];

// Render a bio line, expanding the live {age} token and [label](url) links.
function renderBio(text) {
  const regex = /\{age\}|\[([^\]]+)\]\(([^)]+)\)/g;
  const nodes = [];
  let last = 0;
  let key = 0;
  let m;
  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    if (m[0] === "{age}") {
      nodes.push(<AgeCounter key={key++} />);
    } else {
      nodes.push(
        <a
          key={key++}
          className="border-b border-border text-foreground hover:border-foreground"
          href={m[2]}
          target="_blank"
          rel="noreferrer"
        >
          {m[1]}
        </a>,
      );
    }
    last = regex.lastIndex;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export default function Home() {
  const [activities, setActivities] = useState([]);
  const [projects, setProjects] = useState([]);
  const [stack, setStack] = useState([]);
  const [bio, setBio] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${SERVER_URL}/api/data/`)
      .then((r) => r.json())
      .then((data) => {
        setProjects(data.projects ?? []);
        setStack((data.skills ?? []).map((s) => s.replace("dot", ".")));
        setBio(data.bio ?? []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!TARGET_ID) return; // no id → skip the socket, stay offline

    const socket = new WebSocket("wss://api.lanyard.rest/socket");
    let heartbeatInterval;

    socket.onmessage = async (event) => {
      const payload = JSON.parse(event.data);

      if (payload.op === 1) {
        heartbeatInterval = setInterval(
          () => socket.send(JSON.stringify({ op: 3 })),
          payload.d?.heartbeat_interval,
        );

        socket.send(
          JSON.stringify({ op: 2, d: { subscribe_to_id: TARGET_ID } }),
        );
      } else if (payload.op === 0) {
        const resolved = await Promise.all(
          (payload.d.activities ?? [])
            .filter((a) => a.type !== 4)
            .map(async (a) => {
              const assets = a.assets || {};
              const appId = a.application_id;

              return {
                type: a.type ?? 0,
                name: a.name ?? "Unknown",
                details: a.details ?? null,
                state: a.state ?? null,
                timestamps: a.timestamps ?? null,
                assets: {
                  largeImage: await resolveImage(assets.large_image, appId),
                  largeText: assets.large_text ?? a.name ?? null,
                  smallImage: await resolveImage(assets.small_image, appId),
                  smallText: assets.small_text ?? null,
                },
              };
            }),
        );

        setActivities(resolved);
      }
    };

    socket.onclose = () => setActivities([]);
    socket.onerror = () => setActivities([]);

    return () => {
      socket.close();
      if (heartbeatInterval) clearInterval(heartbeatInterval);
    };
  }, []);

  return (
    <main className="reveal mx-auto flex min-h-screen max-w-sm flex-col justify-center gap-7 px-6 py-20">
      {/* intro */}
      <div className="flex items-start gap-4">
        <img
          src="/face.jpg"
          alt="shokhjahon"
          className="size-24 shrink-0 mt-2 object-cover grayscale"
        />
        <div>
          <div className="flex items-center gap-1 font-medium">
            shokhjahon <ThemeToggle />
          </div>
          <ul className="text-muted-foreground text-sm">
            {loading
              ? ["h-3 w-44", "h-3 w-24", "h-3 w-32"].map((w, i) => (
                  <li key={i} className="py-[3px]">
                    <Skeleton className={w} />
                  </li>
                ))
              : bio.map((line, i) => <li key={i}>{renderBio(line)}</li>)}
          </ul>

          {/* links */}
          <div className="mt-2 flex items-center gap-3">
            {socials.map((s, i) => (
              <SocialButton key={i} social={s} />
            ))}
          </div>
        </div>
      </div>

      {/* status */}
      {activities.length > 0 ? (
        <div className="space-y-1">
          {activities.map((a, i) => (
            <ActivityCard activity={a} key={i} />
          ))}
        </div>
      ) : null}

      {/* projects */}
      <div>
        <p className="mb-1 text-xs text-muted-foreground">projects</p>
        <div className="flex flex-col">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 border-t border-border py-2 last:border-b"
                >
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="ml-auto size-3" />
                </div>
              ))
            : projects.map((p) => <ProjectCard project={p} key={p.id} />)}
        </div>
      </div>

      {/* stack */}
      {loading ? (
        <Skeleton className="h-3 w-full max-w-[15rem]" />
      ) : (
        <p className="text-xs leading-relaxed text-muted-foreground">
          {stack.join(" · ")}
        </p>
      )}
    </main>
  );
}
