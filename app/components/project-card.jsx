import { Card, CardDescription, Chip, Modal } from "@heroui/react";
import { EmblaCarousel } from "./embla-carousel";

export function ProjectCard({ project }) {
  const { title, description, images, skills } = project;

  return (
    <Modal>
      <Modal.Trigger>
        <Card className="max-w-80 p-4 text-card-foreground">
          <Card.Header>
            <Card.Title>{title}</Card.Title>
            <Card.Description className="truncate">
              {description}
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <img
              src={process.env.NEXT_PUBLIC_BACKEND_URL + images[0]}
              className="aspect-14/9"
            />
          </Card.Content>
        </Card>
      </Modal.Trigger>
      <Modal.Backdrop variant="blur">
        <Modal.Container placement="center">
          <Modal.Dialog className="max-w-3xl">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>{title}</Modal.Heading>
              <div className="space-x-2">
                {skills.map((s, i) => (
                  <Chip key={i}>#{s}</Chip>
                ))}
              </div>
            </Modal.Header>
            <Modal.Body className="space-y-2">
              <p>{description}</p>
              <EmblaCarousel slides={images} />
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
