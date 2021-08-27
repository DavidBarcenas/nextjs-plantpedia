import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
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
}

export const getServerSideProps: GetServerSideProps<TopStoriesProps> = async ({ params, locale }) => {
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
        ...(await serverSideTranslations(locale!)),
      },
    }
  } catch (error) {
    return {
      notFound: true
    }
  }
}

const TopStories = ({ authors }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()
  const currentAuthor = router.query.author
  const { t } = useTranslation(['top-stories'])

  if (typeof currentAuthor !== 'string' || authors.length === 0) {
    return (
      <ErrorPage message={t('noInfoAvailable')} />
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
          }}
        >
          {t('top10Stories')}
        </Typography>
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