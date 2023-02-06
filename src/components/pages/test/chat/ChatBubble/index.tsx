import { Variants, useAnimationControls } from "framer-motion";
import {
  ChatBubbleTimestamp,
  ChatBubbleWrapper,
  ChatBubbleContainer,
} from "./styled";
import React from "react";

const bubbleVariants: Variants = {
  fadeUp: {
    opacity: 1,
    transition: {
      duration: 0.1,
    },
  },
  positionUp: {
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
  sizeUp: {
    scaleY: [1, 2, 1],
    transition: {
      duration: 0.5,
    },
  },
  sizeBack: {
    scaleY: "1",
    transition: {
      delay: 0.25,
      duration: 0.5,
    },
  },
};

export interface ChatBubbleProps extends ChatData {}
const ChatBubble: React.FC<ChatBubbleProps> = ({ sender, content, sendAt }) => {
  const [mode, setMode] = React.useState(0);
  React.useEffect(() => {
    setTimeout(() => setMode);
  }, []);

  return (
    <ChatBubbleWrapper isOwners>
      <ChatBubbleTimestamp>{}</ChatBubbleTimestamp>
      <ChatBubbleContainer>{content}</ChatBubbleContainer>
    </ChatBubbleWrapper>
  );
};
export default ChatBubble;
