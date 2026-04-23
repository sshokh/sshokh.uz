"use client";

import {
  Avatar,
  Button,
  Card,
  CardDescription,
  ScrollShadow,
} from "@heroui/react";
import { ActivityCard, SocialButton } from "./components";
import { useState, useEffect } from "react";
import { GitHub, Telegram } from "@/app/icons";
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

  async function fetchProjects() {
    const { data } = await api("/projects");
    setProjects(data);
  }

  useEffect(() => {
    fetchProjects();

    const socket = new WebSocket("ws://localhost:3000");

    socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.activities.length > 0) {
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
      setActivities([]);
    };
  }, []);

  return (
    <main className="flex flex-col lg:py-16 py-8 gap-4 container mx-auto px-6 min-h-screen justify-between">
      <section>
        <div className="lg:hidden flex flex-col gap-4">
          <div className="flex gap-4">
            <Avatar className="size-32 rounded-none">
              <Avatar.Image src="/face.jpg" alt="Rustamjanov Shokhjahon" />
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
            <Avatar.Image src="/face.jpg" alt="Rustamjanov Shokhjahon" />
            <Avatar.Fallback>Shokhjahon</Avatar.Fallback>
          </Avatar>
          <div className="flex flex-col justify-between">
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
      </section>
      <section className="flex lg:flex-row flex-col gap-8">
        <div className="space-y-2">
          <p className="inline-flex items-center gap-1">
            Currently <ArrowDownRight />
          </p>
          <ScrollShadow orientation="vertical" className="space-y-4 max-h-68">
            {activities.length > 0 ? (
              activities.map((a, i) => <ActivityCard activity={a} key={i} />)
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
                <Card
                  key={i}
                  className="min-w-80 p-4 text-card-foreground shadow-sm"
                >
                  <Card.Header>
                    <Card.Title>{p.title}</Card.Title>
                    <CardDescription>{p.description}</CardDescription>
                  </Card.Header>
                  <Card.Content>
                    <img
                      src={process.env.NEXT_PUBLIC_BACKEND_URL + p.images[0]}
                      className="aspect-14/9"
                    />
                  </Card.Content>
                </Card>
              ))}
            </div>
          </ScrollShadow>
        </div>
      </section>
    </main>
  );
}
