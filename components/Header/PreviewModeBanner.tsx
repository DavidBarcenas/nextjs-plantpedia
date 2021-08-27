import { useEffect, useState } from "react"
import { useTranslation } from 'next-i18next'
import Alert from '@material-ui/lab/Alert'
import Button from '@material-ui/core/Button'

type PreviewStatusResponse = {
    preview: boolean
    context: Json
} | null

export const PreviewModeBanner = () => {
    const [isEnabled, setIsEnabled] = useState(false)
    const { t } = useTranslation(['common'])

    useEffect(() => {
        try {
            fetch('/api/preview/status')
                .then((response) => response.json())
                .then((data: PreviewStatusResponse) => {
                    setIsEnabled(data?.preview || false)
                })
        } catch (e) {
            // ignore
        }
    }, [])

    if (!isEnabled) {
        return null
    }


    return (
        <div>
            <Alert
                variant="filled"
                severity="warning"
                action={
                    <Button variant="text" color="inherit" href="/api/preview/exit">
                        {t('disabledPreviewMode')}
                    </Button>
                }
            >
                <div className="max-w-md">{t('previewMode')}</div>
            </Alert>
        </div>
    )
}
