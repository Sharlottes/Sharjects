import React from "react";
import styled from "@emotion/styled";
import Chat from "src/components/pages/test/chat/Chat";

const ChatPageContainer = styled("div")({
  height: "100vh",
  display: "grid",
  placeItems: "center",
});

const ChatPage: React.FC = () => (
  <ChatPageContainer>
    <Chat>
      <Chat.ChatList />
      <Chat.ChatInput />
    </Chat>
  </ChatPageContainer>
);

export default ChatPage;
