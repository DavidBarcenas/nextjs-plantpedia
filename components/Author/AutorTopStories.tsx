import Alert from '@material-ui/lab/Alert'
import { makeStyles } from '@material-ui/core';
import { useTranslation } from 'next-i18next'

import { usePlantListByAuthor } from '@api/query/usePlantListByAuthor';
import { PlantCollection } from '../Plant/PlantCollection';
import { Author } from './Author';

export const AutorTopStories = ({ author }: { author: Author }) => {
  const classes = useStyles()
  const { t } = useTranslation(['top-stories'])
  const { data, isError, isSuccess } = usePlantListByAuthor({
    authorId: author.id,
    limit: 12
  }, {
    staleTime: 1000 * 60 * 5 // 5min
  })

  return (
    <>
      <section className={classes.container}>
        <Author author={author} />
        {isError && <Alert severity="error">{t('somethingWentWrong')}</Alert>}
        {isSuccess && data.length === 0 ? (
          <Alert severity="info">
            {t('authorHasNoStories', { name: author.fullName })}
          </Alert>) : null}
        <div className="top-stories-posts">
          {isSuccess && data ? <PlantCollection plants={data} /> : null}
        </div>
      </section>
    </>
  )
}

const useStyles = makeStyles(theme => ({
  container: {
    [theme.breakpoints.up('md')]: {
      padding: '0 4rem',
    }
  }
}))