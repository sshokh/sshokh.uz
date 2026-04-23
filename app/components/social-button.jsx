import { Check } from "@gravity-ui/icons";
import { Button } from "@heroui/react";
import { useState } from "react";

export function SocialButton({ social }) {
  const { icon, value, type } = social;

  const [isClicked, setIsClicked] = useState(false);

  function handleClick() {
    if (type === "link") {
      window.open(value);
    } else if (type === "copy") {
      navigator.clipboard.writeText(value);

      setIsClicked(true);

      setTimeout(() => {
        setIsClicked(false);
      }, 1500);
    }
  }

  return (
    <Button isIconOnly variant="outline" size="lg" className="[&_svg]:size-6" onClick={handleClick}>
      {isClicked ? <Check /> : icon}
    </Button>
  );
}
