import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { getPlantList } from '@api'
import { Layout } from '@components/Layout'
import { Authors } from '@components/Authors'
import { PlantCollection } from '@components/PlantCollection'
import { Hero } from '@components/Hero'

interface HomeProps {
  plants: Plant[]
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const plants = await getPlantList({ limit: 10 })

  return {
    props: {
      plants
    },
    revalidate: 5 * 60 // refresh 5 min
  }
}
export default function Home({ plants }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <Hero {...plants[0]} />
      <Authors />
      <PlantCollection plants={plants} />
    </Layout>
  )
}
