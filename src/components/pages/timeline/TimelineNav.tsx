import React from "react";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

import { TimelineItemData, getNearestItem, tryScroll } from ".";
import { getTimelineItems, scrollWindow } from ".";

import { motion, useAnimationControls } from "framer-motion";
import Arrayf from "src/utils/Arrayf";
import { debounce } from "src/utils/debounce";

const NAV_ITEM_LENGTH = 5;
const variants = {
  show: { x: 0 },
  hide: { x: -110 },
};

const TimelineNav: React.FC = () => {
  const [latestItem, setLatestItem] = React.useState<TimelineItemData>({
    y: 0,
    date: "top",
  });
  const [sortedItems, setSortedItem] = React.useState<TimelineItemData[]>([]);

  React.useEffect(() => {
    const handleScroll = debounce((e: Event) => {
      console.log(e);
      const list = getTimelineItems();
      const nearestItem = getNearestItem();
      setLatestItem(nearestItem);

      const index = Math.max(
        0,
        list.findIndex(({ y }) => y == nearestItem.y)
      );
      setSortedItem(
        Arrayf[index < NAV_ITEM_LENGTH ? "padRight" : "padLeft"](
          list.slice(
            Math.max(0, index - ~~(NAV_ITEM_LENGTH / 2)),
            Math.min(list.length, index + ~~(NAV_ITEM_LENGTH / 2) + 1)
          ),
          NAV_ITEM_LENGTH,
          { date: "", y: window.screenY }
        )
      );
    }, 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [showed, setShowed] = React.useState(false);
  const controls = useAnimationControls();
  controls.start(showed ? "show" : "hide");

  const [sizedUp, setSizedUp] = React.useState(false);
  const handleClick = () => {
    setSizedUp((prev) => {
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
          height: "fit-content",
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
            <IconButton onClick={() => tryScroll("up")}>
              <KeyboardArrowUpIcon />
            </IconButton>
            <span style={{ cursor: "pointer" }} onClick={handleClick}>
              {latestItem.date}
            </span>
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
          </motion.div>
          <motion.div
            style={{
              height: "100%",
              display: sizedUp ? "block" : "none",
            }}
          >
            <div onClick={handleClick} style={{ margin: "5px", width: "100%" }}>
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
                {sortedItems.map((elem, i, arr) => (
                  <div key={i}>
                    <span
                      style={{
                        margin: "5px 2px",
                        color: elem.y === latestItem.y ? "red" : "inherit",
                        cursor: "pointer",
                      }}
                      onClick={() => scrollWindow(elem.y)}
                    >
                      {elem.date}
                    </span>
                    {i !== arr.length - 1 && elem.date && (
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
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default TimelineNav;
