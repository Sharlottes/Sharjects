import React from "react";
import Link from "next/link";

import Tooltip from "@mui/material/Tooltip";
import { throttle } from "src/utils/throttle";

import {
  AnimationControls,
  Variants,
  motion,
  useAnimationControls,
} from "framer-motion";
import HeaderMenu from "./HeaderMenu/HeaderMenu";
import SideMenu from "./SideMenu/SideMenu";
import * as S from "./Header.styled";
import useHeaderAnimationVariants from "src/hooks/useHeaderAnimationVariants";
import useHeaderAlphaAmount from "src/hooks/useHeaderAlphaAmount";

// TODO: thinking about sidebar interaction

export interface HeaderProps {
  additional?: React.ReactNode | undefined;
}

const Header: React.FC<HeaderProps> = ({ additional }) => {
  const startAnimation = throttle(
    (controller: AnimationControls, variant: Variants) =>
      controller.start(variant[decideAnimation()]),
    0.3 * 1000
  );

  const [menuOpened, setMenuOpened] = React.useState<{
    side: boolean;
    setting: boolean;
  }>({ side: false, setting: false });

  const controller = useAnimationControls();
  const alphaAmount = useHeaderAlphaAmount();
  const variants = useHeaderAnimationVariants();

  const decideAnimation = (): keyof typeof variants =>
    typeof window == "undefined" || window.scrollY == 0
      ? "init"
      : menuOpened.side && menuOpened.setting
      ? "both"
      : menuOpened.side
      ? "toLeft"
      : menuOpened.setting
      ? "toRight"
      : "blur";

  React.useEffect(() => {
    startAnimation(controller, variants);
  }, [controller, variants, menuOpened]);

  return (
    <motion.header>
      <S.StyledAppBar
        alpha={menuOpened.setting || menuOpened.side ? 1.4 : alphaAmount}
        animate={controller}
        transition={{ duration: 0.3 }}
        variants={variants}
        position="fixed"
      >
        <S.StyledToolbar>
          <SideMenu
            onOpenChanged={(isOpened) => {
              setMenuOpened((prev) => ({ ...prev, side: isOpened }));
            }}
          />
          <Tooltip title="back to main">
            <S.LandingPageLinkButton>
              <Link href="/">Sharlotte</Link>
            </S.LandingPageLinkButton>
          </Tooltip>
          <HeaderMenu
            onOpenChanged={(isOpened) => {
              setMenuOpened((prev) => ({ ...prev, setting: isOpened }));
            }}
          />
        </S.StyledToolbar>
        {additional}
      </S.StyledAppBar>
    </motion.header>
  );
};

export default Header;
