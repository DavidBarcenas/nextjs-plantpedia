import { PlantItem } from './PlantItem'
import { makeStyles } from '@material-ui/core';

interface Props {
    plants: Plant[];
    variant?: 'horizontal' | 'vertical';
}

export const PlantCollection = ({ plants, variant = 'horizontal' }: Props) => {
    const classes = useStyles()

    return variant === 'horizontal' ?
        (
            <section className={`wrapper ${classes.plantCollection}`}>
                {plants.map(plant => (
                    <PlantItem
                        key={plant.id}
                        plant={plant}
                        showDesc={false}
                        aspectRatio='4:3'
                        fit='fill'
                        titleVariant='h3'
                    />
                ))}
            </section>
        ) :
        (
            <section className={`wrapper ${classes.plantCollection, classes.vertical}`}>
                {plants.map(plant => (
                    <PlantItem
                        key={plant.id}
                        plant={plant}
                        showDesc={true}
                        aspectRatio='3:2'
                        layout='responsive'
                    />
                ))}
            </section>
        )

}

const useStyles = makeStyles(theme => ({
    plantCollection: {
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: '.5rem',
        [theme.breakpoints.up('sm')]: {
            gridTemplateColumns: 'repeat(2, 1fr)',
        },
        [theme.breakpoints.up('md')]: {
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridGap: '2rem'
        },
    },
    vertical: {
        gridTemplateColumns: 'repeat(2, 1fr)',
    }
}))