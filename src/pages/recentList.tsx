import { Stack, Divider } from "@mui/material";
import BotInfo from "./components/BotInfo";
import ListLayout from "./components/ListLayout";
import { Bot } from "koreanbots";
import { useEffect, useState } from "react";

export default function RecentBotList(props: any) {
  const [list, setList] = useState([] as Bot[]);
  
  useEffect(() => {
    fetch('/api/v2/list/bots/new').then(res => res.json().then(data => setList(data.data.data)));
  });

  return (
    <ListLayout index={1}>
      <Stack 
        direction='column' 
        spacing={2} 
        justifyContent="flex-start" 
        alignItems="stretch" 
        divider={<Divider flexItem />}
        m='20px'
        mt='80px'
      >
      {list.map(bot => (<BotInfo key={bot.id} bot={bot}/>))}
      </Stack>
    </ListLayout>
  )
}