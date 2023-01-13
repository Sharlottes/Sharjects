import React from "react";
import Stepper from "@mui/material/Stepper";
import TimelineNav from "../TimelineNav";
import { tryScroll } from "..";
import TimelineItems from "src/components/pages/timeline/TimelineScroll/TimelineItems";
import Box from "@mui/material/Box";

const TimelineScroll: React.FC = () => {
  React.useEffect(() => {
    const handleScroll = (event: Event) => {
      event.preventDefault();
    };

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      tryScroll(event.deltaY >= 0 ? "down" : "up");
    };

    const handleKeydown = (event: KeyboardEvent) => {
      const direction =
        event.key === "w" || event.key === "ArrowUp"
          ? "up"
          : event.key === "s" || event.key === "ArrowDown"
          ? "down"
          : undefined;
      if (direction) {
        tryScroll(direction);
        event.preventDefault();
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

  return (
    <Box>
      <TimelineNav />
      <TimelineItems />
    </Box>
  );
};

export default TimelineScroll;
