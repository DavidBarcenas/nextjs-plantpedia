import { useState } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Alert from '@material-ui/lab/Alert'
import { Layout } from '@components/Layout';
import { AutorTopStories } from '@components/AutorTopStories';
import { TabItem, VerticalTabs } from '@components/Tabs';
import { getAuthorList } from '@api/index';

interface TopStoriesProps {
    authors: Author[];
    currentAuthor: Author['handle'];
    status: 'error' | 'success';
}

export const getServerSideProps: GetServerSideProps<TopStoriesProps> = async ({ params }) => {
    const authorHandle = String(params?.author)

    try {
        const authors = await getAuthorList({ limit: 10 })
        const doesAuthorExist = authors.some(
            (author) => author.handle === authorHandle
        )

        // Validates that the author exists and redirects to the first one in the list otherwise.
        if (authors.length > 0 && !doesAuthorExist) {
            const firstAuthor = authors[0].handle

            return {
                redirect: {
                    destination: `/top-stories/${firstAuthor}`,
                    permanent: false,
                },
            }
        }

        return {
            props: {
                authors,
                currentAuthor: authorHandle,
                status: 'success',
            },
        }
    } catch (error) {
        return {
            props: {
                authors: [],
                currentAuthor: authorHandle,
                status: 'error',
            },
        }
    }
}

const TopStories = ({
    authors,
    currentAuthor,
    status
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const [currentTab, setCurrentTab] = useState(currentAuthor)

    if (authors.length === 0 || status === 'error') {
        return (
            <Layout>
                <main className="wrapper">
                    <div>
                        <h2>Huh, something is not right 🙇‍♀️</h2>
                    </div>
                    <article>
                        <Alert severity="error">
                            {status === 'error'
                                ? 'There was an error querying the information. Inspecting the request in the Network tab of DevTools could give more information'
                                : 'The information was not found. Forgot to configure content on Contentful?'
                            }
                        </Alert>
                    </article>
                </main>
            </Layout>
        )
    }

    const tabs: TabItem[] = authors.map(author => ({
        content: <AutorTopStories author={author} />,
        label: author.fullName,
        value: author.handle
    }))

    return (
        <>
            <Layout>
                <main className="wrapper">
                    <h2 className="stories-title">Top 10 Stories</h2>
                    <VerticalTabs
                        tabs={tabs}
                        currentTab={currentTab}
                        onTabChange={(_, newValue) => setCurrentTab(newValue)}
                    />
                </main>
            </Layout>

            <style jsx>{`
                .stories-title {
                    margin: 0;
                    margin-bottom: 2rem;
                    text-align: center;
                }

                @media screen and (min-width: 960px) {
                    .stories-title {
                        font-size: 4rem;
                        margin-bottom: 4rem;
                    }
                }
            `}</style>
        </>
    )
}

export default TopStories