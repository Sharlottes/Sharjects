import React from "react";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

import IconButton from "@mui/material/IconButton";

import DateTypography, { type DateTypographyProps } from "./DateTypography";
import { scrollWindow, tryScroll } from "../..";

const buttons: [React.FC, () => void][] = [
  [KeyboardDoubleArrowUpIcon, () => scrollWindow(0)],
  [KeyboardArrowUpIcon, () => tryScroll("up")],
  [KeyboardArrowDownIcon, () => tryScroll("down")],
  [
    KeyboardDoubleArrowDownIcon,
    () => scrollWindow(document.documentElement.scrollHeight),
  ],
];

const ScrollController: React.FC<DateTypographyProps> = (props) => (
  <div>
    {buttons.map(([Icon, onClick], i) => (
      <React.Fragment key={i}>
        <IconButton onClick={onClick}>
          <Icon />
        </IconButton>
        {i == 1 && <DateTypography {...props} />}
      </React.Fragment>
    ))}
  </div>
);

export default ScrollController;
