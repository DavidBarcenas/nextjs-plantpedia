import Alert from '@material-ui/lab/Alert'
import { makeStyles } from '@material-ui/core';
import { useTranslation } from 'next-i18next'

import { usePlantListByAuthor } from 'hooks/usePlantListByAuthor';
import { PlantCollection } from '../Plant/PlantCollection';
import { Author } from './Author';

export const AutorTopStories = ({ author }: { author: Author }) => {
  const classes = useStyles()
  const { t } = useTranslation(['top-stories'])

  const { plantList, status } = usePlantListByAuthor({
    authorId: author.id,
    limit: 12
  })

  return (
    <>
      <section className={classes.container}>
        <Author author={author} />
        {status === 'error' && <Alert severity="error">{t('somethingWentWrong')}</Alert>}
        {status === 'success' && plantList.length === 0 ? (
          <Alert severity="info">
            {t('authorHasNoStories', { name: author.fullName })}
          </Alert>) : null}
        <div className="top-stories-posts">
          <PlantCollection plants={plantList} />
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