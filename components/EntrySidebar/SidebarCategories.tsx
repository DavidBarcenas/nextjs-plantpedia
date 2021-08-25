import { CustomImage } from '@components/CustomImage'

interface SidebarCategoriesProps {
    categories: Category[];
}

export const SidebarCategories = ({ categories }: SidebarCategoriesProps) => {
    return (
        <>
            <h3 className="title-sidebar">Categories</h3>
            <ul className="sidebar-categories">
                {
                    categories.map(category => (
                        <li className="sidebar-categories-item" key={category.id}>
                            <div className="sidebar-categories-img">
                                <CustomImage
                                    src={category.icon.url}
                                    alt={category.icon.title}
                                    width={80}
                                    aspectRatio='4:3'
                                    layout='responsive'
                                />
                            </div>
                            <p>{category.title}</p>
                        </li>
                    ))
                }
            </ul>

            <style jsx>{`
                .sidebar-categories {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    grid-gap: .1rem;
                }
                .sidebar-categories-item {
                    display: flex;
                    align-items: center;
                    padding: .5em 0;
                }
                .sidebar-categories-img {
                    width: 80px;
                    margin-right: .75rem;
                }
                .sidebar-categories-item p {
                    font-size: 1rem;
                    font-family: Arial, Helvetica, sans-serif;
                    margin: 0;
                }
            `}</style>
        </>
    )
}
