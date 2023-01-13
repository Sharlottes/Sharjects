import Divider from "@mui/material/Divider";
import TimelineItem from "../TimelineItem";
import { events } from "../events";
import Box from "@mui/material/Box";
import { useScroll, useSpring, motion } from "framer-motion";

type monthType = `${2020 | 2021 | 2022}.${string}`;
type dateType = `${monthType}.${string}`;

const dates = Array.from([2020, 2021, 2022, 2023], (year) =>
  Array.from({ length: 12 }, (_, month) =>
    Array.from(
      { length: 31 },
      (__, day) =>
        `${year}.${(month + 1).toString().padStart(2, "0")}.${(day + 1)
          .toString()
          .padStart(2, "0")}`
    )
  )
) as dateType[][][];

const TimelineItems: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress);

  let count = 0;

  return (
    <div style={{ display: "flex", alignItems: "stretch" }}>
      <Box
        component={motion.div}
        sx={{
          margin: "0 10px",
          width: "1px",
          scaleY: scaleY.get(),

          backgroundColor: (theme) => theme.palette.primary.main,
        }}
      />
      <Box sx={{}}>
        {dates
          .map((years, i) =>
            years.map((monthes, ii) => (
              <div key={monthes[0]}>
                <TimelineItem
                  custom={++count}
                  title={monthes[0].slice(0, 7)}
                  last={i === dates.length - 1 && ii === years.length - 1}
                >
                  {events[monthes[0].slice(0, 7) as monthType]}
                </TimelineItem>
                <div style={{ marginLeft: "4%" }}>
                  {monthes.map((date, iii) => (
                    <TimelineItem
                      custom={++count}
                      key={`${i}${ii}${iii}`}
                      title={date}
                      last={
                        i === dates.length - 1 &&
                        ii === years.length - 1 &&
                        iii === monthes.length - 1
                      }
                    >
                      {events[date]}
                    </TimelineItem>
                  ))}
                </div>
                <Divider />
              </div>
            ))
          )
          .flat()}
      </Box>
    </div>
  );
};

export default TimelineItems;
