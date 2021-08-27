import { useTranslation } from 'next-i18next'
import { Typography } from "@material-ui/core"
import { Layout } from "@components/Layout"
import Button from '@material-ui/core/Button'

const NotFoundPage = () => {
    const { t } = useTranslation(['errors'])

    return (
        <Layout title='404'>
            <div className="wrapper" style={{ textAlign: 'center', minHeight: '500px' }}>
                <Typography variant='h2'>🍂 {t('wearesorry')}</Typography>
                <p>{t('notFoundErrorMessage')}</p>
                <Button color="primary" variant="contained" href="/" title={t('goHome')} >
                    {t('goHome')}
                </Button>
            </div>
        </Layout>
    )
}

export default NotFoundPage