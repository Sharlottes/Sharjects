import React from "react";
import dynamic from "next/dynamic";
import Stepper from "@mui/material/Stepper";
import TimelineNav, { type TimelineNavRefType } from "./TimelineNav";
import CSR from "src/components/CSR";
import { getNearestItem, type ScrollDirectionType, scrollWindow } from ".";

const TimelineItems = dynamic(
  () => import("src/components/pages/timeline/TimelineItems")
);

const TimelineScroll: React.FC = () => {
  React.useEffect(() => {
    const handleScroll = (event: Event) => {
      event.preventDefault();
      ref.current?.onScroll();
    };

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      tryScroll(event.deltaY >= 0 ? "down" : "up");
    };

    const handleKeydown = (event: KeyboardEvent) => {
      console.log(event.key);
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

  const tryScroll = (direction: ScrollDirectionType) => {
    if (!window) return;
    scrollWindow(getNearestItem(direction).y);
  };

  const ref = React.useRef<TimelineNavRefType>(null);

  return (
    <Stepper orientation="vertical" sx={{ marginLeft: "min(1vw, 10px)" }}>
      <CSR>
        <TimelineNav ref={ref} scroll={tryScroll} />
      </CSR>
      <React.Suspense fallback="loading...">
        <TimelineItems scroll={tryScroll} />
      </React.Suspense>
    </Stepper>
  );
};

export default TimelineScroll;
