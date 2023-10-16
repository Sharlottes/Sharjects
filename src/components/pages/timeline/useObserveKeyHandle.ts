import React from "react";
import { useTimeline } from "./TimelineProvider";

export const useObserveKeyHandle = () => {
  const { scrollWindow } = useTimeline();

  React.useEffect(() => {
    const handleScroll = (event: Event) => {
      event.preventDefault();
    };

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      const direction = event.deltaY >= 0 ? "down" : "up";
      scrollWindow(direction);
    };

    const handleKeydown = (event: KeyboardEvent) => {
      const direction =
        event.key === "w" || event.key === "ArrowUp"
          ? "up"
          : event.key === "s" || event.key === "ArrowDown"
          ? "down"
          : undefined;

      if (direction) {
        event.preventDefault();
        scrollWindow(direction);
      }
    };

    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
};
