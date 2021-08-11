import Link from 'next/link'
import { Typography } from '@material-ui/core'

interface PlantCollectionProps {
    plants: Plant[]
}

export const PlantCollection = ({plants}: PlantCollectionProps) => {
    return (
        <div>
            {
                plants.map(plant => (
                    <PlantItem key={plant.id} {...plant} />
                ))
            }
        </div>
    )
}


const PlantItem = ({slug, plantName, image}) => {
    return (
        <Link href={`/entry/${slug}`}>
            <a title={`Go to ${plantName}`}>
                <div>
                    <img src={image.url} width={460} />
                    <div className="p-4">
                        <Typography variant="h4">
                            {plantName}
                        </Typography>
                    </div>
                </div>
            </a>
        </Link>
    )
}