import React from 'react'
import { makeStyles } from '@material-ui/core';
import { SidebarCategories } from '@components/EntrySidebar/SidebarCategories'
import { SidebarPosts } from '@components/EntrySidebar/SidebarPosts'

type Props = {
  posts: Plant[];
  categories: Category[];
}

export const EntrySidebar = ({ posts, categories }: Props) => {
  const classes = useStyles()

  return (
    <aside className={classes.aside}>
      <SidebarPosts posts={posts} />
      <SidebarCategories categories={categories} />
    </aside>
  )
}

const useStyles = makeStyles(theme => ({
  aside: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '30%'
    }
  }
}))