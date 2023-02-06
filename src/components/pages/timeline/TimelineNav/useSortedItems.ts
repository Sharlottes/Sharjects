import React from "react";
import Arrayf from "src/utils/Arrayf";
import { TimelineItemData, getTimelineItems } from "..";
import useNearestItem from "./useNearestItem";

const useSortedItems = (itemCount = 5) => {
  const nearestItem = useNearestItem();
  const [sortedItems, setSortedItem] = React.useState<TimelineItemData[]>([]);

  React.useEffect(() => {
    const list = getTimelineItems();
    const index = Math.max(
      0,
      list.findIndex(({ y }) => y == nearestItem.y)
    );
    setSortedItem(
      Arrayf[index < itemCount ? "padLeft" : "padRight"](
        list.slice(
          Math.max(0, index - ~~(itemCount / 2)),
          Math.min(list.length, index + ~~(itemCount / 2) + 1)
        ),
        itemCount,
        { date: "", y: window.screenY }
      )
    );
  }, [nearestItem]);

  return sortedItems;
};

export default useSortedItems;
