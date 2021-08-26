import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { getAuthorList, getPlantList } from '@api'
import { AuthorCollection } from '@components/Author/AuthorCollection'
import { PlantCollection } from '@components/Plant/PlantCollection'
import { Layout } from '@components/Layout'
import { Hero } from '@components/Hero'

interface HomeProps {
  plants: Plant[],
  authors: Author[];
}

export const getStaticProps: GetStaticProps<HomeProps> = async ({ locale }) => {
  const plants = await getPlantList({ limit: 10, locale })
  const authors = await getAuthorList({ limit: 6 })
  const i18nConf = await serverSideTranslations(locale)

  return {
    props: {
      plants,
      authors,
      ...i18nConf
    },
    revalidate: 5 * 60 // refresh 5 min
  }
}
export default function Home({ plants, authors }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <Hero {...plants[0]} />
      <AuthorCollection authors={authors} />
      <PlantCollection plants={plants.slice(1, 3)} variant={'vertical'} />
      <div className="bg-gray">
        <PlantCollection plants={plants.slice(3, 9)} />
      </div>
    </Layout>
  )
}
