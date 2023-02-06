import React from "react";

import useNearestItem from "../useNearestItem";
import useSortedItems from "../useSortedItems";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import { NavigateContainer, NavigateItem, NavigateItemDivider } from "./styled";
import { scrollWindow } from "../..";

export interface NavigateControllerProps {
  onBackClick: () => void;
}

const NavigateController: React.FC<NavigateControllerProps> = ({
  onBackClick,
}) => {
  const nearestItem = useNearestItem();
  const sortedItems = useSortedItems();

  return (
    <div>
      <IconButton onClick={onBackClick}>
        <ArrowBackIcon />
      </IconButton>
      <NavigateContainer>
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
      </NavigateContainer>
    </div>
  );
};

export default NavigateController;
