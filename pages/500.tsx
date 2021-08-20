import { Layout } from '@components/Layout'
import Button from '@material-ui/core/Button'

const ServerErrorPage = ({ statusCode = 500 }: { statusCode?: number }) => {
    return (
        <Layout>
            <h2>🍄 Something went wrong</h2>
            <p>It's not you, it's us. Please try it again in a few minutes.</p>
            <span>ERRORCODE: {statusCode}</span>
            <Button color="primary" variant="contained" href="/" title="Go back home" >
                Go back home
            </Button>
        </Layout>
    )
}

export default ServerErrorPage