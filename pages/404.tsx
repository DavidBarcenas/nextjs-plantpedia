import { Layout } from "@components/Layout"
import { Typography } from "@material-ui/core"
import Button from '@material-ui/core/Button'

const NotFoundPage = () => {
    return (
        <Layout title='404'>
            <div className="wrapper" style={{ textAlign: 'center', minHeight: '500px' }}>
                <Typography variant='h2'>🍂 We are sorry</Typography>
                <p>We could not find what you were looking for</p>
                <Button color="primary" variant="contained" href="/" title="Go back home" >
                    Go back home
                </Button>
            </div>
        </Layout>
    )
}

export default NotFoundPage