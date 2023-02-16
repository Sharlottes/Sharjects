import { motion } from "framer-motion";
import { Header, DummyHeader, TimeConnecter, TimeContent } from "./style";

export interface TimelineItemProps extends React.PropsWithChildren {
  title: string;
  last?: boolean;
}
const TimelineItem: React.FC<TimelineItemProps> = ({
  title,
  children,
  last = false,
}) => (
  <>
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
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
        initial={{ borderLeftColor: "rgba(74.1, 74.1, 74.1, 0)" }}
        whileInView={{ borderLeftColor: "rgba(74.1, 74.1, 74.1, 0.3)" }}
        transition={{ duration: 0.1 }}
      />
    )}
  </>
);

export default TimelineItem;
