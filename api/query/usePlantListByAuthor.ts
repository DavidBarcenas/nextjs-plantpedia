import { IGetPlantListByAuthorQuery, IGetPlantListByAuthorQueryVariables } from "@api/generated/graphql";
import { QueryFunction, useQuery, UseQueryOptions } from 'react-query';
import { selectPlants } from '../selectors';
import { sdk } from "..";

type QueryKey = ['plantListByAuthor', IGetPlantListByAuthorQueryVariables]
type Options = Pick<
  UseQueryOptions, 
  'enabled' | 'staleTime' | 'refetchOnWindowFocus' | 'refetchOnMount'>

const fetchPlantsByAuthor: QueryFunction<IGetPlantListByAuthorQuery, QueryKey> = ({queryKey}) => {
  const [_key, args] = queryKey
  return sdk.getPlantListByAuthor(args)
}

export const usePlantListByAuthor = (
  args: IGetPlantListByAuthorQueryVariables, 
  options?: Options
) => {
  return useQuery(['plantListByAuthor', args], fetchPlantsByAuthor, {
    ...options,
    select: data => selectPlants(data.plantCollection)
  })
}