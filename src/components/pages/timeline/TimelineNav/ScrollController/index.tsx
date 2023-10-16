import React from "react";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

import IconButton from "@mui/material/IconButton";

import DateTypography, { type DateTypographyProps } from "./DateTypography";
import { useTimeline, ScrollDirectionType } from "../../TimelineProvider";

const buttons: [React.FC, ScrollDirectionType | (() => number)][] = [
  [KeyboardDoubleArrowUpIcon, () => 0],
  [KeyboardArrowUpIcon, "up"],
  [KeyboardArrowDownIcon, "down"],
  [KeyboardDoubleArrowDownIcon, () => document.documentElement.scrollHeight],
];

export default function ScrollController(props: DateTypographyProps) {
  const { scrollWindow } = useTimeline();

  return (
    <div>
      {buttons.map(([Icon, getY], i) => (
        <React.Fragment key={i}>
          <IconButton
            onClick={() =>
              scrollWindow(typeof getY === "string" ? getY : getY())
            }
          >
            <Icon />
          </IconButton>
          {i == 1 && <DateTypography {...props} />}
        </React.Fragment>
      ))}
    </div>
  );
}
