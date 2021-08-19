import Head from 'next/head'
import { Footer } from './Footer'
import { Header } from './Header'

interface LayoutProps {
    title?: string;
    children: JSX.Element | JSX.Element[]
}

export const Layout = ({ title = 'Plantpedia', children }: LayoutProps) => {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="preconnect" href="https://fonts.gstatic.com"></link>
                <noscript id="mui-insertion-point" />
                {/* Google fonts get automatically automized by Next.js: https://nextjs.org/blog/next-10-2#automatic-webfont-optimization */}
                <link
                    href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    )
}
