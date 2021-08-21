import Link from 'next/link'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core';
import { CustomImage } from '@components/CustomImage'

export const Hero = ({ image, plantName, category, slug, author }: Plant) => {
    const classes = useStyles();

    return (
        <div className='wrapper'>
            <div className={classes.hero}>
                <div className={classes.heroWrapText}>
                    <p className="category">{category.title}</p>
                    <Link href={`/entry/${slug}`}>
                        <a title={`Go to ${plantName}`}>
                            <Typography
                                variant="h1"
                                component="h2"
                                className={classes.heroText}>
                                {plantName}
                            </Typography>
                        </a>
                    </Link>
                    <p className={classes.heroAuthor}>- {author.fullName}</p>
                </div>
                <div className={classes.heroImg}>
                    <CustomImage
                        src={image.url}
                        alt={plantName}
                        width={400}
                        layout='responsive'
                        aspectRatio='1:1'
                    />
                    <div className={classes.backdrop}>
                        <CustomImage
                            src={image.url}
                            alt={plantName}
                            width={400}
                            layout='responsive'
                            aspectRatio='1:1'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    hero: {
        display: 'flex',
        alignItems: 'center'
    },
    heroImg: {
        position: 'relative',
        width: '50%',
        marginRight: '1rem',
    },
    backdrop: {
        position: 'absolute',
        top: '5%',
        left: '5%',
        width: '100%',
        height: '100%',
        opacity: '0.3',
        filter: 'blur(5px)',
        zIndex: -1
    },
    heroWrapText: {
        width: '50%',
        padding: '0 1rem',
    },
    heroText: {
        wordBreak: 'break-word',
        fontSize: '2rem',
        fontWeight: 'bold',
        textAlign: 'left',
        [theme.breakpoints.up('sm')]: {
            fontSize: '3rem'
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '5rem',
        },
    },
    heroAuthor: {
        margin: '0.5rem 0'
    },
}))