import { motion, type Variants } from "framer-motion";
import Box from "@mui/material/Box";
import { lighten } from "@mui/material";

export type TimelineItemProps = {
  custom: number;
  title: string;
  children?: JSX.Element | undefined;
  last?: boolean;
};

const timelineAnimateVariants: Variants = {
  show: (i) => ({
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: i / 10,
    },
  }),
};

const TimelineItem: React.FC<TimelineItemProps> = ({
  title,
  children,
  last = false,
  custom,
}) => (
  <>
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate="show"
      variants={timelineAnimateVariants}
      custom={custom}
    >
      {children ? (
        <>
          <span
            style={{ color: "themedBlack", fontFamily: "bold", fontSize: 35 }}
            className="has-content"
          >
            {title}
          </span>
          <Box
            sx={{
              marginLeft: "10px",
              padding: "20px",
              width: "fit-content",
              border: "1px solid #fcfcfc",
              backgroundColor: (theme) =>
                lighten(theme.palette.primary.main, 0.5),
              borderRadius: "20px",
            }}
          >
            {children}
          </Box>
        </>
      ) : (
        <span style={{ fontSize: 5, color: "#9e9e9e" }}>{title}</span>
      )}
    </motion.div>
    {!last && (
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate="show"
        variants={timelineAnimateVariants}
        custom={custom * (children ? 1 : 0.25)}
        style={{
          borderLeft: "solid 1px #bdbdbd",
          minHeight: "24px",
        }}
      />
    )}
  </>
);

export default TimelineItem;
