import { useEffect, useState } from "react";
import { IGetPlantListByAuthorQueryVariables } from "@api/generated/graphql";
import { QueryStatus } from '@api/index';
import { getPlantListByAuthor } from '../api/index';

interface PlantListByAuthor extends IGetPlantListByAuthorQueryVariables { }

export const usePlantListByAuthor = (args: PlantListByAuthor) => {
    const [plantList, setPlantList] = useState<Plant[]>([])
    const [status, setStatus] = useState<QueryStatus>('idle')
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        setStatus('loading')
        getPlantListByAuthor(args)
            .then(resp => {
                setPlantList(resp)
                setStatus('success')
            })
            .catch(error => {
                setError(error)
                setStatus('error')
            })

    }, [])

    return {
        plantList,
        status,
        error
    }
}