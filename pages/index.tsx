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
  const plants = await getPlantList({limit: 10})

  return {
    props: {
      plants
    }
  }
}
export default function Home({plants}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <Hero {...plants[0]} />
      <Authors />
      <div>
        {
          plants.slice(2,4).map(plant => (
            <div>
              <p>{plant.description.toString()}</p>
            </div>
          ))
        }
      </div>
      <PlantCollection plants={plants.slice(2)}/>
    </Layout>
  )
}
