import React from "react";
import Link from "next/link";

import ClickAwayListener from "@mui/material/ClickAwayListener";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import Popper from "@mui/material/Popper";
import Avatar from "@mui/material/Avatar";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";

import SideMenu from "../SideMenu";
import ThemeSelection from "./ThemeSelection";
import { debounce } from "src/utils/debounce";

import { signIn, signOut, useSession } from "next-auth/react";
import {
  motion,
  useScroll,
  useAnimationControls,
  Variants,
} from "framer-motion";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import { alpha } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface HeaderProps {
  additional?: React.ReactNode | undefined;
}

const Header: React.FC<HeaderProps> = ({ additional }) => {
  const controller = useAnimationControls();
  const { scrollY } = useScroll();
  const [open, setOpen] = React.useState(false);
  const decideAnimation = (y: number, open?: boolean) =>
    y >= 1 ? (open ? "sidebar" : "blur") : "init";

  const { width } = useWindowDimensions();
  const headerAnimateVaraints = React.useMemo<Variants>(() => {
    const headerWidth = width - Math.min(400, width * 0.15);
    const widthWithSidebar = width / 2 + headerWidth / 2 + 20;
    const leftAmount = (width - headerWidth) / 2;
    const headerAnimateVaraints = {
      sidebar: {
        width: widthWithSidebar,
        left: `-20px`,
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
  }, [width]);

  const appBarRef = React.useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const updateBackcolorOpacity = React.useCallback(
    (hover = false) => {
      if (!appBarRef.current) return;
      const threshold = 300;
      appBarRef.current.style.backgroundColor = alpha(
        theme.palette.primary.main,
        Math.max(hover ? 1 : 0.5, Math.min(1, 1 - scrollY.get() / threshold))
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
      updateBackcolorOpacity();
    };
    onChangeHandler();
    return scrollY.onChange(onChangeHandler);
  }, [open, updateBackcolorOpacity]);

  return (
    <>
      <motion.header
        onHoverStart={() => updateBackcolorOpacity(true)}
        onHoverEnd={() => updateBackcolorOpacity(open)}
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
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
        >
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <IconButton
                sx={{ color: "white" }}
                onClick={() => setOpen((opened) => !opened)}
              >
                <MenuIcon />
              </IconButton>
              <Tooltip title="back to main">
                <Link href="/">
                  <Button
                    sx={{
                      marginLeft: "10px",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: 20,
                      textAlign: "center",
                    }}
                  >
                    Sharlotte
                  </Button>
                </Link>
              </Tooltip>
            </div>
            <HeaderMenu />
          </Toolbar>
          {additional}
        </AppBar>
      </motion.header>
      <SideMenu variant="persistent" open={open} />
    </>
  );
};

const HeaderMenu: React.FC = () => {
  const [anchor, setAnchor] = React.useState<Element | null>(null);

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <IconButton
        sx={{ color: "white" }}
        onClick={(e) => e.currentTarget && setAnchor(e.currentTarget)}
      >
        <SettingsIcon />
      </IconButton>
      <Popper
        open={Boolean(anchor)}
        anchorEl={anchor}
        sx={{
          zIndex: 9999,
        }}
      >
        <ClickAwayListener onClickAway={() => setAnchor(null)}>
          <Paper
            sx={{
              minWidth: "180px",
              padding: "0 10px",
              marginRight: "20px",
              borderRadius: "10px",
            }}
          >
            <Profile />
            <Divider />
            <ThemeSelection />
          </Paper>
        </ClickAwayListener>
      </Popper>
    </div>
  );
};

const Profile: React.FC = () => {
  const { data: session, status } = useSession();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        margin: "0 10px",
        width: "100%",
      }}
    >
      <a
        href="/mypage"
        style={{ display: "flex", alignItems: "center", whiteSpace: "nowrap" }}
      >
        <Avatar
          src={session?.user?.image ?? ""}
          sx={{
            padding: "4px",
            margin: "4px",
            width: "35px",
            height: "35px",
            backgroundColor: "rgba(0,0,0,0)",
          }}
        />
        {session?.user?.name ?? "not logged in!"}
      </a>
      {status === "authenticated" ? (
        <IconButton disableRipple onClick={() => signOut()}>
          <LogoutIcon />
        </IconButton>
      ) : (
        <IconButton disableRipple onClick={() => signIn()}>
          <LoginIcon />
        </IconButton>
      )}
    </div>
  );
};

export default Header;
