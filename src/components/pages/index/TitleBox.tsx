import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { motion, type HTMLMotionProps } from "framer-motion";

export interface TitleBoxProps {
  title: string;
  description?: string;
  delay?: number;
}
const TitleBox: React.FC<TitleBoxProps & HTMLMotionProps<"div">> = ({
  title,
  description = "",
  delay = 0,
  ...props
}) => (
  <motion.div
    style={{ padding: "10px", textAlign: "center" }}
    animate={{ x: 0, opacity: 1 }}
    whileInView={{ x: 0, opacity: 1 }}
    initial={{ x: -30, opacity: 0 }}
    transition={{ delay, duration: 1, type: "spring" }}
    {...props}
  >
    <Typography variant="h2" fontWeight="bold">
      {title}
    </Typography>
    <Typography variant="body2" m="0 1vw 0 5vw">
      {description}
    </Typography>
    <Divider
      component={motion.div}
      animate={{ opacity: 1 }}
      whileInView={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ delay: delay + 0.25, duration: 0.5 }}
    />
  </motion.div>
);

export default TitleBox;
