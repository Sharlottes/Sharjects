import styled from "@mui/system/styled";
import { motion } from "framer-motion";

export const ChatBubbleWrapper = styled("div")<{ isOwners: boolean }>(
  ({ isOwners }) => ({
    display: "flex",
    width: "100%",
    height: "fit-content",
    justifyContent: isOwners ? "right" : "left",
  })
);
export const ChatBubbleContainer = styled(motion.div)(({ theme }) => ({
  height: "fit-content",
  width: "fit-content",
  padding: "5px 10px",
  borderRadius: "10px",
  backgroundColor: theme.palette.primary.main,
}));

export const ChatBubbleTimestamp = styled("div")({
  color: "lightgray",
  fontSize: "0.25",
});
