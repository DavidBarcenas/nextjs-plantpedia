
interface SidebarAuthorProps {
    author: Author
}

export const SidebarAuthor = ({ author }: SidebarAuthorProps) => {
    return (
        <>
            <div className="sidebar-author">
                <img src={author.photo.url} alt={author.photo.title} className="author-img" />
                <div>
                    <h3 className="author-name">{author.fullName}</h3>
                    <p className="author-description">{author.biography}</p>
                    <a href={author.linkedIn} title={`Follow ${author.fullName} on LinkedIn`} target="_blank">LI</a>
                    <a href={author.twitter} title={`Follow ${author.fullName} on Twitter`} target="_blank">TW</a>
                </div>
            </div>

            <style jsx>{`
                .sidebar-author {
                    display: flex;
                    border-top: 1px solid #ccc;
                    border-bottom: 1px solid #ccc;
                    padding: 1.5rem 0;
                    margin-bottom: 1rem;
                }
                .author-name {
                    font-size: 1.5rem;
                    margin-top: 0;
                }
                .author-img {
                    width: 130px;
                    height: 130px;
                    border-radius: 50%;
                    object-fit: cover;
                    margin-right: 1rem;
                }
                .author-description {
                    font-family: Arial, Helvetica, sans-serif;
                    margin: 0;
                    margin-bottom: 1rem;
                }
            `}</style>
        </>
    )
}
