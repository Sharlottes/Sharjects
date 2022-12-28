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
    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = (e: Event) => {
    e.preventDefault();
    ref.current?.onScroll();
  };

  const handleWheel = (ev: WheelEvent) => {
    ev.preventDefault();
    tryScroll(ev.deltaY >= 0 ? "down" : "up");
  };
  const handleKeydown = (event: KeyboardEvent) => {
    const direction =
      event.key === "w" || event.key === "ArrowUp"
        ? "up"
        : event.key === "s" || event.key === "ArrowDown"
        ? "down"
        : undefined;
    if (direction) tryScroll(direction);
  };

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
