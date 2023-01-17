import Avatar from "@mui/material/Avatar";
import { motion } from "framer-motion";

const MainTitleAvatar: React.FC = () => (
  <motion.div
    style={{
      width: "fit-content",
      height: "fit-content",
    }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    initial={{ opacity: 0, y: -20, scale: 0 }}
    transition={{
      type: "spring",
      delay: 1,
      duration: 0.5,
    }}
  >
    <Avatar src="/images/profile/Sharlottes.png" />
  </motion.div>
);

export default MainTitleAvatar;
