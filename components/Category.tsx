import React from 'react'
import { makeStyles, Paper } from '@material-ui/core';

type Props = {
    category: Category;
    className?: string
}

export const Category = ({ category, className }: Props) => {
    const classes = useStyles()

    return (
        <Paper className={`${classes.categoryContainer} ${className}`}>
            <p className={classes.category}>
                {category.slug}
            </p>
        </Paper>
    )
}

const useStyles = makeStyles({
    categoryContainer: {
        display: 'inline-block',
        borderRadius: '1rem',
        background: '#fee86d',
    },
    category: {
        padding: '.3rem 1rem',
        fontSize: '.85rem',
        letterSpacing: '.5px',
        margin: 0
    }
})