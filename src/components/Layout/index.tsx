import React from "react";

import Header from "./Header";
import Footer from "./Footer";
import ScrollFab from "./ScrollFab";
import Box from "@mui/material/Box";

interface LayoutProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children, header, footer }) => (
  <>
    <Header additional={header} />
    <ScrollFab />
    <Box component="main" mt="60px">
      {children}
    </Box>
    <Footer additional={footer} />
  </>
);

export default Layout;
