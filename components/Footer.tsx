export const Footer = () => {
    return (
        <>
            <footer className="footer">
                <div className="logo"></div>
                <div className="wrapper">
                    <h3>Plantpedia</h3>

                    <div className="credits">
                        <p>
                            Images from
                            <a target="_blank" href="https://www.pexels.com" title="Pexels">Pexels</a>
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

                .footer a {
                    color: #fff;
                }

                @media screen and (min-width: 600px) {
                }
            `}</style>
        </>
    )
}
