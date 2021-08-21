import Link from 'next/link'
import { CustomImage } from '@components/CustomImage'

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
                                    <div className="post-img">
                                        <CustomImage
                                            src={post.image.url}
                                            alt={post.image.title}
                                            aspectRatio='16:9'
                                            layout='intrinsic'
                                            width={150}
                                        />
                                    </div>
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
                    align-items: center;
                    margin-bottom: 1.5rem;
                }
                .post-sidebar-item a:hover {
                    text-decoration: underline;
                }
                .post-img {
                    width: 130px;
                    max-height: 100px;
                    margin-right: .75rem;
                    position: relative;
                    overflow: hidden;
                }
                .post-sidebar-item h3 {
                    margin: 0;
                    width: calc(100% - 150px);
                }
            `}</style>
        </>
    )
}
