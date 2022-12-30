import React from "react";

import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import Layout from "components/Layout";
import TimelineScroll from "components/pages/timeline/TimelineScroll";

const TimelineHeader: React.FC = () => {
  return (
    <div
      style={{
        margin: "120px 0 0 20px",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "flex-end",
      }}
    >
      <Typography variant="h3" fontFamily="700">
        Timeline
      </Typography>
      <div style={{ marginLeft: "20px" }}>
        <span>
          약 2년간의 프로그래밍 프로젝트 개발/중단 행적을 나열한 타임라인입니다
        </span>
      </div>
    </div>
  );
};

const TimelinePage: React.FC = () => {
  return (
    <Layout>
      <TimelineHeader />
      <Divider />
      <TimelineScroll />
    </Layout>
  );
};

export default TimelinePage;
