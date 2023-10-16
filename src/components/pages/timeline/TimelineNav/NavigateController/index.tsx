import React from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import S from "./styled";
import { getTLD, useTimeline } from "../../TimelineProvider";
import useScrollEvent from "src/hooks/useScrollEvent";

export interface NavigateControllerProps {
  onBackClick: () => void;
}

const NavigateController: React.FC<NavigateControllerProps> = ({
  onBackClick,
}) => {
  const {
    timelineItems,
    currentItem: currentItemRef,
    scrollWindow,
  } = useTimeline();
  const [sortedItems, setSortedItems] = React.useState<HTMLDivElement[]>([]);

  useScrollEvent(() => {
    const currentItem = currentItemRef.current;
    if (!currentItem) return;

    const itemCount = 5;
    const list = timelineItems.current;
    const index = list.findIndex(
      (elem) => getTLD(elem, "date") == getTLD(currentItem, "date")
    );
    if (index == -1) return [];

    setSortedItems(
      list.slice(
        Math.max(0, index - ~~(itemCount / 2)),
        Math.min(list.length, index + ~~(itemCount / 2) + 1)
      )
    );
  });

  return (
    <div>
      <IconButton onClick={onBackClick}>
        <ArrowBackIcon />
      </IconButton>
      <S.NavigateContainer>
        {sortedItems.map((elem, i, arr) => (
          <React.Fragment key={getTLD(elem, "date")}>
            <S.NavigateItem
              current={
                !!currentItemRef.current &&
                getTLD(elem, "date") === getTLD(currentItemRef.current, "date")
              }
              onClick={() => scrollWindow(getTLD(elem, "y"))}
            >
              {getTLD(elem, "date")}
            </S.NavigateItem>
            <S.NavigateItemDivider
              show={
                i !== arr.length - 1 &&
                getTLD(elem, "date") !== "" &&
                getTLD(elem, "date") !== "end"
              }
            />
          </React.Fragment>
        ))}
      </S.NavigateContainer>
    </div>
  );
};

export default NavigateController;
