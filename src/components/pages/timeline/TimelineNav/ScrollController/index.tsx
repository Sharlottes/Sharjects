import React from "react";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

import IconButton from "@mui/material/IconButton";

import { tryScroll } from "../..";
import DateTypography, { type DateTypographyProps } from "./DateTypography";

const ScrollController: React.FC<DateTypographyProps> = (props) => (
  <div>
    <IconButton onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
      <KeyboardDoubleArrowUpIcon />
    </IconButton>
    <IconButton onClick={() => tryScroll("up")}>
      <KeyboardArrowUpIcon />
    </IconButton>
    <DateTypography {...props} />
    <IconButton onClick={() => tryScroll("down")}>
      <KeyboardArrowDownIcon />
    </IconButton>
    <IconButton
      onClick={() =>
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        })
      }
    >
      <KeyboardDoubleArrowDownIcon />
    </IconButton>
  </div>
);

export default ScrollController;
