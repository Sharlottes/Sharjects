import React from "react";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

import { motion, useAnimationControls } from "framer-motion";
import type { CustomNextPage } from "../_app";

const getDist = (element: HTMLDivElement, targetPos = window.scrollY) =>
  (targetPos ?? 0) - element.offsetTop;
const getTimelineItems = () => {
  return [
    document.querySelector<HTMLDivElement>("div #top-anchor")!,
    ...document.querySelectorAll("div .has-content"),
    document.querySelector<HTMLDivElement>("div #bottom-anchor")!,
  ] as HTMLDivElement[];
};

const margin = 150;
const variants = {
  show: { x: 0 },
  hide: { x: -110 },
};

export type TimelineNavRefType = {
  setLatestItem: (item: HTMLDivElement) => void;
};
export interface TimelineNavProps {
  scroll: (direction: "up" | "down") => void;
}
const TimelineNav: CustomNextPage<
  TimelineNavProps,
  TimelineNavProps,
  React.ForwardRefExoticComponent<
    React.PropsWithoutRef<TimelineNavProps> &
      React.RefAttributes<TimelineNavRefType>
  >
> = React.forwardRef<TimelineNavRefType, TimelineNavProps>(
  ({ scroll }, ref) => {
    const [latestItem, setLatestItem] = React.useState<HTMLDivElement>();
    const [showed, setShowed] = React.useState(false);

    React.useImperativeHandle(ref, () => ({
      setLatestItem: (item) => setLatestItem(item),
    }));

    const controls = useAnimationControls();
    controls.start(showed ? "show" : "hide");

    const [sizedUp, setSizedUp] = React.useState(false);
    const handleClick = () => {
      setSizedUp((prev) => {
        controls.start({ height: prev ? "200px" : "60vh" });
        return !prev;
      });
    };

    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          height: "100vh",
          display: "flex",
          alignItems: "center",
          zIndex: 10,
        }}
      >
        <motion.div
          style={{
            width: "100px",
            height: "200px",
            boxShadow: "0 0 10px black",
            borderRadius: "10px",
          }}
          variants={variants}
          animate={controls}
        >
          <motion.div
            variants={{
              none: {},
              show: { x: 15 },
            }}
            whileTap={showed ? "none" : "show"}
            whileHover={showed ? "none" : "show"}
            transition={{
              type: "spring",
            }}
            style={{
              position: "absolute",
              right: "-30px",
            }}
          >
            <IconButton
              sx={{
                boxShadow: "0 0 10px black",
              }}
              onClick={() => setShowed((prev) => !prev)}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </motion.div>
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "white",
              borderRadius: "10px",
              fontSize: "max(12, 10%)",
            }}
          >
            <motion.div
              style={{
                height: "100%",
                display: sizedUp ? "none" : "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IconButton
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <KeyboardDoubleArrowUpIcon />
              </IconButton>
              <IconButton onClick={() => scroll("up")}>
                <KeyboardArrowUpIcon />
              </IconButton>
              <span style={{ cursor: "pointer" }} onClick={handleClick}>
                {latestItem?.innerText}
              </span>
              <IconButton onClick={() => scroll("down")}>
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
            </motion.div>
            <motion.div
              style={{
                height: "100%",
                display: sizedUp ? "block" : "none",
              }}
            >
              <div
                onClick={handleClick}
                style={{ margin: "5px", width: "100%" }}
              >
                {"< back"}
              </div>
              <Divider sx={{ width: "100%", margin: "10px 0" }} />
              <div style={{ height: "100%" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {getTimelineItems()
                    .sort(
                      (e1, e2) =>
                        Math.abs(getDist(e1, latestItem?.offsetTop)) -
                        Math.abs(getDist(e2, latestItem?.offsetTop))
                    )
                    .slice(0, 10)
                    .sort(
                      (e1, e2) =>
                        getDist(e1, latestItem?.offsetTop) -
                        getDist(e2, latestItem?.offsetTop)
                    )
                    .reverse()
                    .map(
                      (elem, i, arr) =>
                        elem.innerText && (
                          <div>
                            <span
                              style={{
                                margin: "5px 2px",
                                color:
                                  elem.innerText === latestItem?.innerText
                                    ? "red"
                                    : "inherit",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                window.scrollTo({
                                  top: elem.offsetTop - margin,
                                  behavior: "smooth",
                                });
                                setLatestItem(elem);
                              }}
                            >
                              {elem.innerText}
                            </span>
                            {i !== arr.length - 1 && elem.innerText && (
                              <div
                                style={{
                                  margin: "5px 2px",
                                  display: "flex",
                                  width: "100%",
                                  justifyContent: "center",
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
                        )
                    )}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    );
  }
);

TimelineNav.notPage = true;

export default TimelineNav;
