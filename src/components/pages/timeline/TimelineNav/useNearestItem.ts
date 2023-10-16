import React from "react";
import { TimelineItemData, getNearestItem } from "..";

const useNearestItem = () => {
  const [nearestItem, setNearestItem] = React.useState<
    TimelineItemData | undefined
  >();

  React.useEffect(() => {
    const handleScroll = () => setNearestItem(getNearestItem(undefined));
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return nearestItem;
};

export default useNearestItem;
