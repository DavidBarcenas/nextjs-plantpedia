import Link from 'next/link'
import { useAuthors } from '../hooks/useAuthors';

export const Authors = () => {
    const { status, authors } = useAuthors()

    if (status != 'success' && authors == null) {
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
                                    <p className="author-name">
                                        {author.fullName}
                                    </p>
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
                    background: #f7f7f7;
                    padding: 3rem 0;
                }
                .author-item {
                    margin: 0 .5rem;
                    text-align: center;
                }
                .author-img {
                    width: 130px;
                    height: 130px;
                    margin-bottom: .5rem;
                }
                .author-name {
                    font-size: 1.3rem;
                    font-weight: bold;
                    margin: 0;
                }
            `}</style>
        </>
    )
}
