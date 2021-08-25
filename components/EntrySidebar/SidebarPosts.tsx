import Link from 'next/link'
import { CustomImage } from '@components/CustomImage'
import { makeStyles, Typography } from '@material-ui/core';

type Props = {
  posts: Plant[]
}

export const SidebarPosts = ({ posts }: Props) => {
  const classes = useStyles()

  return (
    <div>
      <h3 className="title-sidebar">Recent Posts</h3>
      <ul className={classes.list}>
        {
          posts.map(post => (
            <li className={classes.listItem} key={post.id}>
              <Link href={`/entry/${post.slug}`}>
                <a title={`Go to ${post.plantName}`} className={classes.link}>
                  <div className="post-img">
                    <CustomImage
                      src={post.image.url}
                      alt={post.image.title}
                      aspectRatio='3:2'
                      layout='intrinsic'
                      width={150}
                      className={classes.img}
                    />
                  </div>
                  <Typography
                    variant='h6'
                    component='h3'
                    className={classes.title}>
                    {post.plantName}
                  </Typography>
                </a>
              </Link>
            </li>
          ))
        }
      </ul>


    </div>
  )
}

const useStyles = makeStyles({
  list: {
    marginBottom: '1rem'
  },
  listItem: {
    display: 'block'
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1.5rem'
  },
  img: {
    width: '130px',
    maxHeight: '100px',
    position: 'relative',
    overflow: 'hidden'
  },
  title: {
    lineHeight: '1.5rem',
    margin: 0,
    marginLeft: '1rem',
    marginBottom: '5px',
    width: 'calc(100% - 150px)'
  }
})