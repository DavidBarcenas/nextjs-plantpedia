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
                            <img src={category.icon.url} alt={category.icon.title} />
                            <p>{category.title}</p>
                        </li>
                    ))
                }
            </ul>

            <style jsx>{`
                .sidebar-categories {
                    /* display: grid;
                    grid-template-columns: repeat(2, 1fr); */
                    grid-gap: .75rem;
                    margin-bottom: 2rem;
                }
                .sidebar-categories-item {
                    display: flex;
                    align-items: center;
                    border-bottom: 1px solid #ccc;
                    padding: .5em 0;
                }
                .sidebar-categories-item img {
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
