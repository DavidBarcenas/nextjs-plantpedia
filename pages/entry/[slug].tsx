import React from 'react'
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { getPlant, getPlantList } from '../../api/index';
import { RichText } from '@components/RichText';
import { Layout } from '@components/Layout';
import { SidebarAuthor } from '@components/SidebarAuthor';
import { SidebarPosts } from '@components/SidebarPosts';
import { SidebarCategories } from '@components/SidebarCategories';

interface PlantEntryProps {
    plant: Plant;
    posts: Plant[]
}

interface PathType {
    params: {
        slug: string;
    }
}

export const getStaticPaths = async () => {
    const entries = await getPlantList({ limit: 10 })
    const paths: PathType[] = entries.map(plant => ({
        params: {
            slug: plant.slug
        }
    }))

    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps<PlantEntryProps> = async ({ params }) => {
    const slug = params.slug

    if (typeof slug !== 'string') {
        return {
            notFound: true
        }
    }

    try {
        const plant = await getPlant(slug)
        const posts = await getPlantList({ limit: 5, skip: 10 })

        return {
            props: {
                plant,
                posts
            },
            revalidate: 5 * 60 // refresh 5 min
        }
    } catch (error) {
        return {
            notFound: true
        }
    }
}

const PlantEntryPage = ({ plant, posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <>
            <Layout>
                <div className="wrapper post-container">
                    <article className="post">
                        <img src={plant.image.url} alt={plant.image.title} />
                        <div className="post-description">
                            <h2 className="post-title">{plant.plantName}</h2>
                            <RichText description={plant.description} />
                        </div>
                        <footer className="post-footer">
                            <img src={plant.author.photo.url} alt={plant.author.photo.title} />
                            <div>
                                <h3>{plant.author.fullName}</h3>
                                <p className="post-author-bio">{plant.author.biography}</p>
                                <div className="flex">
                                    <a
                                        href={plant.author.linkedIn}
                                        title={`Follow ${plant.author.fullName} on LinkedIn`}
                                        target="_blank"
                                    >
                                        LI
                                    </a>
                                    <a
                                        href={plant.author.twitter}
                                        title={`Follow ${plant.author.fullName} on Twitter`}
                                        target="_blank"
                                    >
                                        TW
                                    </a>
                                </div>
                            </div>
                        </footer>
                    </article>
                    <aside className="post-aside">
                        <SidebarPosts posts={posts} />
                        <SidebarCategories />
                        <SidebarAuthor author={plant.author} />
                    </aside>
                </div>
            </Layout>

            <style jsx>{`
                .post-container {
                    display: flex;
                    flex-wrap: wrap;
                }
                .post-title {
                    font-size: 1.5rem;
                    margin: 1rem 0;
                }
                .post-aside h3 {
                    margin: 0;
                }
                .post-footer {
                    /* border: 1px solid #ccc; */
                    padding: 1rem;
                    margin-bottom: 1rem;
                    text-align: center;
                }
                .post-footer img {
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    margin: 0 auto .75rem;
                }
                .post-footer h3 {
                    display: block;
                    margin: 0;
                }

                @media screen and (min-width: 688px) {
                    .post-title {
                        font-size: 2.5rem;
                        margin: 2rem 0;
                    }
                    .post-description {
                        width: 90%;
                        margin: auto;
                        margin-bottom: 2.5rem;
                    }
                    .post-footer {
                        display: flex;
                        align-items: center;
                        text-align: left;
                    }
                    .post-footer img {
                        width: 150px;
                        height: 150px;
                        border-radius: 50%;
                        margin: 0;
                        margin-right: 1.5rem;
                    }
                    .post-author-bio {
                        margin: .4rem 0;
                    }
                }
                
                @media screen and (min-width: 980px) {
                    .post {
                        width: 70%;
                        padding-right: 1.5rem;
                    }
                    .post-aside {
                        width: 30%;
                        padding: 0 1rem;
                    }
                }
            `}</style>
        </>
    )
}

export default PlantEntryPage