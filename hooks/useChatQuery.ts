import qs from 'query-string'
import { useInfiniteQuery } from '@tanstack/react-query'

const useChatQuery = ({ key, value, socketKey }: { key: string; value: string; socketKey: string }) => {
  const fetchMessages = async ({ pageParam = undefined }) => {
    const baseUrlMap = new Map([
      ['channelId', '/api/messages'],
      ['conversationId', '/api/directmessages'],
    ])
    const baseUrl = baseUrlMap.get(key)
    if (!baseUrl) return null
    const url = qs.stringifyUrl(
      {
        url: baseUrl,
        query: {
          cursor: pageParam,
          [key]: value,
        },
      },
      { skipNull: true },
    )

    const res = await fetch(url)
    return res.json()
  }

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery({
    queryKey: [socketKey],
    initialPageParam: undefined,
    queryFn: fetchMessages,
    getNextPageParam: (lastPage) => lastPage?.nextCursor,
    refetchInterval: false,
  })

  return { data, fetchNextPage, hasNextPage, isFetchingNextPage, status }
}

export default useChatQuery
