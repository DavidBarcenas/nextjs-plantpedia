import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from 'next'
import { Typography, makeStyles } from '@material-ui/core';
import { Layout } from '@components/Layout'
import { getCategoryList, getPlantListByCategory } from '@api'
import { CustomImage } from '../../components/CustomImage';
import { PlantCollection } from '@components/Plant/PlantCollection';

type Props = {
  entries: Plant[]
  category: Category
}

type PathType = {
  params: {
    slug: string
  }
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  console.log(params)
  const slug = params?.slug

  if (typeof slug !== 'string') {
    return {
      notFound: true,
    }
  }

  try {
    const { entries, category } = await getPlantListByCategory({
      category: slug,
      limit: 12,
    })

    return {
      props: {
        entries,
        category,
        status: 'success',
      },
      revalidate: 5 * 60
    }
  } catch (error) {
    return {
      notFound: true
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categoriesToGenerate = await getCategoryList({ limit: 10 })

  const paths: PathType[] = categoriesToGenerate.map(
    ({ slug: slug }) => ({
      params: {
        slug,
      },
    })
  )

  return {
    paths,
    fallback: 'blocking',
  }
}

const CategoryPage = ({
  entries,
  category,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const classes = useStyles()

  return (
    <Layout>
      <section className='wrapper'>
        <header className={classes.header}>
          <div className={classes.img}>
            <CustomImage
              src={category.icon.url}
              title={category.icon.title}
              width={100}
              aspectRatio='1:1'
              layout='intrinsic'
            />
          </div>
          <Typography variant="h2">
            {category.title}
          </Typography>
        </header>
        <PlantCollection plants={entries} />
      </section>
    </Layout>
  )
}

const useStyles = makeStyles({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  img: {
    width: '100px',
    marginRight: '1rem'
  }
})

export default CategoryPage