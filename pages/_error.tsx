import Button from '@material-ui/core/Button'
import NotFoundPage from './404'
import ServerErrorPage from './500'
import { Layout } from '@components/Layout'

interface ErrorPageProps {
    statusCode?: number
    message?: string
}

export const getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return statusCode
}

const ErrorPage = ({ statusCode, message }: ErrorPageProps) => {
    if (statusCode === 404) {
        return <NotFoundPage />
    }

    if (typeof statusCode === 'number' && statusCode > 500) {
        return <ServerErrorPage statusCode={statusCode} />
    }

    let errorMessage = message
    if (!message) {
        errorMessage = statusCode
            ? 'An error occurred on the server'
            : 'An error occurred on the client'
    }

    return (
        <Layout>
            <div className="wrapper">
                <h2>🦦 Doh!</h2>
                <p>{errorMessage}</p>
                {!statusCode ? null : (
                    <span>ERRORCODE: {statusCode}</span>
                )}
                <Button color="primary" variant="contained" href="/" title="Go back home" >
                    Go back home
                </Button>
            </div>
        </Layout>
    )
}

export default ErrorPage