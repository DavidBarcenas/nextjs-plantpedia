import Alert from '@material-ui/lab/Alert'
import { usePlantListByAuthor } from 'hooks/usePlantListByAuthor';
import { SidebarAuthor } from './SidebarAuthor';
import { PlantCollection } from './PlantCollection';

export const AutorTopStories = ({ author }: { author: Author }) => {
    const { plantList, status } = usePlantListByAuthor({
        authorId: author.id,
        limit: 12
    })

    return (
        <div>
            <section>
                <SidebarAuthor author={author} />
            </section>
            {status === 'error' && <Alert severity="error">Huh. Something went wrong.</Alert>}
            {status === 'success' && plantList.length === 0 ? (
                <Alert severity="info">
                    {author.fullName} doesn't have any story yet.
                </Alert>) : null}
            <PlantCollection plants={plantList} />
        </div>
    )
}
