import Avatar from "@mui/material/Avatar";
import { motion } from "framer-motion";
import Divider from "@mui/material/Divider";

const MainTitleAvatar: React.FC = () => (
  <Divider
    component={motion.div}
    animate={{ opacity: 1 }}
    initial={{ opacity: 0 }}
    transition={{
      delay: 1,
      duration: 0.25,
    }}
  >
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
      <Avatar
        src="/images/profile/Sharlottes.png"
        sx={{
          width: "60px",
          height: "60px",
        }}
      />
    </motion.div>
  </Divider>
);

export default MainTitleAvatar;
