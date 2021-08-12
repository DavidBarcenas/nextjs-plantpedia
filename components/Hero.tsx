import Link from 'next/link'
import { Typography } from '@material-ui/core'

export const Hero = (plant: Plant) => {
    return (
        <>
            <div className="hero-container">
                <div className="hero-wrapper">
                    <img src={plant.image.url} alt={plant.plantName} className="hero-img" />
                    <div className="hero-wrap-text">
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
                    </div>
                </div>
            </div>

            <style jsx>{`
                .hero-container {
                    margin-bottom: 2rem;
                }
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
                    background: rgba(255, 255, 255, .85);
                    position: absolute;
                    top: 50%;
                    left: 0;
                    max-width: 300px;
                    transform: translateY(-50%);
                    padding: 1rem;
                }

                @media screen and (min-width: 480px) {
                    .hero-img {
                        max-width: 400px;
                    }
                }

                @media screen and (min-width: 960px) {
                    .hero-img {
                        max-width: 600px;
                    }

                    .hero-wrapper {
                        max-width: 800px;
                    }
                    
                    .hero-wrap-text {
                        max-width: 400px;
                    }
                }
            `}</style>
        </>
    )
}
