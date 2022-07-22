export default function BotListPage() {
  return <></>
}
  /*
const [query, setQuery] = useState('')
const [tap, setTap] = useState(0)
const { data, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery<DiriAPI<DiriAPIBotlist>, unknown, DiriAPI<DiriAPIBotlist>, string>({
queryKey: 'infiniteCharacters',
queryFn: async ({ pageParam = 1 }) => {
  const result = await fetch(
    tap === 0
      ? `/api/v2/list/bots/votes?page=${pageParam}`
      : tap === 1
        ? `/api/v2/list/bots/new`
        : tap === 2 
          ? `/api/v2/search/bots?query=${query}&page=${pageParam}`
          : `error`
  )
  console.log(result)

  return result.json()
},
getNextPageParam: (lastPage: any, pages: string | Array<any>) => {
  if (tap !== 1 && pages.length < (lastPage.data?.totalPage ?? 0)) return pages.length + 1
}
})

const handleSearch = (query: string) => {
setQuery(query)
setTimeout(() => refetch(), 100)
}

const handleTapChanged = (value: any) => {
setTap(value)
setTimeout(() => refetch(), 100)
}

return (
<ListLayout onSearch={handleSearch} onTapChanged={handleTapChanged}>
  <InfiniteScroll
    dataLength={(data?.pages.length ?? 0) * 20}
    next={fetchNextPage}
    hasMore={hasNextPage ?? false}
    loader={<h4>Loading...</h4>}
  >
    <Stack 
      direction='column' 
      spacing={2} 
      justifyContent='flex-start' 
      alignItems='stretch' 
      divider={<Divider flexItem />}
      m='20px' mt='80px'
    >
      {data?.pages.map((data) => data.data?.data.map(bot => (<BotInfo bot={bot}/>)))}
    </Stack>
  </InfiniteScroll>
</ListLayout>
)
*/