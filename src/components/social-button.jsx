"use client";

import { Check } from "@gravity-ui/icons";
import { useState } from "react";

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "./ui/tooltip";

export function SocialButton({ social }) {
  const { icon, value, type } = social;

  const [copied, setCopied] = useState(false);

  function handleClick() {
    if (type === "link") {
      window.open(value, "_blank", "noreferrer");
    } else if (type === "copy") {
      navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  }

  const button = (
    <button
      type="button"
      onClick={handleClick}
      aria-label={typeof value === "string" ? value : "social"}
      className="cursor-pointer text-muted-foreground transition-colors hover:text-foreground [&_svg]:size-4"
    >
      {copied ? <Check className="size-4" /> : icon}
    </button>
  );

  if (type !== "copy") return button;

  return (
    <Tooltip open={copied}>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent side="top">copied</TooltipContent>
    </Tooltip>
  );
}
