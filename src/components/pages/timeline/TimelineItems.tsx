import dynamic from "next/dynamic";

import GithubUserCard from "src/components/GithubUserCard";
import GithubRepoCard from "src/components/GithubRepoCard";
import Skeleton from "@mui/material/Skeleton";
import { MDXProvider } from "@mdx-js/react";

import { motion } from "framer-motion";
import * as styles from "./TimelineItems.css";
import timelineMetadata from "public/data/timelineMetadata.json";

const dates = Array.from([2020, 2021, 2022, 2023], (year) =>
  Array.from({ length: 12 }, (_, month) =>
    Array.from(
      { length: 32 },
      (_, day) =>
        `${year}${(month + 1).toString().padStart(2, "0")}${day
          .toString()
          .padStart(2, "0")}`
    )
  )
).flat(2);
const dateStringify = (date: string) =>
  date[0] + date[1] + "." + date[2] + date[3] + "." + date[4] + date[5];

const TimelineParagraphComponents = Object.fromEntries(
  dates.map((date) => [
    date,
    //@ts-ignore
    timelineMetadata[date]
      ? dynamic<typeof import("*.mdx")["default"]>(
          () =>
            import("public/doc/timeline/" + date + ".mdx").then((res) => {
              const Component = res.default;
              return () => (
                <>
                  <p className={styles.header + " has-content"}>
                    {dateStringify(date)}
                  </p>
                  <div className={styles.timeContent}>
                    <Component />
                  </div>
                </>
              );
            }),
          {
            loading: () => <Skeleton variant="rounded" height={150} />,
            ssr: false,
          }
        )
      : () => <span className={styles.dummyHeader}>{dateStringify(date)}</span>,
  ])
);

export default function TimelineItems() {
  return (
    <div className={styles.timelineItemsContainer}>
      <MDXProvider
        components={{
          UserCard: GithubUserCard,
          RepoCard: GithubRepoCard,
        }}
      >
        {Object.entries(TimelineParagraphComponents).map(
          ([date, Component]) => {
            return (
              <div className={styles.timelineItemContainer} key={date}>
                <motion.span
                  className={styles.timeConnector}
                  initial={{ borderLeftColor: "rgba(74.1, 74.1, 74.1, 0)" }}
                  whileInView={{
                    borderLeftColor: "rgba(74.1, 74.1, 74.1, 0.3)",
                  }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.1 }}
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3 }}
                >
                  <Component />
                </motion.div>
              </div>
            );
          }
        )}
      </MDXProvider>
    </div>
  );
}
