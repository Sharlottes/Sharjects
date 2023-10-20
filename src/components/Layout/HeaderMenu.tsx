import React from "react";

import SettingsIcon from "@mui/icons-material/Settings";
import { useTheme } from "@mui/material/styles";

import ThemedColorSelectionMenu from "./ThemedColorSelectionMenu";
import { useThemeController } from "src/components/providers/MainThemeProvider";
import MenuWrapper, { type MenuWrapperProps } from "src/components/MenuWrapper";

import S from "./HeaderMenu.styled";

const IconDrawer: React.FC<{ onClick: React.MouseEventHandler }> = ({
  onClick,
}) => (
  <S.HeaderMenuIcon aria-label="setting menu" onClick={onClick}>
    <SettingsIcon />
  </S.HeaderMenuIcon>
);

const HeaderMenu: React.FC<Pick<MenuWrapperProps, "onOpenChanged">> = ({
  onOpenChanged,
}) => {
  const { toggleColorMode } = useThemeController();
  const theme = useTheme();

  return (
    <MenuWrapper
      onOpenChanged={onOpenChanged}
      IconDrawer={IconDrawer}
      PaperProps={{
        sx: {
          minWidth: "180px",
          padding: "0 10px",
          marginRight: "20px",
          borderRadius: "10px",
        },
      }}
    >
      <S.ColorSelectionMenuButton>
        <ThemedColorSelectionMenu />
        <S.ThemeSwitch
          onClick={toggleColorMode}
          checked={theme.palette.mode === "dark"}
        />
      </S.ColorSelectionMenuButton>
    </MenuWrapper>
  );
};

export default HeaderMenu;
