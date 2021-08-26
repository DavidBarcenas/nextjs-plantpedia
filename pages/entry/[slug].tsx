import React from 'react'
import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from 'next';
import { makeStyles, Typography } from '@material-ui/core';
import { flatMap } from 'lodash'

import { getPlant, getPlantList, getCategoryList } from '../../api/index';

import { RichText } from '@components/RichText';
import { Layout } from '@components/Layout';
import { CustomImage } from '@components/CustomImage'
import { EntrySidebar } from '@components/EntrySidebar/EntrySidebar';
import { Author } from '@components/Author/Author';

type PlantEntryProps = {
  plant: Plant;
  posts: Plant[];
  categories: Category[]
}

type PathType = {
  params: {
    slug: string;
  }
  local: string
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  if (!locales) {
    throw new Error('An error occurred in the translation.')
  }

  const entries = await getPlantList({ limit: 10 })
  const paths: PathType[] = flatMap(entries.map(plant => ({
    params: {
      slug: plant.slug
    }
  })),
    (path: PathType) => locales.map(locale => ({ locale, ...path })))

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps<PlantEntryProps> = async ({ params, preview, locale }) => {
  const slug = params.slug

  if (typeof slug !== 'string') {
    return {
      notFound: true
    }
  }

  try {
    const plant = await getPlant(slug, preview, locale)
    const posts = await getPlantList({ limit: 6, skip: 10 })
    const categories = await getCategoryList()

    return {
      props: {
        plant,
        posts,
        categories
      },
      revalidate: 5 * 60 // refresh 5 min
    }
  } catch (error) {
    return {
      notFound: true
    }
  }
}

const PlantEntryPage = ({ plant, posts, categories }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const classes = useStyles()

  return (
    <Layout>
      <section className={`wrapper ${classes.container}`}>
        <article className={classes.post}>
          <CustomImage
            src={plant.image.url}
            alt={plant.image.title}
            aspectRatio='3:2'
            layout='responsive'
            width={800}
          />
          <div className={classes.description}>
            <Typography
              variant="h2"
              component="h2"
              style={{ margin: '1.5rem 0' }}
            >
              {plant.plantName}
            </Typography>
            <RichText description={plant.description} />
          </div>
          <Author author={plant.author} />
        </article>
        <EntrySidebar posts={posts} categories={categories} />
      </section>
    </Layout>
  )
}

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  post: {
    [theme.breakpoints.up('md')]: {
      width: '70%',
      paddingRight: '1.5rem'
    }
  },
  description: {
    [theme.breakpoints.up('sm')]: {
      width: '90%',
      margin: 'auto',
      marginBottom: '2.5rem'
    }
  },
}))

export default PlantEntryPage