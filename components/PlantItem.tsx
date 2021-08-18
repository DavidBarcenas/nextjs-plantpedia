import Link from 'next/link'
import { Excerpt } from '@components/Excerpt';
import Button from '@material-ui/core/Button'

interface PlantItemProps {
    plant: Plant;
    showDesc: Boolean;
}

export const PlantItem = ({ plant, showDesc }: PlantItemProps) => {
    const { slug, plantName, image, category, description } = plant

    return (
        <>
            <article className="plant-item">
                <Link href={`/entry/${slug}`}>
                    <a title={`Go to ${plantName}`}>
                        <div className="plant-picture">
                            <img src={image.url} />
                            <p className="category">{category.title}</p>
                        </div>
                        <h4 className="plant-title">{plantName}</h4>
                    </a>
                </Link>
                {
                    showDesc && (
                        <>
                            <Excerpt richText={description} className="excerpt" />
                            <Link href={`/entry/${slug}`} passHref>
                                <Button>Read more</Button>
                            </Link>
                        </>
                    )
                }
            </article>

            <style jsx>{`
                .plant-item {
                    margin-bottom: 1rem;
                }
                .plant-picture {
                    position: relative;
                    margin-bottom: .75rem;
                }
                .plant-title {
                    font-size: 2rem;
                    margin: 0;
                }
                .plant-title:hover {
                    text-decoration: underline;
                }
                .category {
                    position: absolute;
                    top: .5rem;
                    right: 1rem;
                }
            `}</style>
        </>
    )
}