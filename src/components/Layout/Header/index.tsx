import React from "react";
import Link from "next/link";

import Tooltip from "@mui/material/Tooltip";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";

import { alpha, useTheme } from "@mui/material/styles";

import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import { useWindowDimensions } from "src/hooks/useWindowDimensions";
import { debounce } from "src/utils/debounce";

import {
  motion,
  useAnimationControls,
  useScroll,
  type Variants,
} from "framer-motion";
import HeaderMenu from "./HeaderMenu";
import SideMenu from "../../SideMenu";
import useMediaQuery from "@mui/material/useMediaQuery";
import Layouts from "src/core/Layouts";

export interface AdditionalHeaderProps {
  sidebarOpened: boolean;
  scrolled: boolean;
}

export interface HeaderProps {
  additional?: React.ReactNode | undefined;
}

const THRESHOLD = 300;

const decideAnimation = (y: number, open?: boolean) =>
  y == 0 ? "init" : open ? "sidebar" : "blur";

const Header: React.FC<HeaderProps> = ({ additional }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = React.useState(false);
  const controller = useAnimationControls();
  const { scrollY } = useScroll();

  const demension = useWindowDimensions();
  const headerAnimateVaraints = React.useMemo<Variants>(() => {
    const width = demension.offsetWidth;
    const headerWidth = width - Math.min(400, width * 0.15);
    const widthWithSidebar = (width + headerWidth) / 2 + 20;
    const leftAmount = (width - headerWidth) / 2;
    const headerAnimateVaraints = {
      sidebar: {
        width: isMobile ? width + 30 : widthWithSidebar,
        left: isMobile ? -15 : -20,
        margin: `10px 0`,
        borderRadius: "20px",
      },
      blur: {
        width: headerWidth,
        left: leftAmount,
        margin: `10px 0`,
        borderRadius: "20px",
      },
      init: {
        width: "100%",
        left: 0,
        margin: 0,
        borderRadius: "0px",
      },
    };

    controller.start(
      headerAnimateVaraints[
        decideAnimation(
          typeof window !== "undefined" ? window.scrollY : 0,
          open
        )
      ]
    );

    return headerAnimateVaraints;
  }, [demension.offsetWidth]);

  const appBarRef = React.useRef<HTMLDivElement>(null);
  const updateBackcolorOpacity = React.useCallback(
    (hover = false) => {
      if (!appBarRef.current) return;
      appBarRef.current.style.backgroundColor = alpha(
        theme.palette.primary.main,
        Math.max(hover ? 1 : 0.5, Math.min(1, 1 - scrollY.get() / THRESHOLD))
      );
    },
    [theme]
  );

  React.useEffect(() => {
    const animate = debounce((id: string) => {
      controller.start(id);
    }, 0.3 * 1000);
    const onChangeHandler = () => {
      const key = decideAnimation(
        typeof window !== "undefined" ? window.scrollY : 0,
        open
      );
      animate(key, key);
      updateBackcolorOpacity(scrollY.get() == 0 || open);
    };
    onChangeHandler();
    return scrollY.onChange(onChangeHandler);
  }, [open, updateBackcolorOpacity]);

  return (
    <>
      <motion.header
        onHoverStart={() => updateBackcolorOpacity(true)}
        onHoverEnd={() => updateBackcolorOpacity(scrollY.get() == 0 || open)}
      >
        <AppBar
          component={motion.div}
          animate={controller}
          transition={{ duration: 0.3 }}
          variants={headerAnimateVaraints}
          position="fixed"
          ref={appBarRef}
          sx={{
            transition: "background-color 300ms",
            backdropFilter: "blur(5px)",
            zIndex: Layouts.HEADER,
          }}
        >
          <Toolbar
            style={{
              padding: "0 16px",
            }}
            sx={{
              display: "flex",
              height: "60px",
              alignItems: "center",
            }}
          >
            <IconButton
              sx={{ color: "white" }}
              onClick={() => setOpen((opened) => !opened)}
            >
              <MenuIcon />
            </IconButton>
            <Tooltip title="back to main">
              <Button
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 20,
                  textAlign: "center",
                }}
              >
                <Link href="/">Sharlotte</Link>
              </Button>
            </Tooltip>
            <HeaderMenu />
          </Toolbar>
          {additional}
        </AppBar>
      </motion.header>
      <SideMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default Header;
