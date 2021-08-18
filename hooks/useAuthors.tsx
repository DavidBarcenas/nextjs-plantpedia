import { useEffect, useState } from "react"
import { QueryStatus, getAuthorList } from '../api/index';

export const useAuthors = () => {
    const [status, setStatus] = useState<QueryStatus>('idle')
    const [authors, setAuthors] = useState<Author[] | null>(null)

    useEffect(() => {
        setStatus('loading')
        getAuthorList({ limit: 6 })
            .then(resp => {
                setAuthors(resp)
                setStatus('success')
            })
            .catch(() => setStatus('error'))
    }, [])

    return { status, authors }
}