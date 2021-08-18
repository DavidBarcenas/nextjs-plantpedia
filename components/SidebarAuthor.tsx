
interface SidebarAuthorProps {
    author: Author
}

export const SidebarAuthor = ({ author }: SidebarAuthorProps) => {
    return (
        <div>
            <p className="title-sidebar">About me</p>
            <img src={author.photo.url} alt={author.photo.title} style={{}} />
            <p>{author.biography}</p>
            <div className="flex">
                <a
                    href={author.linkedIn}
                    title={`Follow ${author.fullName} on LinkedIn`}
                    target="_blank"
                >
                    LI
                </a>
                <a
                    href={author.twitter}
                    title={`Follow ${author.fullName} on Twitter`}
                    target="_blank"
                >
                    TW
                </a>
            </div>
        </div>
    )
}
