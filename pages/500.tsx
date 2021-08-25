import { Layout } from '@components/Layout'
import Button from '@material-ui/core/Button'
import { Typography } from '@material-ui/core';

const ServerErrorPage = ({ statusCode = 500 }: { statusCode?: number }) => {
    return (
        <Layout>
            <div className="wrapper">
                <Typography variant='h2'>🍄 Something went wrong</Typography>
                <p>It's not you, it's us. Please try it again in a few minutes.</p>
                <span>ERRORCODE: {statusCode}</span>
                <Button color="primary" variant="contained" href="/" title="Go back home" >
                    Go back home
                </Button>
            </div>
        </Layout>
    )
}

export default ServerErrorPage