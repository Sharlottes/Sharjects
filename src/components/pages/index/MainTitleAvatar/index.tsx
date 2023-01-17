import Avatar from "@mui/material/Avatar";
import { MainTitleAvatarContainer } from "./styled";

const MainTitleAvatar: React.FC = () => (
  <MainTitleAvatarContainer
    animate={{ opacity: 1, y: 0, scale: 1 }}
    initial={{ opacity: 0, y: -20, scale: 0 }}
    transition={{
      type: "spring",
      delay: 1,
      duration: 0.5,
    }}
  >
    <Avatar src="/images/profile/Sharlottes.png" />
  </MainTitleAvatarContainer>
);

export default MainTitleAvatar;
