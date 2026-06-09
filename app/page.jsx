"use client";

import { Avatar, Card, Link, ScrollShadow } from "@heroui/react";
import {
  ActivityCard,
  SocialButton,
  ProjectCard,
  IconCloud,
  Marquee,
} from "./components";
import { useState, useEffect } from "react";
import { GitHub, Telegram } from "@/app/icons/";
import { ArrowDownRight } from "@gravity-ui/icons";
import data from "@/data.json";
import resolveImage from "@/app/utils/app-icons";

const BIRTH = +new Date(2010, 0, 2);
const calcAge = () => ((Date.now() - BIRTH) / 31557600000).toFixed(8);

const socials = [
  {
    type: "link",
    icon: <GitHub />,
    value: "https://github.com/sshokh",
  },
  {
    type: "copy",
    icon: <Telegram />,
    value: "wavdd",
  },
];

export default function Home() {
  const [activities, setActivities] = useState([]);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [age, setAge] = useState(calcAge);

  const bio = [
    "// frontend web developer",
    `// ${age} years in`,
    "// proud holder of IELTS 7.5",
    <span>
      <span>// outside of code, I play (mostly) </span>
      <Link href="https://steamcommunity.com/id/8996055260/">story games</Link>
    </span>,
  ];

  useEffect(() => {
    setProjects(
      data.projects.map((p) => ({
        skills: [p.skills.map((s) => s.replace("dot", "."))],
        ...p,
      })),
    );
    setSkills(
      data.skills.map((s) => ({
        name: s.replace("dot", "."),
        link: `https://cdn.simpleicons.org/${s}/ffffff`,
      })),
    );

    const ageInterval = setInterval(() => setAge(calcAge()), 100);

    const socket = new WebSocket("wss://api.lanyard.rest/socket");
    let heartbeatInterval;

    socket.onopen = () => {
      console.log("[WEBSOCKET] Connection established.");
    };

    socket.onmessage = async (event) => {
      const data = JSON.parse(event.data);

      if (data.op === 1) {
        const heartbeat_interval = data.d?.heartbeat_interval;

        heartbeatInterval = setInterval(() => {
          socket.send(JSON.stringify({ op: 3 }));
        }, heartbeat_interval);

        socket.send(
          JSON.stringify({
            op: 2,
            d: {
              subscribe_to_id: process.env.NEXT_PUBLIC_TARGET_ID,
            },
          }),
        );
      } else if (data.op === 0) {
        const activityPromises = await Promise.all(
          (data.d.activities ?? [])
            .filter((a) => a.type !== 4)
            .map(async (a) => ({
              type: a.type ?? null,
              name: a.name ?? null,
              details: a.details ?? null,
              state: a.state ?? null,
              timestamps: a.timestamps ?? null,
              assets: a.application_id
                ? {
                    largeImage: await resolveImage(null, a.application_id),
                    largeText: a.name ?? null,
                    smallImage: null,
                    smallText: null,
                  }
                : {
                    largeImage: await resolveImage(a.assets.large_image),
                    largeText: a.assets.largeText ?? null,
                    smallImage: await resolveImage(a.assets.small_image),
                    smallText: a.assets.smallText ?? null,
                  },
            })),
        );

        setActivities(activityPromises);
      }
    };

    socket.onclose = () => {
      console.log("[WEBSOCKET] Connection closed");

      setActivities([]);
    };

    socket.onerror = (error) => {
      console.log(error);

      setActivities([]);
    };

    return () => {
      socket.close();
      clearInterval(ageInterval);

      if (heartbeatInterval) {
        clearInterval(heartbeatInterval);
      }
    };
  }, []);

  return (
    <main className="flex bg-background border-x border-dashed flex-col justify-center py-8 container max-w-7xl  mx-auto min-h-screen">
      <section className="border-y flex lg:flex-row flex-col w-full">
        <div className="flex flex-col justify-between w-full">
          <div>
            <p className="flex items-center gap-1 border-b w-full">
              01 // ABOUT ME <ArrowDownRight />
            </p>
            <div className="flex gap-4">
              <Avatar className="size-48 rounded-none">
                <Avatar.Image src="/face-modified.jpg" alt="Shokhjahon" />
                <Avatar.Fallback>Shokhjahon</Avatar.Fallback>
              </Avatar>
              <div className="flex flex-col gap-2">
                <div className="space-y-2">
                  <p className="lg:text-4xl text-xl">shokhjahon</p>
                  <ol className="text-muted lg:text-sm text-xs">
                    {bio.map((b, i) => (
                      <li key={i} suppressHydrationWarning>
                        {b}
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="space-x-2">
                  {socials.map((s, i) => (
                    <SocialButton key={i} social={s} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <p className="lg:flex hidden items-center gap-1 border-t ">
            03 // TECH STACK <ArrowDownRight />
          </p>
        </div>

        <div className="bg-lines lg:h-auto lg:w-54 lg:border-x border-y h-8 w-full border-dashed" />

        <div className="flex flex-col">
          <p className="flex items-center gap-1 border-b w-full">
            02 // CURRENTLY <ArrowDownRight />
          </p>
          {activities.length > 0 ? (
            <div>
              {activities.map((a, i) => (
                <ActivityCard activity={a} key={i} />
              ))}
            </div>
          ) : (
            <Card className="w-md h-64 flex flex-col justify-center items-center gap-1">
              <p>offline</p>
              <small className="text-muted">sleeping or afk</small>
            </Card>
          )}
        </div>
      </section>
      <section className="min-w-0 w-full overflow-hidden">
        <div className="bg-lines lg:hidden flex border-y h-8 w-full border-dashed" />
        <p className="lg:hidden flex items-center gap-1 border-b w-full">
          03 // TECH STACK <ArrowDownRight />
        </p>
        <Marquee>
          {skills.map((s, i) => (
            <div
              key={s.name}
              className="flex gap-2 items-center justify-center p-2 border-r"
            >
              <img src={s.link} alt={i} className="size-4" />
              <p>{s.name}</p>
            </div>
          ))}
        </Marquee>
      </section>
      <section className="flex lg:flex-row flex-col border-y">
        <div className="bg-lines lg:hidden flex border-y h-8 w-full border-dashed" />
        <div className="min-w-0 w-full">
          <p className="flex items-center gap-1 border-b w-full">
            04 // PROJECTS <ArrowDownRight />
          </p>

          <ScrollShadow
            orientation="horizontal"
            hideScrollBar
            className="w-full flex"
          >
            {projects.map((p, i) => (
              <div key={i} className="flex">
                <ProjectCard project={p} />
                {i < projects.length - 1 && (
                  <div className="bg-lines w-6 border-x border-dashed" />
                )}
              </div>
            ))}
          </ScrollShadow>
        </div>
      </section>
    </main>
  );
}
