import React from "react";
import { MDXProvider } from "@mdx-js/react";
import {
  TimelineContent,
  TimelineContentTitle,
  TimelineItemsContainer,
  StyledRepoCard,
  StyledUserCard,
  LinkText,
} from "./styled";
import TimelineItem from "./TimelineItem";
import { getTimelineItems } from "..";

type dateType = `${string}.${string}.${string}`;
type componentDataType = Record<dateType, typeof import("*.mdx")["default"]>;

const years = [2020, 2021, 2022, 2023];
const dates = Array.from(years, (year) =>
  Array.from({ length: 12 }, (_, month) =>
    Array.from(
      { length: 32 },
      (_, day) =>
        `${year}.${(month + 1).toString().padStart(2, "0")}.${day
          .toString()
          .padStart(2, "0")}`
    )
  )
).flat(2) as dateType[];

const TimelineItems: React.FC = () => {
  const [Components, setComponents] = React.useState<componentDataType>({});

  React.useEffect(() => {
    Promise.all(
      dates.map((date) =>
        import(`src/doc/timeline/${date.replaceAll(".", "")}.mdx`)
          .then<[dateType, typeof import("*.mdx")["default"]]>((res) => [
            date,
            res.default,
          ])
          .catch(() => undefined)
      )
    ).then((reses) => {
      const items = reses.filter(
        (r): r is NonNullable<typeof r> => r !== undefined
      );
      setComponents(Object.fromEntries(items));
      setTimeout(() => getTimelineItems(true), 500);
    });
  }, []);

  return (
    <TimelineItemsContainer>
      <MDXProvider
        components={{
          h1: TimelineContentTitle,
          p: TimelineContent,
          a: LinkText,
          UserCard: StyledUserCard,
          RepoCard: StyledRepoCard,
        }}
      >
        {dates.map((date, i) => {
          const Component = Components[date];
          return (
            <TimelineItem title={date} key={i}>
              {Component && <Component />}
            </TimelineItem>
          );
        })}
      </MDXProvider>
    </TimelineItemsContainer>
  );
};

export default TimelineItems;
