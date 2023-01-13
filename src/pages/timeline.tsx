import React from "react";

import Divider from "@mui/material/Divider";
import Layout from "components/Layout";
import TimelineScroll from "components/pages/timeline/TimelineScroll";
import TimelineTitle from "components/pages/timeline/TimelineTitle";

const TimelinePage: React.FC = () => {
  return (
    <Layout>
      <div id="top-anchor" />
      <TimelineTitle />
      <Divider />
      <TimelineScroll />
      <div id="bottom-anchor" />
    </Layout>
  );
};

export default TimelinePage;
