import React from "react";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import Layout from "./Layout";
import Tab from "@mui/material/Tab";
import * as S from "./TabLayout.styled";

interface TabLayoutProps {
  onIndexChanged?: (index: number) => void;
  tabs: string[];
}

function TabLayout({
  onIndexChanged,
  tabs,
  children,
}: React.PropsWithChildren<TabLayoutProps>) {
  const [shown, setShown] = React.useState(false);
  const [index, setIndex] = React.useState(0);

  return (
    <Layout>
      <S.TabLayoutCollapse in={shown}>
        <S.TabLayoutToolbar variant="dense">
          <S.TabLayoutTabs
            value={index}
            onChange={(_, index) => {
              setIndex(index);
              if (onIndexChanged) onIndexChanged(index);
            }}
          >
            {tabs.map((tab, i) => (
              <Tab key={i} label={tab} />
            ))}
          </S.TabLayoutTabs>
        </S.TabLayoutToolbar>
      </S.TabLayoutCollapse>

      <S.TabLayoutCollapseFab
        color="inherit"
        size="small"
        shown={shown.toString()}
        onClick={() => setShown((prev) => !prev)}
        style={{
          position: "fixed",
          top: "67px",
        }}
      >
        {shown ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </S.TabLayoutCollapseFab>
      {children}
    </Layout>
  );
}

export default TabLayout;
