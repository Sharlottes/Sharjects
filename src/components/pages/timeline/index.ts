import smoothScroll from "src/utils/smoothScroll";

const MARGIN = 150;

export interface TimelineItemData {
  date: string;
  y: number;
  height: number;
}

export type ScrollDirectionType = "up" | "down";

export const scrollWindow = (() => {
  let isScrolling = false;
  return (y: number) => {
    if (isScrolling) return;
    isScrolling = true;

    smoothScroll(y).finally(() => (isScrolling = false));
  };
})();

export const tryScroll = (direction: ScrollDirectionType) => {
  const item = getNearestItem(direction);
  if (!item) return;
  scrollWindow(item.y - MARGIN);
};

export const getTimelineItems = (() => {
  let cachedElements: HTMLDivElement[] = [];

  return (force = false) => {
    if (force) cachedElements.length = 0;
    if (
      cachedElements.length === 0 ||
      cachedElements.some((e) => e.offsetTop == 0)
    ) {
      cachedElements = Array.from(
        document.querySelectorAll<HTMLDivElement>(
          "div #top-anchor, #bottom-anchor, .has-content"
        )
      );
    }

    return cachedElements.map((element) => ({
      date:
        element.id === "top-anchor"
          ? "start"
          : element.id === "bottom-anchor"
          ? "end"
          : element.innerText,
      y: element.offsetTop,
      height: element.offsetHeight,
    }));
  };
})();

export const getNearestItem = (
  direction: ScrollDirectionType = "down"
): TimelineItemData | undefined => {
  const items = getTimelineItems();

  const currentY = window.scrollY;

  for (let i = 0; i < items.length; i++) {
    const item = items[direction === "up" ? items.length - 1 - i : i];
    if (
      direction === "up"
        ? item.y + item.height + 10 < currentY
        : currentY < item.y - MARGIN - 10
    ) {
      return item;
    }
  }
};
