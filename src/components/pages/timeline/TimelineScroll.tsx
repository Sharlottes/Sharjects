import React from "react";
import dynamic from "next/dynamic";
import Stepper from "@mui/material/Stepper";
import TimelineNav, { type TimelineNavRefType } from "./TimelineNav";

const TimelineItems = dynamic(
  () => import("src/components/pages/timeline/TimelineItems")
);

const margin = 150;
const getDist = (element: HTMLDivElement, targetPos = window.scrollY) =>
  (targetPos ?? 0) - element.offsetTop;
const getTimelineItems = () => {
  return [
    document.querySelector<HTMLDivElement>("div #top-anchor")!,
    ...document.querySelectorAll("div .has-content"),
    document.querySelector<HTMLDivElement>("div #bottom-anchor")!,
  ] as HTMLDivElement[];
};
const getNearestElement = (
  direction: "up" | "down" | "none" = "none"
): HTMLDivElement | undefined => {
  return getTimelineItems()
    .filter((element) =>
      direction === "down"
        ? getDist(element) < -(margin + 20)
        : direction === "up"
        ? getDist(element) > margin + 20
        : true
    )
    .sort((element) =>
      direction === "none" ? Math.abs(getDist(element)) : getDist(element)
    )
    .pop();
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
    if (item) ref.current?.setLatestItem(item);
    window.scrollTo({
      top: (item?.offsetTop ?? 0) - margin,
      behavior: "smooth",
    });
  };

  const ref = React.useRef<TimelineNavRefType>(null);

  return (
    <Stepper orientation="vertical" sx={{ marginLeft: "min(1vw, 10px)" }}>
      <TimelineNav ref={ref} scroll={(d) => tryScroll(d)} />
      <React.Suspense fallback={"loading..."}>
        <TimelineItems scroll={(d) => tryScroll(d)} />
      </React.Suspense>
    </Stepper>
  );
};

export default TimelineScroll;
