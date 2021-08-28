import { ChangeEventHandler, useCallback, useEffect, useState } from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { GetStaticProps } from 'next'

import debouce from "lodash/debounce";

import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/SearchOutlined'

import { QueryStatus, searchPlants } from '@api'
import { Layout } from '@components/Layout'
import { PlantCollection } from '@components/Plant/PlantCollection'


export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: await serverSideTranslations(locale!),
})

const Search = () => {
  const classes = useStyles()
  const { t } = useTranslation(['search'])
  const [term, setTerm] = useState('')
  const [status, setStatus] = useState<QueryStatus>('idle')
  const [results, setResults] = useState<Plant[]>([])

  const debouncedSearchPlants = useCallback(
    debouce((term: string) => {
      searchPlants({ term, limit: 10, })
        .then((data) => {
          setResults(data)
          setStatus('success')
        })
    }, 500),
    []
  )

  const updateTerm: ChangeEventHandler<HTMLInputElement> = (event) => {
    setTerm(event.currentTarget.value)
  }

  const emptyResults = status === 'success' && results.length === 0

  useEffect(() => {
    if (term.trim().length < 3) {
      setStatus('idle')
      setResults([])
      return
    }

    setStatus('loading')

    debouncedSearchPlants(term)
  }, [term])

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