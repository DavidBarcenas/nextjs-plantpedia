import Link from 'next/link'
import { Typography } from '@material-ui/core'

export const Hero = (plant: Plant) => {
    return (
        <>
            <div className="wrapper hero-container">
                <div className="hero-wrapper">
                    <img src={plant.image.url} alt={plant.plantName} className="hero-img" />
                    <div className="hero-wrap-text">
                        <p className="category">{plant.category.title}</p>
                        <Link href={`/entry/${plant.slug}`}>
                            <a title={`Go to ${plant.plantName}`}>
                                <Typography
                                    variant="h1"
                                    component="h2"
                                    className='hero-text'>
                                    {plant.plantName}
                                </Typography>
                            </a>
                        </Link>
                        <p className="hero-author">- {plant.author.fullName}</p>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .hero-wrapper {
                    position: relative;
                    max-width: 600px;
                    margin: auto;
                }
                .hero-img {
                    width: 100%;
                    margin-left: auto;
                }
                .hero-wrap-text {
                    background: rgba(255, 255, 255, .75);
                    position: absolute;
                    bottom: 1rem;
                    left: 50%;
                    width: 90%; 
                    min-height: 50%;
                    padding: 0 1rem;
                    transform: translateX(-50%);
                }
                .hero-author {
                    font-size: 1rem;
                    margin: 0.5rem 0;
                }
                
                @media screen and (min-width: 480px) {
                    .hero-img {
                        max-width: 400px;
                    }
                    .hero-wrap-text {
                        background: transparent;
                        bottom: 50%;
                        left: 0;
                        max-width: 300px;
                        transform: translateX(0) translateY(50%);
                    }
                }

                @media screen and (min-width: 960px) {
                    .hero-img {
                        max-width: 600px;
                    }
                    .hero-wrapper {
                        max-width: 800px;
                    }
                }
                
                @media screen and (min-width: 1200px) {
                    .hero-img {
                        max-width: 800px;
                    }
                    .hero-wrapper {
                        max-width: 1000px;
                    }
                    .hero-wrap-text {
                        max-width: 400px;
                    }
                    .hero-author {
                        font-size: 1.2rem;
                    }
                }
            `}</style>
        </>
    )
}
