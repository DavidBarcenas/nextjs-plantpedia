import { Typography } from "@material-ui/core"
import { useTranslation } from 'next-i18next'

export const Footer = () => {
    const { t } = useTranslation(['common'])

    return (
        <>
            <footer className="footer">
                <div className="logo"></div>
                <div className="wrapper">
                    <Typography
                        variant='h2'
                        style={{ marginBottom: '1rem' }}
                    >Plantpedia</Typography>
                    <div className="credits">
                        <p>
                            {t('imagesFrom')}
                            <a target="_blank" href="https://www.pexels.com" title="Pexels"> Pexels</a>
                        </p>
                    </div>
                </div>
            </footer>

            <style jsx>{`
                .footer {
                    background: #222;
                    color: #fff;
                    position: relative;
                    overflow: hidden;
                    text-align: center;
                    padding: 1rem 0;
                }
                .logo {
                    position: absolute;
                    width: 205px;
                    height: 216px;
                    background: url(/leaf.png) center center no-repeat;
                    opacity: 0.2;
                    top: 0;
                    left: -40px;
                    transform: rotate(120deg);
                }

                .footer h3 {
                    font-size: 3rem;
                }

                .credits {
                    border-top: 1px solid #333;
                    padding-top: 1rem;
                    font-family: arial;
                }
                
                .credits p {
                    color: #777;
                }

                .footer a {
                    color: #777;
                }

                @media screen and (min-width: 600px) {
                }
            `}</style>
        </>
    )
}
