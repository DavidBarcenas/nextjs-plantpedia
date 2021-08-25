import Alert from '@material-ui/lab/Alert'
import { usePlantListByAuthor } from 'hooks/usePlantListByAuthor';
import { CustomImage } from '../CustomImage';
import { PlantCollection } from '../Plant/PlantCollection';

export const AutorTopStories = ({ author }: { author: Author }) => {
    const { plantList, status } = usePlantListByAuthor({
        authorId: author.id,
        limit: 12
    })

    return (
        <>
            <section className="top-stories-container">
                <div className="top-stories-author">
                    <CustomImage
                        src={author.photo.url}
                        alt={author.photo.title}
                        aspectRatio='1:1'
                        width={200}
                        layout='intrinsic'
                    />
                    <div className="top-stories-author-data">
                        <h2>{author.fullName}</h2>
                        <p>{author.biography}</p>
                        <span>TW</span>
                        <span>LN</span>
                    </div>
                </div>

                {status === 'error' && <Alert severity="error">Huh. Something went wrong.</Alert>}
                {status === 'success' && plantList.length === 0 ? (
                    <Alert severity="info">
                        {author.fullName} doesn't have any story yet.
                    </Alert>) : null}
            </section>
            <div className="wrap-plants">
                <PlantCollection plants={plantList} />
            </div>

            <style jsx>{`
                .top-stories-container {
                    padding: 2rem;
                    text-align: center;
                }
                .top-stories-author {
                    border-bottom: 1px solid #ccc;
                    padding-bottom: 2rem;
                }                
                .top-stories-author-data h2 {
                    font-size: 2.5rem;
                    margin: 0;
                }
                .top-stories-author-data p {
                    font-family: arial, helvetica;
                    line-height: 1.6rem;
                }
                .wrap-plants {
                    padding: 0 1rem;
                }
                
                @media screen and (min-width: 600px) {
                    .top-stories-container {
                        text-align: left;
                        padding-top: 0;
                    }
                    .top-stories-author {
                        display: flex;
                        align-items: start;
                    }

                    .top-stories-author-data {
                        width: 60%;
                        margin-left: 2rem;
                    }
                }
            `}</style>
        </>
    )
}
