import { ArrowLeft, ArrowRight } from "@gravity-ui/icons";
import { Button } from "@heroui/react";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";

export function EmblaCarousel({ slides }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-3xl">
      <div className="overflow-hidden flex-1 " ref={emblaRef}>
        <div className="flex">
          {slides.map((image, i) => (
            <div className="flex-[0_0_100%] min-w-0 h-full" key={i}>
              <img
                src={process.env.NEXT_PUBLIC_BACKEND_URL + image}
                className="w-full lg:h-96 h-48"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-4 w-full justify-between">
        <Button fullWidth onClick={onPrevButtonClick}>
          <ArrowLeft />
        </Button>
        <Button fullWidth isIconOnly onClick={onNextButtonClick}>
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
}
