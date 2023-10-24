import React from "react";
import Link from "next/link";

import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";

import * as Colors from "@mui/material/colors";
import type { Color } from "@mui/material";

import { motion, useAnimationControls, useScroll } from "framer-motion";
import { assignInlineVars, setElementVars } from "@vanilla-extract/dynamic";

import { useThemeController } from "src/components/providers/MainThemeProvider";
import MenuWrapper from "src/components/MenuWrapper";
import ThemedColors from "src/core/ThemedColors";
import { throttle } from "src/utils/throttle";
import ThemeVariables from "src/core/ThemeVariables";
import Mathf from "src/utils/Mathf";

import { ThemeSwitch } from "./Header.styled";
import * as styles from "./Header.css";
import SideMenu from "./SideMenu";

export default function Header({ children }: React.PropsWithChildren) {
  const [menuOpened, setMenuOpened] = React.useState(false);
  const appBarRef = React.useRef<HTMLDivElement>(null!);
  const { setColorPalette, currentColors, toggleColorMode } =
    useThemeController();
  const controller = useAnimationControls();
  const { scrollY } = useScroll();

  const handleOpenChanged = (isOpened: boolean) => {
    setMenuOpened(isOpened);
    controller.start(window.scrollY != 0 || isOpened ? "init" : "blur");
  };

  React.useEffect(() => {
    let lastY = scrollY.get();
    const handleHeaderStyle = (lastY: number) => {
      setElementVars(appBarRef.current, {
        [styles.alphaAmount]: String(
          menuOpened
            ? 0
            : Mathf.clamp(
                ((lastY / 100) * document.body.scrollHeight) / THRESHOLD
              )
        ),
      });
    };
    const handleScrollEvent = throttle(
      (y = window.scrollY) => {
        lastY = y;
        controller.start(y == 0 || menuOpened ? "init" : "blur");
      },
      0.1 * 1000,
      (y = window.scrollY) => lastY != y
    );
    const handleEvent = (ev: number | UIEvent) => {
      const y = typeof ev === "number" ? ev : window.scrollY;
      handleScrollEvent(y);
      handleHeaderStyle(y);
    };
    handleEvent(window.scrollY);
    const removeScrollEvent = scrollY.on("change", handleEvent);
    window.addEventListener("resize", handleEvent);
    return () => {
      window.removeEventListener("resize", handleEvent);
      removeScrollEvent();
    };
  }, [controller, scrollY, menuOpened]);

  return (
    <AppBar
      ref={appBarRef}
      className={styles.appBar}
      component={motion.header}
      animate={controller}
      transition={{ duration: 0.3 }}
      variants={variants}
    >
      <Toolbar className={styles.toolbar}>
        <SideMenu onOpenChanged={handleOpenChanged} />
        <Tooltip title="back to main">
          <Link href="/" className={styles.gotoHomeLink}>
            Sharlotte
          </Link>
        </Tooltip>

        <MenuWrapper
          IconDrawer={ColorSelectionMenuButton}
          PaperProps={{
            className: styles.colorSelectMenu,
          }}
        >
          <p>Theme Selection</p>
          <Divider />
          <div className={styles.ColorSelectionContainer}>
            {ThemedColors.map((color) => (
              <div
                key={color}
                className={styles.coloredDoat}
                style={assignInlineVars({
                  [styles.color]: Colors[color][300],
                })}
                onClick={() => setColorPalette(color)}
              />
            ))}
            <motion.div
              className={styles.ColorSelectIndicator}
              animate={getColorCoord(currentColors)}
            />
          </div>
        </MenuWrapper>

        <ThemeSwitch
          checkedIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20"
              width="20"
              viewBox="0 0 20 20"
            >
              <path
                fill="white"
                d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"
              />
            </svg>
          }
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20"
              width="20"
              viewBox="0 0 20 20"
            >
              <path
                fill="black"
                d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"
              />
            </svg>
          }
          focusVisibleClassName=".Mui-focusVisible"
          disableRipple
          onClick={toggleColorMode}
        />
      </Toolbar>
      {children}
    </AppBar>
  );
}

const THRESHOLD = 300;
const variants = {
  blur: () => {
    const fullWidth = document.body.offsetWidth;
    const headerWidth = fullWidth - Math.min(400, fullWidth * 0.15);
    const gap = (fullWidth - headerWidth) / 2;
    return {
      width: fullWidth - Math.min(400, fullWidth * 0.15),
      x: gap,
      margin: `10px 0`,
      borderRadius: "20px",
    };
  },
  init: () => ({
    width: document.body.offsetWidth,
    x: 0,
    margin: 0,
    borderRadius: "0px",
  }),
};

function getColorCoord(colors: Color) {
  const index = ThemedColors.findIndex(
    (color) => colors[300] === Colors[color][300]
  );

  return {
    x: 30 * (index % 10),
    y: 25 + 30 * ~~(index / 10),
  };
}

function ColorSelectionMenuButton({
  onClick,
}: Pick<React.HTMLAttributes<HTMLDivElement>, "onClick">) {
  return (
    <div
      className={styles.coloredDoat}
      style={assignInlineVars({
        [styles.color]: ThemeVariables.palette.main[400],
      })}
      onClick={onClick}
    />
  );
}
