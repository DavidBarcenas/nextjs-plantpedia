import { useState } from 'react';
import Alert from '@material-ui/lab/Alert'
import { Layout } from '@components/Layout';
import { AutorTopStories } from '@components/AutorTopStories';

interface TopStoriesProps {
    authors: Author[];
    currentAuthor: Author;
    status: 'error' | 'succes';
}

interface TabItem {
    label: string;
    value: string;
    content: React.ReactNode;
}

const TopStories = ({ authors, currentAuthor, status }: TopStoriesProps) => {
    const [currentTab, setCurrentTab] = useState(currentAuthor)

    if (authors.length === 0 || status === 'error') {
        return (
            <Layout>
                <main>
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
        <Layout>
            <main>
                <h2>Top 10 Stories</h2>
                {/* <VerticalTabs /> */}
            </main>
        </Layout>
    )
}

export default TopStories