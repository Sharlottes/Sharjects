import React from "react";
import SendIcon from "@mui/icons-material/Send";
import ChatBubble from "src/components/pages/test/chat/ChatBubble";
import { ChatBox, ChatListContainer, StyledTextField } from "./styled";

interface ChatContext {
  chatList: ChatData[];
  setChatList: (value: ChatData[]) => void;
  sendChat: (content: string) => void;
}
const ChatContext = React.createContext<ChatContext>({
  chatList: [],
  setChatList: () => {},
  sendChat: () => {},
});
const Chat: React.FC<React.PropsWithChildren> & {
  ChatList: React.FC;
  ChatInput: React.FC;
} = ({ children }) => {
  const [chatList, setChatList] = React.useState<ChatData[]>([]);
  const sendChat = (content: string) => {
    setChatList((prev) => [
      ...prev,
      { content, sendAt: Date.now(), sender: "test" },
    ]);
  };

  return (
    <ChatBox>
      <ChatContext.Provider value={{ chatList, setChatList, sendChat }}>
        {children}
      </ChatContext.Provider>
    </ChatBox>
  );
};
const useChat = () => React.useContext<ChatContext>(ChatContext);
Chat.ChatList = () => {
  const { chatList } = useChat();

  return (
    <ChatListContainer>
      {chatList.map((chat) => (
        <ChatBubble {...chat} key={chat.sendAt} />
      ))}
    </ChatListContainer>
  );
};
Chat.ChatInput = () => {
  const { sendChat } = useChat();
  const [content, setContent] = React.useState("");

  return (
    <StyledTextField
      value={content}
      onChange={(e) => setContent(e.target.value)}
      placeholder="chat here..."
      InputProps={{
        endAdornment: (
          <SendIcon
            onClick={() => sendChat(content)}
            sx={{
              transition: "fill 250ms",
              fill: "lightgray",
              "&:hover": { fill: (theme) => theme.palette.primary.main },
            }}
          />
        ),
      }}
    />
  );
};

export default Chat;
