import { SidebarCategories } from '@components/SidebarCategories'
import { SidebarPosts } from '@components/SidebarPosts'
import React from 'react'

type Props = {
  posts: Plant[];
  categories: Category[];
}

export const EntrySidebar = ({ posts, categories }: Props) => {
  return (
    <aside className="post-aside">
      <SidebarPosts posts={posts} />
      <SidebarCategories categories={categories} />
    </aside>
  )
}
