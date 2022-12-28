import React from "react";
import dynamic from "next/dynamic";
import Stepper from "@mui/material/Stepper";
import TimelineNav, { type TimelineNavRefType } from "./TimelineNav";
import CSR from "src/components/CSR";
import { getTimelineItems, MARGIN, TimelineItemData } from ".";

const TimelineItems = dynamic(
  () => import("src/components/pages/timeline/TimelineItems")
);

const getNearestElement = (
  direction: "up" | "down" | "none" = "none"
): TimelineItemData => {
  if (direction !== "none") {
    const items = getTimelineItems();
    for (let i = 0; i < items.length; i++) {
      const item = items[direction === "up" ? items.length - 1 - i : i];
      if (
        Math.max(0, (direction === "up" ? -1 : 1) * (item.y - window.scrollY))
      ) {
        return item;
      }
    }
  }
  return { date: "", y: window.scrollY };
};

const TimelineScroll: React.FC = () => {
  React.useEffect(() => {
    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("scroll", preventScroll);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", preventScroll);
    };
  }, []);

  const preventScroll = (e: any) => e.preventDefault();
  const handleWheel = (ev: WheelEvent) => {
    ev.preventDefault();
    tryScroll(ev.deltaY > 0 ? "down" : ev.deltaY < 0 ? "up" : "none");
  };
  const handleKeydown = (event: KeyboardEvent) => {
    const direction =
      event.key === "w" || event.key === "ArrowUp"
        ? "up"
        : event.key === "s" || event.key === "ArrowDown"
        ? "down"
        : "none";
    tryScroll(direction);
  };

  const tryScroll = (direction: "up" | "down" | "none") => {
    if (!window || direction === "none") return;

    const item = getNearestElement(direction);
    ref.current?.setLatestItem(item);
    window.scrollTo({
      top: item.y,
      behavior: "smooth",
    });
  };

  const ref = React.useRef<TimelineNavRefType>(null);

  return (
    <Stepper orientation="vertical" sx={{ marginLeft: "min(1vw, 10px)" }}>
      <CSR>
        <TimelineNav ref={ref} scroll={(d) => tryScroll(d)} />
      </CSR>
      <React.Suspense fallback={"loading..."}>
        <TimelineItems scroll={(d) => tryScroll(d)} />
      </React.Suspense>
    </Stepper>
  );
};

export default TimelineScroll;
