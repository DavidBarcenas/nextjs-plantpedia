import Link from 'next/link'

interface SidebarPostsProps {
    posts: Plant[]
}

export const SidebarPosts = ({ posts }: SidebarPostsProps) => {
    return (
        <>
            <h3 className="title-sidebar">Recent Posts</h3>
            <ul className="post-sidebar">
                {
                    posts.map(post => (
                        <li className="post-sidebar-item" key={post.id}>
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
                .post-sidebar {
                    margin-bottom: 1rem;
                }
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
                    max-height: 100px;
                    margin-right: .75rem;
                    margin-bottom: 1rem;
                    object-fit: cover; 
                }
                .post-sidebar-item h3 {
                    margin: 0;
                }
            `}</style>
        </>
    )
}
