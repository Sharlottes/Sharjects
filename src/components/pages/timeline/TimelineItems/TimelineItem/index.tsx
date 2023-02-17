import { motion } from "framer-motion";
import { Header, DummyHeader, TimeConnecter, TimeContent } from "./styled";

export interface TimelineItemProps extends React.PropsWithChildren {
  title: string;
}
const TimelineItem: React.FC<TimelineItemProps> = ({ title, children }) => (
  <div
    style={{
      display: "flex",
    }}
  >
    <TimeConnecter
      hascontent={children ? "true" : ""}
      initial={{ borderLeftColor: "rgba(74.1, 74.1, 74.1, 0)" }}
      whileInView={{ borderLeftColor: "rgba(74.1, 74.1, 74.1, 0.3)" }}
      viewport={{ once: true }}
      transition={{ duration: 0.1 }}
    />
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
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
  </div>
);

export default TimelineItem;
