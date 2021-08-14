import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Error from 'next/error'
import { getPlant, QueryStatus } from '../../api/index';
import { BLOCKS, Document } from '@contentful/rich-text-types'
import { documentToReactComponents, Options, } from '@contentful/rich-text-react-renderer'

const options: Options = {
    renderNode: {
        [BLOCKS.PARAGRAPH]: (_, children) => (
            <p>{children}</p>
        )
    }
}


const PlantEntryPage = () => {
    const [status, setStatus] = useState<QueryStatus>('idle')
    const [plant, setPlant] = useState<Plant | null>(null)
    const router = useRouter()
    const slug = router.query.slug

    useEffect(() => {
        if(typeof slug !== 'string') {
            return
        }

        setStatus('loading')

        getPlant(slug)
            .then(resp => {
                setPlant(resp)
                setStatus('success')
            })
            .catch(() => setStatus('error'))
    }, [slug])

    
    

    if(status === 'loading' || status === 'idle') {
       return (
        <div>
            loading...
        </div>
       )
    }

    if(!plant || status === 'error') {
        return <Error statusCode={404} />
    }

    const document: Document = plant.description

    return (
        <div>
            <img src={plant.image.url} alt={plant.image.title} />
            <h1>{plant.plantName}</h1>
            {documentToReactComponents(document, options)}
            <section>
                <h3>Recent Post</h3>
            </section>
            <section>
                <h3>Categories</h3>
            </section>
            <section>
                <img src={plant.author.photo.url} alt={plant.author.photo.title} />
                <h3>{plant.author.fullName}</h3>
                <p>{plant.author.biography}</p>
                <div className="flex">
                <a
                    href={plant.author.linkedIn}
                    title={`Follow ${plant.author.fullName} on LinkedIn`}
                    target="_blank"
                    className="pr-4"
                >
                    LI
                </a>
                <a
                    href={plant.author.twitter}
                    title={`Follow ${plant.author.fullName} on Twitter`}
                    target="_blank"
                    className="pr-4"
                >
                    TW
                </a>
                </div>
            </section>
        </div>
    )
}

export default PlantEntryPage