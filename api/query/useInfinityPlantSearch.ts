import {QueryFunction, useInfiniteQuery, UseInfiniteQueryOptions,} from 'react-query'
import { ISearchPlantQuery, ISearchPlantQueryVariables } from "@api/generated/graphql"
import { selectPlants } from '../selectors';
import { sdk } from '..';

type InfinitePlantList = Pick<ISearchPlantQueryVariables, 'term' | 'limit'>
type QueryKey = ['searchPlants', InfinitePlantList]
type Options = Pick<UseInfiniteQueryOptions,
  'enabled' | 'staleTime' | 'refetchOnWindowFocus' | 'refetchOnMount'>

const fetchPlants: QueryFunction<ISearchPlantQuery, QueryKey> = ({queryKey, pageParam = 0}) => {
  const [_key, { term, limit }] = queryKey
  return sdk.searchPlant({term, limit, skip: pageParam})
}

export const useInfinitePlantSearch = (args: InfinitePlantList, options?: Options) => {
  return useInfiniteQuery(['searchPlants', args], fetchPlants, {
    ...options,
    select: (data) => ({
      ...data,
      pages: data.pages.map(page => selectPlants(page.plantCollection))
    }),
    getNextPageParam: (lastPage) => {
      const lastPageData = lastPage.plantCollection
      if(lastPageData == null) {
        return undefined
      }
      const nextPage = lastPageData.skip + lastPageData.limit
      return nextPage >= lastPageData.total ? undefined : nextPage
    }
  })
}