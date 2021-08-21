import { useEffect, useState } from "react"
import Head from 'next/head';
import { Typography } from '@material-ui/core'

const favicons = ['🌿', '🍃', '🍀', '🌷', '🌸', '🌚', '🌲', '🌵', '🌾', '🌱', '🌝', '🌴']

interface Props {
    title: string;
    className?: string;
}

export const AnimatedFavicon = ({ title, className }: Props) => {
    const [favIndex, setFavIndex] = useState(0)
    const [isHovering, setIsHovering] = useState(false)

    const toggleFavicon = () => setIsHovering(!isHovering)

    useEffect(() => {
        if (!isHovering) return;

        const intervalId = setInterval(() => {
            setFavIndex((prevValue) => {
                const nextValue = prevValue + 1

                if (nextValue >= favicons.length) {
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
            <Typography variant="h4" component="h1" className={className}>
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