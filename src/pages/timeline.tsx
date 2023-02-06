import React from "react";

import Divider from "@mui/material/Divider";
import Layout from "src/components/Layout";
import Typography from "@mui/material/Typography";
import TimelineItems from "src/components/pages/timeline/TimelineItems";
import TimelineNav from "src/components/pages/timeline/TimelineNav";
import { useObserveKeyHandle } from "src/components/pages/timeline/useObserveKeyHandle";

const TimelinePage: React.FC = () => {
  useObserveKeyHandle();
  return (
    <Layout>
      <div id="top-anchor" />
      <Typography variant="h1" fontWeight="bold" align="center">
        Timeline
      </Typography>
      <Typography variant="body1" p="20px" align="center">
        약 2년간의 프로그래밍 프로젝트 개발/중단 행적을 나열한 타임라인
      </Typography>
      <Divider />
      <TimelineNav />
      <TimelineItems />
      <div id="bottom-anchor" />
    </Layout>
  );
};

export default TimelinePage;
