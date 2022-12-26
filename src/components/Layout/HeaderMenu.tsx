import React from "react";

import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import Menu from "@mui/material/Menu";

import SettingsIcon from "@mui/icons-material/Settings";

import ThemeSelection from "./ThemeSelection";
import Profile from "./Profile";

const HeaderMenu: React.FC = () => {
  const [anchor, setAnchor] = React.useState<Element | null>(null);

  return (
    <>
      <IconButton
        sx={{ color: "white", marginLeft: "auto" }}
        onClick={(e) => setAnchor((prev) => (prev ? null : e.currentTarget))}
      >
        <SettingsIcon />
      </IconButton>
      <Menu
        open={Boolean(anchor)}
        anchorEl={anchor}
        componentsProps={{
          backdrop: {
            onClick: () => setAnchor(null),
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
        <ThemeSelection />
      </Menu>
    </>
  );
};

export default HeaderMenu;
