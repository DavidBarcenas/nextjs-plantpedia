import Alert from '@material-ui/lab/Alert'
import { usePlantListByAuthor } from 'hooks/usePlantListByAuthor';
import { CustomImage } from '../CustomImage';
import { PlantCollection } from '../Plant/PlantCollection';
import { Author } from './Author';
import { makeStyles } from '@material-ui/core';

export const AutorTopStories = ({ author }: { author: Author }) => {
  const classes = useStyles()

  const { plantList, status } = usePlantListByAuthor({
    authorId: author.id,
    limit: 12
  })

  return (
    <>
      <section className={classes.container}>
        <Author author={author} />
        {status === 'error' && <Alert severity="error">Huh. Something went wrong.</Alert>}
        {status === 'success' && plantList.length === 0 ? (
          <Alert severity="info">
            {author.fullName} doesn't have any story yet.
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