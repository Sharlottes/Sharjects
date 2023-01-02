import React from "react";

import { scrollWindow } from "../..";

import useNearestItem from "../useNearestItem";
import useSortedItems from "../useSortedItems";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import { NavigateItem, NavigateItemDivider } from "./styled";

export interface NavigateControllerProps {
  onBackClick: () => void;
}

const NavigateController: React.FC<NavigateControllerProps> = ({
  onBackClick,
}) => {
  const nearestItem = useNearestItem();
  const sortedItems = useSortedItems();
  (() => {
    const index = sortedItems.findIndex((item) => item.y === nearestItem.y);
  })();
  return (
    <div>
      <IconButton onClick={onBackClick}>
        <ArrowBackIcon />
      </IconButton>
      <div
        style={{
          textAlign: "center",
        }}
      >
        {sortedItems.map((elem, i, arr) => (
          <React.Fragment key={elem.date}>
            <NavigateItem
              current={elem.y === nearestItem.y}
              onClick={() => scrollWindow(elem.y)}
            >
              {elem.date}
            </NavigateItem>
            <NavigateItemDivider
              show={
                i !== arr.length - 1 && elem.date !== "" && elem.date !== "end"
              }
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default NavigateController;
