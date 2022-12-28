import React from "react";

import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import dynamic from "next/dynamic";
import Layout from "components/Layout";

const TimelineScroll = dynamic(
  () => import("components/pages/timeline/TimelineScroll"),
  {
    suspense: true,
  }
);

const TimelineHeader: React.FC = () => {
  const handleClick = () => {
    window.scrollTo({
      top:
        document.querySelector<HTMLDivElement>("div #bottom-anchor")
          ?.offsetTop ?? 0,
      behavior: "smooth",
    });
  };
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
        <div
          onClick={handleClick}
          style={{ color: "blue", cursor: "pointer", display: "flex" }}
        >
          <Typography>go to bottom</Typography>
          <ArrowDropDownIcon />
        </div>
      </div>
    </div>
  );
};

const TimelinePage: React.FC = () => {
  return (
    <Layout>
      <div id="top-anchor" />
      <TimelineHeader />
      <Divider />
      <React.Suspense fallback={"loading..."}>
        <TimelineScroll />
      </React.Suspense>
      <div id="bottom-anchor" />
    </Layout>
  );
};

export default TimelinePage;
