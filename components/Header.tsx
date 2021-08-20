import { PropsWithChildren } from 'react'
import Link, { LinkProps } from 'next/link'
import { Navbar } from "@ui/Navbar"
import Button from '@material-ui/core/Button'

export const Header = () => {
    return (
        <Navbar title="🌿 Plantpedia">
            <NavLink href="/top-stories">Top Stories</NavLink>
        </Navbar>
    )
}

function NavLink({ children, ...linkProps }: PropsWithChildren<LinkProps>) {
    return (
        <Link {...linkProps} passHref>
            <Button color="inherit" variant="text" component="a">
                {children}
            </Button>
        </Link>
    )
}