import Link from 'next/link'

interface SidebarPostsProps {
    posts: Plant[]
}

export const SidebarPosts = ({ posts }: SidebarPostsProps) => {
    return (
        <>
            <p className="title-sidebar">Recent Posts</p>
            <ul className="post-sidebar">
                {
                    posts.map(post => (
                        <li className="post-sidebar-item">
                            <Link href={`/entry/${post.slug}`}>
                                <a title={`Go to ${post.plantName}`}>
                                    <img src={post.image.url} alt={post.image.title} />
                                    <h3>{post.plantName}</h3>
                                </a>
                            </Link>
                        </li>
                    ))
                }
            </ul>

            <style jsx>{`
                .post-sidebar-item {
                    display: block;
                }

                .post-sidebar-item a {
                    display: flex;
                }

                .post-sidebar-item a:hover {
                    text-decoration: underline;
                }

                .post-sidebar-item img {
                    width: 150px;
                    margin-right: .75rem;
                    margin-bottom: 1rem;
                }
            `}</style>
        </>
    )
}
