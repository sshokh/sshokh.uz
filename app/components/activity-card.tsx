import { Button, Card, CardHeader } from "@heroui/react";

export interface Activity {
  type: number;
  name: string;
  details?: string;
  state?: string;
  timestamps?: {
    start?: string;
    end?: string;
  };
  assets?: {
    largeImage?: string;
    largeText?: string;
    smallImage?: string;
    smallText?: string;
  };
}

type ActivityCardProps = {
  activity: Activity;
};

export function ActivityCard({ activity }: ActivityCardProps) {
  return (
    <Card className="w-full items-stretch md:flex-row">
      <p></p>
      <div className="size-24">
        <img
          alt={activity.assets?.largeText}
          loading="lazy"
          src={activity.assets?.largeImage}
        />
      </div>
      <div className="flex flex-1 flex-col gap-3">
        <Card.Header className="gap-1">
          <Card.Title className="pr-8">{activity.name}</Card.Title>
          <Card.Description>{activity.details}</Card.Description>
        </Card.Header>
      </div>
    </Card>
  );
}
