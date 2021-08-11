import { AppBar, Toolbar } from '@material-ui/core'
import { AnimatedFavicon } from '@components/AnimatedFavicon'

interface NavbarProps {
    title: string;
    children: React.ReactNode
}

export const Navbar = ({title, children}: NavbarProps) => {
    return (
        <AppBar 
            position='static' 
            color='transparent' 
            elevation={0}
            className='navbar'>
            <Toolbar>
                <AnimatedFavicon title={title} />
                {children}
            </Toolbar>
        </AppBar>
    )
}
