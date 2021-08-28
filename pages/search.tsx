import { ChangeEventHandler, useCallback, useEffect, useState } from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { GetStaticProps } from 'next'

import get from 'lodash/get';
import flatMap from 'lodash/flatMap';
import clsx from 'clsx'

import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Typography,
  Button
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/SearchOutlined'

import { Layout } from '@components/Layout'
import { PlantCollection } from '@components/Plant/PlantCollection'
import { useDebounce } from 'hooks/useDebounce';
import { useInfinitePlantSearch } from '../api/query/useInfinityPlantSearch';


export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: await serverSideTranslations(locale!),
})

const Search = () => {
  const classes = useStyles()
  const { t } = useTranslation(['search'])
  const [term, setTerm] = useState('')

  const searchTerm = useDebounce(term, 500)

  // Use react-query to improve our http cache strategy and to make pagination easier
  const {
    data,
    status,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage
  } = useInfinitePlantSearch({ term: searchTerm }, {
    enabled: searchTerm.trim().length > 1,
    staleTime: Infinity
  })

  const updateTerm: ChangeEventHandler<HTMLInputElement> = (event) => {
    setTerm(event.currentTarget.value)
  }

  const emptyResults = status === 'success' && get(data, 'pages[0].length', 0) === 0
  let results: Plant[] = []

  if (data?.pages) {
    results = flatMap(data.pages)
  }

  return (
    <Layout>
      <div className={`wrapper ${classes.wrapper}`}>
        <div className={classes.searchContainer}>
          <FormControl variant='outlined' className={classes.search}>
            <InputLabel htmlFor="search-term-field">{t('term')}</InputLabel>
            <OutlinedInput
              id="search-term-field"
              value={term}
              onChange={updateTerm}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
              labelWidth={100}
            />
          </FormControl>
        </div>
        {emptyResults ? (<Typography variant="body1">{t('notFound', { term })}</Typography>) : null}
        {!emptyResults ? (<PlantCollection plants={results} />) : null}
        {!hasNextPage ? null : (
          <div className="text-center p4">
            <Button
              variant="outlined"
              disabled={isFetchingNextPage}
              className={clsx({ 'animate-pulse': isFetchingNextPage })}
              onClick={() => fetchNextPage()}
            >
              {isFetchingNextPage ? t('loading') : t('loadMore')}
            </Button>
          </div>
        )}
      </div>
    </Layout>
  )
}

const useStyles = makeStyles({
  wrapper: {
    minHeight: '400px'
  },
  searchContainer: {
    width: '70%',
    margin: 'auto',
  },
  search: {
    width: '100%'
  }
})

export default Search