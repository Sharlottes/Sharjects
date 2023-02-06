import { motion, type Variants } from "framer-motion";
import { Header, DummyHeader, TimeConnecter, TimeContent } from "./style";

const timelineAnimateVariants: Variants = {
  show: (i) => ({
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: i / 10,
    },
  }),
};

export interface TimelineItemProps extends React.PropsWithChildren {
  custom: number;
  title: string;
  last?: boolean;
}
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
          <Header className="has-content">{title}</Header>
          <TimeContent>{children}</TimeContent>
        </>
      ) : (
        <DummyHeader>{title}</DummyHeader>
      )}
    </motion.div>
    {!last && (
      <TimeConnecter
        initial={{
          opacity: 0,
        }}
        animate="show"
        variants={timelineAnimateVariants}
        custom={custom * (children ? 1 : 0.25)}
      />
    )}
  </>
);

export default TimelineItem;
