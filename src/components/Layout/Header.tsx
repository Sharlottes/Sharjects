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
import HeaderMenu from "./HeaderMenu";
import SideMenu from "./SideMenu";

import S from "./Header.styled";
import U from "./Header.util";

export interface MenuOpenData {
  side: boolean;
  setting: boolean;
}

export interface HeaderProps {
  additional?: React.ReactNode | undefined;
}

const Header: React.FC<HeaderProps> = ({ additional }) => {
  const startAnimation = throttle(
    (controller: AnimationControls, variant: Variants) =>
      controller.start(variant[U.decideAnimation(menuOpened)]),
    0.3 * 1000
  );

  const [menuOpened, setMenuOpened] = React.useState<MenuOpenData>({
    side: false,
    setting: false,
  });

  const controller = useAnimationControls();
  const alphaAmount = U.useHeaderAlphaAmount();
  const variants = U.useHeaderAnimationVariants();

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
