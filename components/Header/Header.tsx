import { PropsWithChildren } from 'react'
import Link, { LinkProps } from 'next/link'
import Button from '@material-ui/core/Button'
import { Navbar } from "@ui/Navbar"
import { PreviewModeBanner } from './PreviewModeBanner'

export const Header = () => {
    return (
        <>
            <PreviewModeBanner />
            <Navbar title="🌿 Plantpedia">
                <NavLink href="/top-stories">Top Stories</NavLink>
            </Navbar>
        </>
    )
}

const NavLink = ({ children, ...linkProps }: PropsWithChildren<LinkProps>) => {
    return (
        <Link {...linkProps} passHref>
            <Button color="inherit" variant="text" component="a">
                {children}
            </Button>
        </Link>
    )
}