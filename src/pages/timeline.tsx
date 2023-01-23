import React from "react";

import Divider from "@mui/material/Divider";
import Layout from "src/components/Layout";
import TimelineScroll from "src/components/pages/timeline/TimelineScroll";
import TimelineTitle from "src/components/pages/timeline/TimelineTitle";

const TimelinePage: React.FC = () => (
  <Layout>
    <div id="top-anchor" />
    <TimelineTitle />
    <Divider />
    <TimelineScroll />
    <div id="bottom-anchor" />
  </Layout>
);

export default TimelinePage;
