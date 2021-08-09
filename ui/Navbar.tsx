import { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import Head from 'next/head';

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
        >
            <Toolbar>
                <AnimatedFavicon title={title} />
                {children}
            </Toolbar>
        </AppBar>
    )
}

const favicons = ['🌿', '🍃', '🍀', '🌷', '🌸', '🌚', '🌲', '🌵', '🌾', '🌱', '🌝', '🌴']

const AnimatedFavicon = ({title}: {title: string}) => {
    const [favIndex, setFavIndex] = useState(0)
    const [isHovering, setIsHovering] = useState(false)

    const toggleFavicon = () => setIsHovering(!setIsHovering)

    useEffect(() => {
        if(!isHovering) return;

        const intervalId = setInterval(() => {
            setFavIndex((prevValue) => {
                const nextValue = prevValue + 1

                if(nextValue >= favicons.length) {
                    return 0
                }
                return nextValue
            })
        }, 150)

        return () => {
            clearTimeout(intervalId)
        }
    }, [isHovering])

    const favicon = favicons[favIndex]

    return (
        <>
            <Head>
            <link
                rel="icon"
                href={`data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${favicon}</text></svg>`}
            />
            </Head>
            <Typography variant="h4" component="h1">
                <a
                    href="/"
                    onMouseEnter={toggleFavicon}
                    onMouseLeave={toggleFavicon}>
                    {title}
                </a>
            </Typography>
        </>
    )
}