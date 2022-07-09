import { Stack, Divider } from "@mui/material";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "react-query";
import { DiriAPI, DiriAPIBotlist } from "../@type";
import BotInfo from "./components/BotInfo";
import ListLayout from "./components/ListLayout";

export default function SearchBotList(props: {query: string}) {
  const [query, setQuery] = useState(props.query);

  const { data, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery<DiriAPI<DiriAPIBotlist>, unknown, DiriAPI<DiriAPIBotlist>, string>({
    queryKey: "infiniteCharacters",
    queryFn: async ({ pageParam = 1, meta }) => {
      const result = await fetch(`/api/v2/search/bots?query=${query}&page=${pageParam}`);

      console.log(result);
      console.log(meta);

      return result.json();
    },
    getNextPageParam: (lastPage: any, pages: string | any[]) => {
      if(pages.length < lastPage.data?.totalPage ?? 0) return pages.length + 1;
    },
    meta: {
      query: query
    }
  });

  const handleSearch = (query: string) => {
    setQuery(query);
    console.log(query);
    setTimeout(()=>refetch(), 1000);
  }

  return (
    <ListLayout index={2} onSearch={handleSearch}>
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