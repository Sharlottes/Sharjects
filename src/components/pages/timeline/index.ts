import smoothScroll from "src/utils/smoothScroll";
export interface TimelineItemData {
  date: string;
  y: number;
}

export type ScrollDirectionType = "up" | "down";

export const MARGIN = 150;

export const scrollWindow = (() => {
  let isScrolling = false;
  return (y: number) => {
    if (isScrolling) return;
    isScrolling = true;
    smoothScroll(
      Math.min(document.body.scrollHeight - window.innerHeight, y)
    ).finally(() => (isScrolling = false));
  };
})();

export const tryScroll = (direction: ScrollDirectionType) => {
  scrollWindow(getNearestItem(direction).y);
};

export const getDist = (to: number, targetPos = window.scrollY) =>
  (targetPos ?? 0) - to;

export const getTimelineItems = (() => {
  let cachedElements: HTMLDivElement[] | undefined;

  return () => {
    cachedElements ??= Array.from(
      document.querySelectorAll<HTMLDivElement>(
        "div #top-anchor, #bottom-anchor, .has-content"
      )
    );
    return cachedElements.map((element) => ({
      date:
        element.id === "top-anchor"
          ? "start"
          : element.id === "bottom-anchor"
          ? "end"
          : element.innerText,
      y: element.offsetTop,
    }));
  };
})();

export const getNearestItem = (
  direction?: ScrollDirectionType
): TimelineItemData => {
  const items = getTimelineItems();
  for (let i = 0; i < items.length; i++) {
    const item = items[direction === "up" ? items.length - 1 - i : i];
    if (
      direction === "up" ? item.y < window.scrollY : item.y > window.scrollY
    ) {
      return item;
    }
  }

  return { date: "", y: window.scrollY };
};
