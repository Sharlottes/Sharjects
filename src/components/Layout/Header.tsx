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
import variableMap from "src/lib/variableMap";
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
        [styles.color]: variableMap.palette.main[300],
      })}
      onClick={onClick}
    />
  );
}
