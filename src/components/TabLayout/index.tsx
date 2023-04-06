import React from "react";

import Collapse from "@mui/material/Collapse";
import Toolbar from "@mui/material/Toolbar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { darken } from "@mui/material/styles";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import Layout from "../Layout";
import { CollapseFab } from "./styled";

export interface TabLayoutProps extends React.PropsWithChildren {
  onIndexChanged?: (index: number) => void;
  tabs: string[];
}

const TabLayout: React.FC<TabLayoutProps> = ({ onIndexChanged, tabs }) => {
  const [shown, setShown] = React.useState(false);
  const [index, setIndex] = React.useState(0);

  return (
    <>
      <Collapse
        in={shown}
        sx={{
          borderRadius: "0 0 20px 20px",
          backdropFilter: "brightness(0.9)",
        }}
      >
        <Toolbar variant="dense" sx={{ ml: "20px", width: "80%" }}>
          <Tabs
            value={index}
            onChange={(_, index) => {
              setIndex(index);
              if (onIndexChanged) onIndexChanged(index);
            }}
            sx={{
              "& .MuiTab-root": {
                "&.Mui-selected": {
                  color: (theme) => darken(theme.palette.primary.main, 0.5),
                },
                transition: "color 0.5s",
              },
            }}
          >
            {tabs.map((tab, i) => (
              <Tab key={i} label={tab} />
            ))}
          </Tabs>
        </Toolbar>
      </Collapse>

      <CollapseFab
        color="inherit"
        size="small"
        shown={shown.toString()}
        onClick={() => setShown((prev) => !prev)}
      >
        {shown ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </CollapseFab>
    </>
  );
};

const TabLayoutWrapper: React.FC<React.PropsWithChildren & TabLayoutProps> = ({
  children,
  ...props
}) => (
  <Layout>
    <TabLayout {...props} />
    {children}
  </Layout>
);

export default TabLayoutWrapper;
