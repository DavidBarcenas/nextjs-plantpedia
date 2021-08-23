import Link from 'next/link'
import { makeStyles } from '@material-ui/core'
import { CustomImage } from '@components/CustomImage'

interface Props {
    authors: Author[]
}

export const AuthorCollection = ({ authors }: Props) => {
    const classes = useStyles()

    return (
        <ul className={`wrapper ${classes.authors}`}>
            {
                authors.map(author => (
                    <li key={author.id} className={classes.authorItem}>
                        <Link href={`/top-stories/${author.handle}`}>
                            <a title={`See latest stories from ${author.fullName}`}>
                                <div className={classes.authorImg}>
                                    <CustomImage
                                        src={author.photo.url}
                                        alt={author.fullName}
                                        aspectRatio='1:1'
                                        layout='responsive'
                                        width={150}
                                    />
                                </div>
                                <p className={classes.authorName}>{author.fullName}</p>
                            </a>
                        </Link>
                    </li>
                ))
            }
        </ul>
    )
}

const useStyles = makeStyles(theme => ({
    authors: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        background: theme.palette.background.default,
        maxWidth: '100% !important'
    },
    authorItem: {
        margin: '0 .5rem',
        textAlign: 'center',
        '&:first-child': {
            marginBottom: '1rem',
            [theme.breakpoints.up('sm')]: {
                marginBottom: 0
            },
        },
    },
    authorImg: {
        width: '120px',
        height: '120px',
        marginBottom: '1rem',
        [theme.breakpoints.up('md')]: {
            width: '160px',
            height: '160px'
        },
    },
    authorName: {
        fontSize: '1.2rem',
        margin: 0,
        textAlign: 'center'
    }
}))