import { Button, Card, Chip, Modal } from "@heroui/react";
import { ArrowLeft, ArrowRight } from "@gravity-ui/icons";
import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";

export function ProjectCard({ project }) {
  const { title, description, images, skills } = project;

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
    <Modal>
      <Modal.Trigger>
        <Card className="max-w-80 p-0 text-card-foreground border-b-0">
          <Card.Header className="p-2 pb-0">
            <Card.Title>{title}</Card.Title>
            <Card.Description className="truncate text-xs">
              {description}
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <img src={images[0]} className="aspect-14/9" />
          </Card.Content>
        </Card>
      </Modal.Trigger>
      <Modal.Backdrop variant="blur">
        <Modal.Container placement="center">
          <Modal.Dialog className="max-w-3xl">
            <Modal.CloseTrigger />
            <Modal.Header className="flex flex-row">
              <Modal.Heading>{title}</Modal.Heading>
              <div className="space-x-2 flex">
                {skills.map((s, i) => (
                  <Chip key={i} className="flex gap-1">
                    <img src={`https://cdn.simpleicons.org/${s}/ffffff`} className="size-3"/>
                    <span>{s}</span>
                  </Chip>
                ))}
              </div>
            </Modal.Header>
            <Modal.Body className="space-y-2">
              <p>{description}</p>
              <div className="overflow-hidden flex-1" ref={emblaRef}>
                <div className="flex">
                  {images.map((image, i) => (
                    <div className="flex-[0_0_100%] min-w-0 h-full" key={i}>
                      <img src={image} className="w-full lg:h-96 h-48" />
                    </div>
                  ))}
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button fullWidth onClick={onPrevButtonClick}>
                <ArrowLeft />
              </Button>
              <Button fullWidth isIconOnly onClick={onNextButtonClick}>
                <ArrowRight />
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
