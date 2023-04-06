import React from "react";
import Link from "next/link";

import Tooltip from "@mui/material/Tooltip";

import { useTheme } from "@mui/material/styles";

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
import SideMenu from "../SideMenu";
import useMediaQuery from "@mui/material/useMediaQuery";
import Mathf from "src/utils/Mathf";
import * as S from "./Header.styled";

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

export interface HeaderProps {
  additional?: React.ReactNode | undefined;
}

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
        <S.StyledAppBar
          alphaAmount={alphaAmount}
          animate={controller}
          transition={{ duration: 0.3 }}
          variants={headerAnimateVaraints}
          position="fixed"
        >
          <S.StyledToolbar>
            <IconButton
              sx={{ color: "white" }}
              onClick={() => setOpen((opened) => !opened)}
            >
              <MenuIcon />
            </IconButton>
            <Tooltip title="back to main">
              <S.LandingPageLinkButton>
                <Link href="/">Sharlotte</Link>
              </S.LandingPageLinkButton>
            </Tooltip>
            <HeaderMenu />
          </S.StyledToolbar>
          {additional}
        </S.StyledAppBar>
      </motion.header>
      <SideMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default Header;
