import { useEffect, useState } from 'react'
import { getPlantList } from '@api'
import { Layout } from '@components/Layout'
import { PlantCollection } from '@components/PlantCollection'

export default function Home() {
  const [data, setData] = useState<Plant[]>([])

  useEffect(() => {
    getPlantList({limit: 10})
      .then(resp => setData(resp))
  }, [])

  return (
    <Layout>
      <PlantCollection plants={data}/>
    </Layout>
  )
}
