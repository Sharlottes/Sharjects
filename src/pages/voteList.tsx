import { Stack, Divider } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "react-query";
import BotInfo from "./components/BotInfo";
import ListLayout from "./components/ListLayout";
import { DiriAPI, DiriAPIBotlist } from "../@type";

export default function VoteBotList() {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery<DiriAPI<DiriAPIBotlist>, unknown, DiriAPI<DiriAPIBotlist>, string>({
    queryKey: "infiniteCharacters",
    queryFn: async ({ pageParam = 1, meta }) => {
      const result = await fetch(`/api/v2/list/bots/votes?page=${pageParam}`);
      return result.json();
    },
    getNextPageParam: (lastPage, pages) => {
      if(pages.length < lastPage.data?.totalPage ?? 0) return pages.length + 1;
    }
  });

  return (
    <ListLayout index={0}>
      <InfiniteScroll
        dataLength={(data?.pages.length ?? 0) * 20}
        next={fetchNextPage}
        hasMore={hasNextPage ?? false}
        loader={<h4>Loading...</h4>}
      >
        <Stack 
          direction='column' 
          spacing={2} 
          justifyContent="flex-start" 
          alignItems="stretch" 
          divider={<Divider flexItem />}
          m='20px'
          mt='80px'
        >
        {data?.pages.map((data) => data.data?.data.map(bot => (<BotInfo bot={bot}/>)))}
        </Stack>
      </InfiniteScroll>
    </ListLayout>
  )
}