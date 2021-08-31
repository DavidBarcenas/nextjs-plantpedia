import { getSession, useSession } from 'next-auth/client';
import { GetServerSideProps } from 'next';
import { Layout } from "@components/Layout"
import { Button, Typography } from '@material-ui/core';
import { CustomImage } from '@components/CustomImage';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false
      }
    }
  }

  return {
    props: { session }
  }
}

const PremiumPage = () => {
  const [session, loading] = useSession()
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [refetchCounter, refetch] = useState(0)
  const { t } = useTranslation(['page-premium'])

  useEffect(() => {
    fetch('/api/premium')
      .then(response => response.json())
      .then(({ data }) => setImageUrl(data))
  }, [refetchCounter])

  if (loading) { return null }

  if (!session) {
    return (
      <Layout>
        <div className="wrapper">
          <Typography variant="h2" className="mb-6">
            😟 {t('accessdenied')}
          </Typography>
          <Typography variant="body1" className="mb-6">
            {t('weAreSorryYouCantAccess')}
          </Typography>
          <Button
            color="primary"
            variant="contained"
            href="/api/auth/signin"
            title={t('signIn')}
          >
            {t('signIn')}
          </Button>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="wrapper">
        <Typography variant='h2'>
          Welcome: {session.user.name}
        </Typography>
        <Typography variant='body2'>
          Here is your premium content
        </Typography>
        <div>
          {imageUrl == null ? null : (
            <CustomImage
              src={imageUrl}
              width={700}
              aspectRatio='4:3'
            />
          )}
        </div>
        <Button variant="outlined" onClick={() => refetch((c) => ++c)}>
          {t('more')}
        </Button>
      </div>
    </Layout>
  )
}

export default PremiumPage