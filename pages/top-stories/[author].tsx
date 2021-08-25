import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { Typography } from '@material-ui/core';

import { getAuthorList } from '@api/index';

import ErrorPage from '../_error'
import { Layout } from '@components/Layout';
import { AutorTopStories } from '@components/Author/AutorTopStories';
import { VerticalTabs } from '@components/Tabs';
import { TabItem } from 'types/tabsTypes';

type TopStoriesProps = {
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
  status
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()
  const currentAuthor = router.query.author

  if (typeof currentAuthor !== 'string' ||
    authors.length === 0 ||
    status === 'error') {
    return (
      <ErrorPage
        message="There is no information available. 
        Did you forget to set up your Contenful space's content?"
      />
    )
  }

  const tabs: TabItem[] = authors.map(author => ({
    content: <AutorTopStories author={author} />,
    label: author.fullName,
    value: author.handle
  }))

  return (
    <Layout>
      <section className="wrapper">
        <Typography
          variant='h1'
          component='h1'
          style={{
            textAlign: 'center',
            marginBottom: '2rem'
          }}>Top 10 Stories</Typography>
        <VerticalTabs
          tabs={tabs}
          currentTab={currentAuthor}
          onTabChange={(_, newValue) => {
            router.push(`/top-stories/${newValue}`,
              undefined,
              { shallow: true })
          }}
        />
      </section>
    </Layout>
  )
}

export default TopStories