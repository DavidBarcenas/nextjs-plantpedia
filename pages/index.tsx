import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { getPlantList } from '@api'
import { AuthorCollection } from '@components/Author/AuthorCollection'
import { PlantCollection } from '@components/Plant/PlantCollection'
import { Layout } from '@components/Layout'
import { Hero } from '@components/Hero'

type Props = {
  plants: Plant[];
}

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
  const plants = await getPlantList({ limit: 10, locale })
  const i18nConf = await serverSideTranslations(locale)

  return {
    props: {
      plants,
      ...i18nConf
    },
    revalidate: 5 * 60 // refresh 5 min
  }
}
export default function Home({ plants }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <Hero {...plants[0]} />
      <AuthorCollection />
      <PlantCollection plants={plants.slice(1, 3)} variant={'vertical'} />
      <div className="bg-gray">
        <PlantCollection plants={plants.slice(3, 9)} />
      </div>
    </Layout>
  )
}
