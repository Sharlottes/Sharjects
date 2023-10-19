import smoothScroll from "src/utils/smoothScroll";
import { useState, useRef, useContext, createContext } from "react";

const MARGIN = 150;
const GAP = 10;

export type ScrollDirectionType = "up" | "down";

interface TimelineContent {
  getNextItem(direction?: ScrollDirectionType): HTMLDivElement | undefined;
  scrollWindow(y: number | ScrollDirectionType): void;
  initTimelineItems(): void;
  timelineItems: React.MutableRefObject<HTMLDivElement[]>;
  currentItem: React.MutableRefObject<HTMLDivElement | undefined>;
}
const TimelineContext = createContext<TimelineContent>({
  getNextItem() {
    throw new Error("cannot find timeline context!");
  },
  scrollWindow() {
    throw new Error("cannot find timeline context!");
  },
  initTimelineItems() {
    throw new Error("cannot find timeline context!");
  },
  timelineItems: null!,
  currentItem: null!,
});

let isScrolling = false;
export default function TimelineProvider({
  children,
}: React.PropsWithChildren) {
  const currentItem = useRef<HTMLDivElement | undefined>();
  const lastDirection = useRef<ScrollDirectionType>("down");
  const timelineItems = useRef<HTMLDivElement[]>([]);
  const [_, rerender] = useState<void>();

  const scrollWindow = (y: number | ScrollDirectionType) => {
    if (isScrolling) return;
    isScrolling = true;
    if (typeof y === "string") {
      lastDirection.current = y;
      const item = getNextItem(y);
      if (!item) return;
      y = getTLD(item, "y");
    }
    const tempItem = getNextItem();
    smoothScroll(y - MARGIN).then(
      () => {
        if (tempItem) {
          currentItem.current = tempItem;
          isScrolling = false;
          rerender();
        }
      },
      () => (isScrolling = false)
    );
  };

  const initTimelineItems = () => {
    const items = Array.from(
      document.querySelectorAll<HTMLDivElement>(
        "div #top-anchor, #bottom-anchor, .has-content"
      )
    );
    if (items.some((item) => item.offsetTop == 0) || items.length == 0) {
      setTimeout(initTimelineItems, 500);
      return;
    }

    currentItem.current = items[0];
    timelineItems.current = items;
    rerender();
  };

  const getNextItem = (
    direction: ScrollDirectionType = lastDirection.current
  ): HTMLDivElement | undefined => {
    lastDirection.current = direction;

    const items = timelineItems.current;
    const currentY = window.scrollY;

    for (let i = 0; i < items.length; i++) {
      const item = items[direction === "up" ? items.length - 1 - i : i];

      const height = getTLD(item, "height");
      const y = getTLD(item, "y");

      if (
        direction === "up"
          ? y + height + GAP < currentY
          : currentY < y - MARGIN - GAP
      ) {
        return item;
      }
    }
    return direction == "up" ? items[0] : items[items.length - 1];
  };

  return (
    <TimelineContext.Provider
      value={{
        getNextItem,
        scrollWindow,
        initTimelineItems,
        timelineItems,
        currentItem,
      }}
    >
      {children}
    </TimelineContext.Provider>
  );
}
export const useTimeline = () => useContext(TimelineContext);

export function getTLD<T extends "y" | "height" | "date">(
  element: HTMLDivElement,
  p: T
): { y: number; height: number; date: string }[T] {
  switch (p) {
    case "y":
      return element.offsetTop as any;
    case "height":
      return element.offsetHeight as any;
    case "date":
      return element.id === "top-anchor"
        ? "start"
        : element.id === "bottom-anchor"
        ? "end"
        : (element.innerText as any);
  }
  throw new Error("impossible case!");
}
