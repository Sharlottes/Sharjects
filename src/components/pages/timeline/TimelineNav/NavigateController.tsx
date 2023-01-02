import React from "react";

import { scrollWindow } from "..";

import useNearestItem from "./useNearestItem";
import useSortedItems from "./useSortedItems";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";

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
      <div style={{ height: "100%" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {sortedItems.map((elem, i, arr) => (
            <div key={i}>
              <span
                style={{
                  margin: "5px 2px",
                  color: elem.y === nearestItem.y ? "red" : "inherit",
                  cursor: "pointer",
                }}
                onClick={() => scrollWindow(elem.y)}
              >
                {elem.date}
              </span>
              {i !== arr.length - 1 && (
                <div
                  style={{
                    margin: "5px 2px",
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                    visibility:
                      elem.date && elem.date !== "end" ? "inherit" : "hidden",
                  }}
                >
                  <div
                    style={{
                      display: "block",
                      border: "1px solid #bdbdbd",
                      minHeight: "12px",
                      width: "1px",
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavigateController;
