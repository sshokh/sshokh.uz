import { Clock } from "@gravity-ui/icons";
import { Avatar, Card, ProgressBar } from "@heroui/react";
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
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${secs < 10 ? "0" : ""}${secs}`;
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
    const end = timestamps?.end ? new Date(timestamps.end).getTime() : null;

    const interval = setInterval(() => {
      const now = Date.now();
      const elapsed = Math.floor((now - start) / 1000);

      setElapsedTime(end ? Math.min(elapsed, (end - start) / 1000) : elapsed);
    }, 1000);

    return () => clearInterval(interval);
  }, [timestamps?.start, timestamps?.end]);

  return (
    <Card className="flex-row h-32 lg:w-md flex items-center gap-4 border-b-0">
      <div className="lg:w-4 w-2 flex items-center justify-center">
        <p className="-rotate-90 whitespace-nowrap text-xs font-bold">
          {ActivityTypes[type].label || "PLAYING"}
        </p>
      </div>

      <div className="relative">
        {assets?.smallImage && (
          <Avatar className="size-8 rounded-none border-surface border-4 z-10 absolute -bottom-0.75 -right-0.75">
            <Avatar.Image src={assets?.smallImage} />
            <Avatar.Fallback>{assets?.smallText}</Avatar.Fallback>
          </Avatar>
        )}
        <div className="size-24">
          <img src={assets?.largeImage} alt={assets?.largeText} />
        </div>
      </div>

      <div className="flex flex-col justify-between h-full truncate w-full">
        <div className="space-y-0.5 text-sm pr-8">
          <div className="truncate font-semibold">{name}</div>
          {details && (
            <div className="text-xs truncate text-muted">{details}</div>
          )}
          {state && <div className="text-xs truncate text-muted">{state}</div>}
        </div>

        {type === 2 ? (
          <div className="flex gap-3 items-center">
            <small className="text-muted">
              {convertSecondsToTime(elapsedTime)}
            </small>
            <ProgressBar
              value={progress}
              size="sm"
              aria-label="music-progress"
              color="default"
            >
              <ProgressBar.Track>
                <ProgressBar.Fill />
              </ProgressBar.Track>
            </ProgressBar>
            <small className="text-muted">{convertSecondsToTime(total)}</small>
          </div>
        ) : (
          <small className="flex gap-1 items-center text-muted">
            <Clock />
            {convertSecondsToTime(elapsedTime)}
          </small>
        )}
      </div>
    </Card>
  );
}
