import Link from 'next/link'
import { Grid, makeStyles } from '@material-ui/core'
import { CustomImage } from '@components/CustomImage'
import { useAuthors } from '../../api/query/useAuthor';

export const AuthorCollection = () => {
    const classes = useStyles()
    const { data, status } = useAuthors({ limit: 10 })

    if (data == null || status !== 'success') {
        const dummyItems = Array.from({ length: 4 }, (_, i) => `item-${i}`)
        return (
            <Grid container spacing={4} justifyContent="center">
                {dummyItems.map((item) => (
                    <Grid
                        xs={2}
                        item
                        key={item}
                        className="bg-gray-200 animate pulse"
                    ></Grid>
                ))}
            </Grid>
        )
    }

    return (
        <ul className={`wrapper ${classes.authors}`}>
            {
                data.map(author => (
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