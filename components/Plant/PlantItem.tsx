import Link from 'next/link'
import Button from '@material-ui/core/Button'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core';

import { Excerpt } from '@components/Excerpt';
import { CustomImage } from '@components/CustomImage';

import { CustomImageProps } from 'types/imageTypes';
import { DistributivePick } from 'types/distributive';
import { Category } from '@components/Category';

type Props = {
    plant: Plant;
    showDesc: Boolean;
    width?: number;
    titleVariant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
} & DistributivePick<CustomImageProps, 'fit' | 'layout' | 'aspectRatio'>

export const PlantItem = ({
    plant,
    showDesc,
    width = 460,
    aspectRatio = '16:9',
    fit = 'scale',
    layout = 'intrinsic',
    titleVariant = 'h2'
}: Props) => {
    const { slug, plantName, image, category, description } = plant
    const classes = useStyles()

    return (
        <article className={classes.plant}>
            <Link href={`/entry/${slug}`}>
                <a title={`Go to ${plantName}`}>
                    <CustomImage
                        src={image.url}
                        layout={layout}
                        width={width}
                        aspectRatio={aspectRatio}
                        fit={fit}
                    />
                    <Category
                        category={category.title}
                        className={classes.category}
                    />
                    <Typography
                        variant={titleVariant}
                        component="h2"
                        style={{ marginTop: '.5rem' }}>
                        {plantName}
                    </Typography>
                </a>
            </Link >
            {
                showDesc && (
                    <>
                        <Excerpt richText={description} className={classes.excerpt} />
                        <Link href={`/entry/${slug}`} passHref>
                            <Button variant="outlined">Read more</Button>
                        </Link>
                    </>
                )
            }
        </article >
    )
}

const useStyles = makeStyles(theme => ({
    plant: {
        marginBottom: '1rem',
        position: 'relative'
    },
    excerpt: {
        color: theme.palette.primary.light,
        fontSize: '1.2rem'
    },
    category: {
        position: 'absolute',
        top: '1rem',
        right: '1rem'
    }
}))