import { useEffect, useState } from 'react'
import { getPlantList } from '@api'
import { Layout } from '@components/Layout'

export default function Home() {
  const [data, setData] = useState<Plant[]>([])

  useEffect(() => {
    getPlantList({limit: 10})
      .then(resp => setData(resp))
  }, [])

  console.log(data)

  return (
    <Layout>
    {
      data.map(item => (
        <div>
          <h2>{item.plantName}</h2>
          <img src={item.image.url} alt={item.plantName} width={item.image.width} height={item.image.height} />
        </div>
      ))
    }
  </Layout>
  )
}
