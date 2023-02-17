import smoothScroll from "src/utils/smoothScroll";

const MARGIN = 150;

export interface TimelineItemData {
  date: string;
  y: number;
}

export type ScrollDirectionType = "up" | "down";

export const scrollWindow = (() => {
  let isScrolling = false;
  return (y: number) => {
    if (isScrolling) return;
    isScrolling = true;
    smoothScroll(
      Math.max(
        MARGIN,
        Math.min(document.body.scrollHeight - window.innerHeight, y)
      ),
      {
        offset: -MARGIN,
      }
    ).finally(() => (isScrolling = false));
  };
})();

export const tryScroll = (direction: ScrollDirectionType) => {
  scrollWindow(getNearestItem(direction).y);
};

export const getTimelineItems = (() => {
  let cachedElements: HTMLDivElement[] | undefined;

  return (force = false) => {
    if (force && cachedElements) cachedElements.length = 0;
    if (
      !cachedElements ||
      cachedElements.length === 0 ||
      cachedElements.some((e) => e.offsetTop == 0)
    )
      cachedElements = Array.from(
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
  direction: ScrollDirectionType | undefined
): TimelineItemData => {
  const items = getTimelineItems();
  for (let i = 0; i < items.length; i++) {
    const item = items[direction === "up" ? items.length - 1 - i : i];
    if (
      (direction === "up"
        ? item.y < window.scrollY + MARGIN
        : item.y > window.scrollY + MARGIN) ||
      (!direction && item.y == window.scrollY + MARGIN)
    ) {
      return item;
    }
  }

  return { date: "", y: window.scrollY + MARGIN };
};
