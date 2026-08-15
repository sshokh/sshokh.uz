"use client";

import { ArrowLeft, ArrowRight } from "@gravity-ui/icons";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Skeleton } from "./ui/skeleton";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { cn } from "@/lib/utils";

// project image with a skeleton placeholder shown until it finishes loading
function SkeletonImage({ src, alt }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative aspect-video w-full overflow-hidden">
      {!loaded && <Skeleton className="absolute inset-0 rounded-none" />}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={cn(
          "h-full w-full object-cover transition-opacity duration-300",
          loaded ? "opacity-100" : "opacity-0",
        )}
      />
    </div>
  );
}

export function ProjectCard({ project }) {
  const { title, description, images, skills } = project;

  const [open, setOpen] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  // Embla measures the viewport on mount, but inside the dialog that happens
  // while the open animation is still scaling — re-init once it settles.
  useEffect(() => {
    if (open && emblaApi) emblaApi.reInit();
  }, [open, emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="group flex w-full items-baseline gap-2 border-t border-border py-2 text-left last:border-b"
        >
          <span className="transition-transform group-hover:translate-x-1">
            {title}
          </span>
          <span className="ml-auto text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground">
            ↗
          </span>
        </button>
      </DialogTrigger>

      <DialogContent className="max-h-[85vh] gap-4 overflow-y-auto sm:max-w-lg">
        <DialogHeader className="flex flex-row flex-wrap items-center gap-2 pr-8">
          <DialogTitle>{title}</DialogTitle>
          <div className="flex flex-wrap gap-1.5">
            {skills.map((s, i) => (
              <Badge key={i} variant="outline">
                <img
                  src={`https://cdn.simpleicons.org/${s}/999999`}
                  alt=""
                  className="size-3"
                />
                <span>{s.replace("dot", ".")}</span>
              </Badge>
            ))}
          </div>
        </DialogHeader>

        <p className="text-muted-foreground">{description}</p>

        {images.length > 1 ? (
          <>
            <div
              className="overflow-hidden rounded-md border border-border"
              ref={emblaRef}
            >
              <div className="flex">
                {images.map((image, i) => (
                  <div className="min-w-0 flex-[0_0_100%]" key={i}>
                    <SkeletonImage src={image} alt={`${title} ${i + 1}`} />
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                onClick={scrollPrev}
                aria-label="Previous image"
              >
                <ArrowLeft className="size-4" />
              </Button>
              <Button
                variant="outline"
                onClick={scrollNext}
                aria-label="Next image"
              >
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </>
        ) : (
          <div className="overflow-hidden rounded-md border border-border">
            <SkeletonImage src={images[0]} alt={title} />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
