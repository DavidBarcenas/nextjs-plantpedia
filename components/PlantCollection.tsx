import { PlantItem } from './PlantItem'

interface PlantCollectionProps {
    plants: Plant[];
    variant?: 'horizontal' | 'vertical';
}

export const PlantCollection = ({ plants, variant = 'horizontal' }: PlantCollectionProps) => {
    return (
        <>
            {
                variant == 'horizontal' ?
                    (
                        <div className="wrapper plant-collection">
                            {plants.map(plant => (
                                <PlantItem
                                    key={plant.id}
                                    plant={plant}
                                    showDesc={false}
                                />
                            ))}
                        </div>
                    ) :
                    (
                        <div className="wrapper plant-collection vertical">
                            {plants.map(plant => (
                                <PlantItem
                                    key={plant.id}
                                    plant={plant}
                                    showDesc={true}
                                    aspecRatio='3:2'
                                />
                            ))}
                        </div>
                    )
            }

            <style jsx>{`
                .plant-collection {
                    display: grid;
                    grid-template-columns: 1fr;
                    grid-gap: .5rem;
                }
                @media screen and (min-width: 480px) {
                    .plant-collection {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }
                @media screen and (min-width: 960px) {
                    .plant-collection {
                        grid-template-columns: repeat(3, 1fr);
                        grid-gap: 2rem;
                    }

                    .plant-collection.vertical {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }
            `}</style>
        </>
    )
}