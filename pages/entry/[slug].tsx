import React from 'react'
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { getPlant, getPlantList, getCategoryList } from '../../api/index';
import { RichText } from '@components/RichText';
import { Layout } from '@components/Layout';
import { SidebarAuthor } from '@components/SidebarAuthor';
import { SidebarPosts } from '@components/SidebarPosts';
import { SidebarCategories } from '@components/SidebarCategories';

interface PlantEntryProps {
    plant: Plant;
    posts: Plant[];
    categories: Category[]
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
        const categories = await getCategoryList()

        return {
            props: {
                plant,
                posts,
                categories
            },
            revalidate: 5 * 60 // refresh 5 min
        }
    } catch (error) {
        return {
            notFound: true
        }
    }
}

const PlantEntryPage = ({ plant, posts, categories }: InferGetStaticPropsType<typeof getStaticProps>) => {
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
                        <SidebarAuthor author={plant.author} />
                    </article>
                    <aside className="post-aside">
                        <SidebarPosts posts={posts} />
                        <SidebarCategories categories={categories} />
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
                .post-aside {
                    width: 100%;
                }
                .post-aside h3 {
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