import { Clock } from "@gravity-ui/icons";
import { Avatar, Card, CardHeader, Label, Meter } from "@heroui/react";
import { useEffect, useState } from "react";

const ActivityTypes = {
  0: { label: "PLAYING" },
  1: { label: "STREAMING" },
  2: { label: "LISTENING TO" },
  3: { label: "WATCHING" },
  4: { label: "CUSTOM" },
  5: { label: "COMPETING IN" },
};

function convertSecondsToTime(seconds) {
  let total = Math.floor(seconds);
  const hours = Math.floor(total / 3600);
  total = total - 3600 * hours;
  const minutes = Math.floor(total / 60);
  total = total - 60 * minutes;
  const secs = Math.floor(total % 60);

  if (hours > 0) {
    return `${hours}:${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  }

  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}

export function ActivityCard({ activity }) {
  const { name, details, state, assets, type, timestamps } = activity;

  const [elapsedTime, setElapsedTime] = useState(0);

  const total = timestamps?.end
    ? Math.floor((new Date(timestamps.end) - new Date(timestamps.start)) / 1000)
    : null;

  const progress = total ? Math.min((elapsedTime / total) * 100, 100) : 0;

  useEffect(() => {
    if (!timestamps?.start) return;
    const start = new Date(timestamps.start).getTime();

    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - start) / 1000);
      setElapsedTime(total ? Math.min(elapsed, total) : elapsed);
    }, 1000);

    return () => clearInterval(interval);
  }, [timestamps.start, timestamps.end]);

  return (
    <Card className="w-full flex-row h-32">
      <div className="lg:w-4 w-2 flex items-center justify-center">
        <p className="-rotate-90 whitespace-nowrap text-xs font-bold">
          {ActivityTypes[type].label || "PLAYING"}
        </p>
      </div>
      <div className="relative">
        {assets.smallImage && (
          <Avatar className="size-8 border-4 border-surface z-10 rounded-none absolute -bottom-1 -right-1">
            <Avatar.Image src={assets?.smallImage} alt={assets?.smallText} />
            <Avatar.Fallback>{assets?.smallText}</Avatar.Fallback>
          </Avatar>
        )}
        <Avatar className="size-24 rounded-none">
          <Avatar.Image src={assets?.largeImage} alt={assets?.largeText} />
          <Avatar.Fallback>{assets?.largeText}</Avatar.Fallback>
        </Avatar>
      </div>
      <div className="flex flex-col justify-between">
        <CardHeader className="space-y-0 text-xs lg:max-w-48 max-w-38">
          <Card.Title className="pr-8">{name}</Card.Title>
          {details && (
            <Card.Description className="text-xs truncate">
              {details}
            </Card.Description>
          )}
          {state && (
            <Card.Description className="text-xs truncate">
              {state}
            </Card.Description>
          )}
        </CardHeader>

        {type === 2 ? (
          <div className="flex gap-3 min-w-60">
            <small>{convertSecondsToTime(elapsedTime)}</small>
            <Meter
              value={progress}
              size="sm"
              className="lg:w-full w-xs"
              aria-label="label"
            >
              <Meter.Track>
                <Meter.Fill />
              </Meter.Track>
            </Meter>
            <small>{convertSecondsToTime(total)}</small>
          </div>
        ) : (
          <small className="inline-flex gap-1 items-center">
            <Clock />
            {convertSecondsToTime(elapsedTime)}
          </small>
        )}
      </div>
    </Card>
  );
}
