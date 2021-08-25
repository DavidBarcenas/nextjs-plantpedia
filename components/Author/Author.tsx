import Link from 'next/link'
import { makeStyles } from '@material-ui/core';
import { CustomImage } from '../CustomImage';

interface SidebarAuthorProps {
    author: Author
}

export const Author = ({ author }: SidebarAuthorProps) => {
    const classes = useStyles()

    return (
        <div className={classes.author}>
            <Link href={`/top-stories/${author.handle}`}>
                <a title={`See latest stories from ${author.fullName}`}>
                    <CustomImage
                        src={author.photo.url}
                        alt={author.photo.title}
                        width={150}
                        aspectRatio='1:1'
                    />
                </a>
            </Link>
            <div className={classes.info}>
                <Link href={`/top-stories/${author.handle}`}>
                    <a title={`See latest stories from ${author.fullName}`}>
                        <h3 className={classes.name}>{author.fullName}</h3>
                    </a>
                </Link>
                <p className={classes.description}>{author.biography}</p>
                <a href={author.linkedIn} title={`Follow ${author.fullName} on LinkedIn`} target="_blank">LI</a>
                <a href={author.twitter} title={`Follow ${author.fullName} on Twitter`} target="_blank">TW</a>
            </div>
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    author: {
        display: 'flex',
        flexDirection: 'column',
        borderTop: `1px solid ${theme.palette.divider}`,
        borderBottom: `1px solid ${theme.palette.divider}`,
        padding: '1.5rem 0',
        marginBottom: '1rem',
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row'
        }
    },
    info: {
        marginTop: '1rem',
        [theme.breakpoints.up('sm')]: {
            marginTop: 0,
            marginLeft: '1.5rem',
            width: 'calc(100% - 200px)'
        }
    },
    name: {
        fontSize: '1.5rem',
        fontWeight: 500,
        marginTop: 0,
        marginBottom: '1rem',
    },
    description: {
        color: theme.palette.grey[700],
        margin: 0,
        marginBottom: '1rem'
    }
}))