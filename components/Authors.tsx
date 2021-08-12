import Link from 'next/link'
import { useAuthors } from '../hooks/useAuthors';

export const Authors = () => {
    const {status, authors} = useAuthors()

    if(status != 'success' && authors == null) {
        return null
    } 

    return (
        <>
            <ul className="authors">
                {
                    authors.map(author => (
                        <li key={author.id} className="author-item">
                            <Link href={`/top-stories/${author.handle}`}>
                                <a title={`See latest stories from ${author.fullName}`}>
                                    <img 
                                        src={author.photo.url} 
                                        alt={author.fullName} 
                                        className="author-img" 
                                    />
                                    <p className="author-name">{author.fullName}</p>
                                </a>
                            </Link>
                        </li>
                    ))
                }
            </ul>

            <style jsx>{`
                .authors {
                    display: flex;
                    justify-content: center;
                    margin-bottom: 2rem;
                }
                .author-item {
                    margin: 0 .5rem;
                    text-align: center;
                }
                .author-img {
                    width: 100px;
                    height: 100px;
                    margin-bottom: .5rem;
                }
                .author-name {
                    font-weight: bold;
                    margin: 0;
                }
            `}</style>
        </>
    )
}
