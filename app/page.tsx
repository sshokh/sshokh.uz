import { Avatar } from "@heroui/react";
import { Activity, ActivityCard } from "./components/activity-card";

const activities = [
  {
    type: 0,
    name: "Code",
    details: "In api.shokh.dev - 0 problems found",
    state: "Working on index.js:51:5",
    timestamps: {
      start: "2026-04-08T10:34:42.754Z",
      end: null,
    },
    assets: {
      largeImage:
        "https://media.discordapp.net/external/ftBjuYHxeAs2FW1lMnr-_BxOSttEZIc1aAzg_W3nFlM/https/raw.githubusercontent.com/LeonardSSH/vscord/main/assets/icons/js.png",
      largeText: "Editing a JS file",
      smallImage:
        "https://media.discordapp.net/external/Joitre7BBxO-F2IaS7R300AaAcixAvPu3WD1YchRgdc/https/raw.githubusercontent.com/LeonardSSH/vscord/main/assets/icons/vscode.png",
      smallText: "Visual Studio Code",
    },
  },
  {
    type: 2,
    name: "Spotify",
    details: "Don't Wake Me Up",
    state: "Fizzle",
    timestamps: {
      start: "2026-04-08T10:46:14.863Z",
      end: "2026-04-08T10:48:49.148Z",
    },
    assets: {
      largeImage:
        "https://i.scdn.co/image/ab67616d0000b273b8d8f638154af5f42dd8c8ee",
      largeText: "Don't Wake Me Up",
      smallImage: null,
      smallText: null,
    },
  },
];

export default function Home() {
  return (
    <main className="my-12">
      <section className="flex gap-8">
        <div className="relative">
          <img
            src="crown.png"
            className="size-12 absolute z-10 -top-8 -left-8 -rotate-40"
          />
          <Avatar className="size-48 rounded-none">
            <Avatar.Image src="/face.jpg" alt="Rustamjanov Shokhjahon" />
            <Avatar.Fallback>Shokhjahon</Avatar.Fallback>
          </Avatar>
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl">
            Hi, I'm Shokhjahon{" "}
            <span className="text-sm text-default">(shokh-ja-hon)</span>
          </h1>
          <ol>
            <li>
              - Casual frontend web developer and an obsessed perfectionist.
            </li>
            <li>
              - 16 year old (2010/01/02){" "}
              <span className="text-sm text-default">YYYY:MM:DD</span>
            </li>
          </ol>
        </div>
        <div className="space-y-4">
          <h1>Just in case you're wondering, I'm currently...</h1>

          {activities.map((a: Activity, i: number) => (
            <ActivityCard activity={a} key={i} />
          ))}
        </div>
      </section>
    </main>
  );
}
