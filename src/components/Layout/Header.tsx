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
const decideAnimation = () =>
  typeof window == "undefined" || window.scrollY == 0 ? "init" : "blur";

export interface HeaderProps {
  additional?: React.ReactNode | undefined;
}

const Header: React.FC<HeaderProps> = ({ additional }) => {
  const controller = useAnimationControls();
  const startAnimation = throttle(
    (controller: AnimationControls, variant: Variants) =>
      controller.start(variant[decideAnimation()]),
    0.3 * 1000
  );

  const variants = useHeaderAnimationVariants((variants) =>
    startAnimation(controller, variants)
  );
  const alphaAmount = useHeaderAlphaAmount();

  return (
    <motion.header>
      <S.StyledAppBar
        alpha={alphaAmount}
        animate={controller}
        transition={{ duration: 0.3 }}
        variants={variants}
        position="fixed"
      >
        <S.StyledToolbar>
          <SideMenu />
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
  );
};

export default Header;
