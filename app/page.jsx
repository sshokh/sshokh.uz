"use client";

import { Avatar, Card, ScrollShadow } from "@heroui/react";
import {
  ActivityCard,
  SocialButton,
  ProjectCard,
  IconCloud,
} from "./components";
import { useState, useEffect } from "react";
import { GitHub, Telegram } from "@/app/icons/";
import { ArrowDownRight } from "@gravity-ui/icons";
import api from "@/app/utils/api";

const bio = [
  "- Frontend web developer & part-time gamer.",
  "- 2 years of experience",
  "- 16 year old",
  "- IELTS 7.5",
];

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
  const [now, setNow] = useState(Date.now());

  async function fetchProjects() {
    const { data } = await api("/projects");
    setProjects(data);
  }

  async function fetchSkills() {
    const { data } = await api("/skills");
    setSkills(data.map((s) => `https://cdn.simpleicons.org/${s.slug}/ffffff`));
  }

  useEffect(() => {
    fetchProjects();
    fetchSkills();

    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    const socket = new WebSocket(
      `ws:${process.env.NEXT_PUBLIC_BACKEND_URL.split("http:")[1]}`,
    );

    socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.activities?.length) {
          setActivities(data.activities);
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");

      setActivities([]);
    };

    socket.onerror = (error) => {
      console.log(error);

      setActivities([]);
    };

    return () => {
      socket.close();
      clearInterval(interval);
    };
  }, []);

  return (
    <main className="flex flex-col lg:py-16 py-8 gap-8 container max-w-max mx-auto px-6 min-h-screen justify-between">
      <section className="flex lg:flex-row flex-col lg:gap-32 gap-8">
        <div className="lg:hidden flex flex-col gap-4">
          <div className="flex gap-4">
            <Avatar className="size-32 rounded-none">
              <Avatar.Image src="/face-modified.jpg" alt="Shokhjahon" />
              <Avatar.Fallback>Shokhjahon</Avatar.Fallback>
            </Avatar>
            <div className="flex flex-col justify-between">
              <div>
                <p className="text-lg">Hi, I'm Shokhjahon</p>
                <ol className="text-sm">
                  {bio.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          <div className="space-x-2">
            {socials.map((s, i) => (
              <SocialButton key={i} social={s} />
            ))}
          </div>
        </div>

        <div className="lg:flex hidden gap-8">
          <Avatar className="size-48 rounded-none">
            <Avatar.Image src="/face-modified.jpg" alt="Shokhjahon" />
            <Avatar.Fallback>Shokhjahon</Avatar.Fallback>
          </Avatar>
          <div className="flex flex-col h-min gap-2">
            <div className="space-y-2">
              <p className="lg:text-4xl text-xl">
                Hi, I'm Shokhjahon{" "}
                <span className="text-sm text-default">(shokh-ja-hon)</span>
              </p>
              <ol>
                {bio.map((b, i) => (
                  <li key={i}>{b}</li>
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

        <div className="relative flex h-58 w-full lg:w-58 flex-col items-center justify-center overflow-hidden">
          <div className="bg-foreground text-background size-20 flex items-center justify-center rounded-full">
            <p>STACK</p>
          </div>
          <IconCloud iconSize={30} radius={100} reverse speed={1}>
            {skills.map((s, i) => (
              <img src={s} key={i} alt={i} />
            ))}
          </IconCloud>
        </div>
      </section>
      <section className="flex lg:flex-row flex-col gap-8">
        <div className="space-y-2">
          <p className="inline-flex items-center gap-1">
            Currently <ArrowDownRight />
          </p>
          <ScrollShadow orientation="vertical" className="space-y-4 max-h-68">
            {activities.length > 0 ? (
              activities.map((a, i) => (
                <ActivityCard activity={a} key={i} now={now} />
              ))
            ) : (
              <Card className="h-32 flex flex-col justify-center items-center gap-1">
                <p>OFFLINE</p>
                <small className="text-muted">
                  If I am online, it will show up here!
                </small>
              </Card>
            )}
          </ScrollShadow>
        </div>
        <div className="space-y-2">
          <p className="inline-flex items-center gap-1">
            Projects <ArrowDownRight />
          </p>

          <ScrollShadow
            orientation="horizontal"
            className="max-w-3xl [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            <div className="flex gap-4">
              {projects.map((p, i) => (
                <ProjectCard key={i} project={p} />
              ))}
            </div>
          </ScrollShadow>
        </div>
      </section>
    </main>
  );
}
