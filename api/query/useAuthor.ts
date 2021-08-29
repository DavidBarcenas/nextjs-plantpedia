import { IGetAuthorListQuery, IGetAuthorListQueryVariables } from "@api/generated/graphql"
import { useQuery, UseQueryOptions, QueryFunction } from 'react-query';
import { selectAuthors } from '../selectors';
import { sdk } from "..";

type QueryKey = ['authors', IGetAuthorListQueryVariables]
type Options = Pick<
  UseQueryOptions, 
  'enabled' | 'staleTime' | 'refetchOnWindowFocus' | 'refetchOnMount'>

const fetchAuthorList: QueryFunction<IGetAuthorListQuery, QueryKey> = ({queryKey}) => {
  const [_key, args] = queryKey
  return sdk.getAuthorList(args)
}

export const useAuthors = (args: IGetAuthorListQueryVariables, options?: Options) => {
  return useQuery(['authors', args], fetchAuthorList, {
    ...options,
    select: data => selectAuthors(data.authorCollection)
  })
}