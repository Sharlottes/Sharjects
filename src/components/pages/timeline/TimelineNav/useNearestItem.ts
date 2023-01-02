import React from "react";
import { type TimelineItemData, getNearestItem } from "..";

const useNearestItem = () => {
  const [nearestItem, setNearestItem] = React.useState<TimelineItemData>({
    y: 0,
    date: "top",
  });

  React.useEffect(() => {
    const handleScroll = () => setNearestItem(getNearestItem(undefined));
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return nearestItem;
};

export default useNearestItem;
