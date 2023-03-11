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
import { throttle } from "src/utils/throttle";

import {
  type AnimationControls,
  motion,
  useAnimationControls,
  useScroll,
  type Variants,
} from "framer-motion";
import HeaderMenu from "./HeaderMenu";
import SideMenu from "../../SideMenu";
import useMediaQuery from "@mui/material/useMediaQuery";
import Layouts from "src/core/Layouts";
import Mathf from "src/utils/Mathf";
import Colorf from "src/utils/Colorf";
import { toDigit } from "src/utils/toDigit";

export interface AdditionalHeaderProps {
  sidebarOpened: boolean;
  scrolled: boolean;
}

export interface HeaderProps {
  additional?: React.ReactNode | undefined;
}

const THRESHOLD = 300;

const animates: Record<
  ReturnType<typeof decideAnimation>,
  (controller: AnimationControls) => Promise<any> | undefined
> = {
  sidebar: throttle((controller) => controller.start("sidebar"), 0.3 * 1000),
  blur: throttle((controller) => controller.start("blur"), 0.3 * 1000),
  init: throttle((controller) => controller.start("init"), 0.3 * 1000),
};

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

  const [alphaAmount, setAlphaAmount] = React.useState(0);
  React.useEffect(() => {
    const onChangeHandler = () => {
      animates[
        decideAnimation(
          typeof window !== "undefined" ? window.scrollY : 0,
          open
        )
      ](controller);

      setAlphaAmount(Mathf.clamp(scrollY.get() / THRESHOLD));
    };
    onChangeHandler();
    return scrollY.onChange(onChangeHandler);
  }, [open]);

  return (
    <>
      <motion.header>
        <AppBar
          component={motion.div}
          animate={controller}
          transition={{ duration: 0.3 }}
          variants={headerAnimateVaraints}
          position="fixed"
          sx={{
            transition: "all 300ms",
            backdropFilter: "blur(5px)",
            zIndex: Layouts.HEADER,
            boxShadow: `0px 2px 4px -1px rgba(0,0,0,${
              alphaAmount * 0.2
            }), 0px 4px 5px 0px rgba(0,0,0,${
              alphaAmount * 0.14
            }), 0px 1px 10px 0px rgba(0,0,0,${alphaAmount * 0.12})`,
            backgroundColor: (theme) =>
              alpha(theme.palette.primary.main, alphaAmount * 0.75),
            "& *": {
              color: (theme) =>
                (theme.palette.mode === "light"
                  ? Colorf.colorLerp("#111111", "#ffffff", toDigit(alphaAmount))
                  : "white") + " !important",
            },
            "&:hover": {
              backgroundColor: (theme) => alpha(theme.palette.primary.main, 1),
              "& *": {
                color: "white !important",
              },
            },
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
