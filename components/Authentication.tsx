import { Button } from '@material-ui/core';
import { signIn, signOut, useSession } from 'next-auth/client';
import { useTranslation } from 'next-i18next';

export const Authentication = () => {
  const [session, loading] = useSession()
  const { t } = useTranslation(['common'])

  if (loading) {
    return null
  }

  if (!session) {
    return <Button onClick={() => signIn()}>{t('signIn')}</Button>
  }

  return (
    <>
      <span>{session.user.name}</span>
      <Button onClick={() => signOut()}>{t('signOut')}</Button>
    </>
  )
}
