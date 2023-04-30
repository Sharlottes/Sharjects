import React from "react";

import useNearestItem from "../useNearestItem";
import useSortedItems from "../useSortedItems";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import S from "./styled";
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
      <S.NavigateContainer>
        {sortedItems.map((elem, i, arr) => (
          <React.Fragment key={elem.date}>
            <S.NavigateItem
              current={elem.y === nearestItem.y}
              onClick={() => scrollWindow(elem.y)}
            >
              {elem.date}
            </S.NavigateItem>
            <S.NavigateItemDivider
              show={
                i !== arr.length - 1 && elem.date !== "" && elem.date !== "end"
              }
            />
          </React.Fragment>
        ))}
      </S.NavigateContainer>
    </div>
  );
};

export default NavigateController;
