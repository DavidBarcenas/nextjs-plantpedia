import { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next';
import { UIProvider } from '@ui/Provider'
import { useServerStyles } from '@ui/ssr'
import '../styles.css'

const NextApp = ({ Component, pageProps }: AppProps) => {
  useServerStyles()

  return (
    <UIProvider>
      <Component {...pageProps} />
    </UIProvider>
  )
}

export default appWithTranslation(NextApp)