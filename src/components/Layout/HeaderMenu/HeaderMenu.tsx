import React from "react";

import SettingsIcon from "@mui/icons-material/Settings";
import { useTheme } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import Menu from "@mui/material/Menu";

import Profile from "./Profile";
import * as S from "./HeaderMenu.styled";
import ThemedColorSelectionMenu from "./ThemedColorSelectionMenu";
import { useThemeController } from "src/components/MainThemeProvider";

export interface HeaderMenuProps {
  anchor: Element | null;
  onBackdropClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
}

const HeaderMenu: React.FC<HeaderMenuProps> = ({ anchor, onBackdropClick }) => {
  const { toggleColorMode } = useThemeController();
  const theme = useTheme();

  return (
    <Menu
      open={Boolean(anchor)}
      anchorEl={anchor}
      componentsProps={{
        backdrop: {
          onClick: onBackdropClick,
        },
      }}
      disableScrollLock
      PaperProps={{
        sx: {
          minWidth: "180px",
          padding: "0 10px",
          marginRight: "20px",
          borderRadius: "10px",
        },
      }}
    >
      <Profile />
      <Divider />
      <S.ColorSelectionMenuButton>
        <ThemedColorSelectionMenu />
        <S.ThemeSwitch
          onClick={toggleColorMode}
          checked={theme.palette.mode === "dark"}
        />
      </S.ColorSelectionMenuButton>
    </Menu>
  );
};

const HeaderMenuWrapper: React.FC = () => {
  const [anchor, setAnchor] = React.useState<Element | null>(null);

  return (
    <>
      <S.HeaderMenuIcon
        onClick={(e) => setAnchor((prev) => (prev ? null : e.currentTarget))}
      >
        <SettingsIcon />
      </S.HeaderMenuIcon>
      <HeaderMenu anchor={anchor} onBackdropClick={() => setAnchor(null)} />
    </>
  );
};

export default HeaderMenuWrapper;
