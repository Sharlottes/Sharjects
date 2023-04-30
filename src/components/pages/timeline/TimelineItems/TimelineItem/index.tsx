import { motion } from "framer-motion";
import S from "./styled";

export interface TimelineItemProps extends React.PropsWithChildren {
  title: string;
}
const TimelineItem: React.FC<TimelineItemProps> = ({ title, children }) => (
  <div
    style={{
      display: "flex",
    }}
  >
    <S.TimeConnecter
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
          <S.Header className="has-content">{title}</S.Header>
          <S.TimeContent>{children}</S.TimeContent>
        </>
      ) : (
        <S.DummyHeader>{title}</S.DummyHeader>
      )}
    </motion.div>
  </div>
);

export default TimelineItem;
