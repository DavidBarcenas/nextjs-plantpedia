import { AppBar, Toolbar } from '@material-ui/core'
import { AnimatedFavicon } from '@components/AnimatedFavicon'
import { makeStyles } from '@material-ui/core'
import { theme } from './theme';

type Props = {
    title: string;
    children: React.ReactNode
}

export const Navbar = ({ title, children }: Props) => {
    const classes = useStyles();

    return (
        <AppBar
            position='static'
            color='transparent'
            elevation={0}
            className={classes.navbar}>
            <Toolbar>
                <AnimatedFavicon title={title} className={classes.logo} />
                {children}
            </Toolbar>
        </AppBar>
    )
}

const useStyles = makeStyles({
    logo: {
        flexGrow: 1
    },
    navbar: {
        padding: '.5rem',
        borderBottom: `1px solid ${theme.palette.divider}`
    }
})