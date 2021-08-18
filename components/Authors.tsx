import Link from 'next/link'

interface AuthorsProps {
    authors: Author[]
}

export const Authors = ({ authors }: AuthorsProps) => {
    return (
        <>
            <ul className="wrapper authors">
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
                    flex-wrap: wrap;
                    justify-content: center;
                    background: #f7f7f7;
                    max-width: 100%
                }
                .author-item {
                    margin: 0 .5rem;
                    text-
                    align: center;
                }
                .author-item:first-child {
                    margin-bottom: 1rem;
                }
                .author-img {
                    width: 120px;
                    height: 120px;
                    margin-bottom: .5rem;
                }
                .author-name {
                    font-size: 1.3rem;
                    font-weight: bold;
                    margin: 0;
                    text-align: center;
                }

                @media screen and (min-width: 600px) {
                    .author-item:first-child {
                        margin-bottom: 0;
                    }

                }
                
                @media screen and (min-width: 960px) {
                    .author-img {
                        width: 160px;
                        height: 160px;
                    }
                }
            `}</style>
        </>
    )
}
