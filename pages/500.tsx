import { useTranslation } from 'next-i18next'
import Button from '@material-ui/core/Button'
import { Typography } from '@material-ui/core';
import { Layout } from '@components/Layout'

const ServerErrorPage = ({ statusCode = 500 }: { statusCode?: number }) => {
    const { t } = useTranslation(['errors'])

    return (
        <Layout>
            <div className="wrapper">
                <Typography variant='h2'>🍄 {t('somethingWentWrong')}</Typography>
                <p>{t('errorMessage')}</p>
                <span>ERRORCODE: {statusCode}</span>
                <Button color="primary" variant="contained" href="/" title={t('goHome')} >
                    {t('goHome')}
                </Button>
            </div>
        </Layout>
    )
}

export default ServerErrorPage