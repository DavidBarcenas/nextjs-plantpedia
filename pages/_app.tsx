import { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next';
import { Provider as AuthProvider } from "next-auth/client";
import { QueryProvider } from '@api/QueryProvider';
import { UIProvider } from '@ui/Provider'
import { useServerStyles } from '@ui/ssr'
import '../styles.css'

const NextApp = ({ Component, pageProps }: AppProps) => {
  useServerStyles()

  return (
    <AuthProvider session={pageProps.session}>
      <QueryProvider>
        <UIProvider>
          <Component {...pageProps} />
        </UIProvider>
      </QueryProvider>
    </AuthProvider>
  )
}

export default appWithTranslation(NextApp)