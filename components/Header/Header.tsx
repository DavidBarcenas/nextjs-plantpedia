import { PropsWithChildren } from 'react'
import Link, { LinkProps } from 'next/link'
import Button from '@material-ui/core/Button'

import { Navbar } from "@ui/Navbar"
import { PreviewModeBanner } from './PreviewModeBanner'
import { SelectLang } from './SelectLang'

export const Header = () => {


    return (
        <header>
            <PreviewModeBanner />
            <SelectLang />
            <Navbar title="🌿 Plantpedia">
                <NavLink href="/top-stories">Top Stories</NavLink>
            </Navbar>
        </header>
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