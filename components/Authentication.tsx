import { Avatar, Button, makeStyles } from '@material-ui/core';
import { signIn, signOut, useSession } from 'next-auth/client';
import { useTranslation } from 'next-i18next';

export const Authentication = () => {
  const [session, loading] = useSession()
  const { t } = useTranslation(['common'])
  const classes = useStyles()

  if (loading) {
    return null
  }

  if (!session) {
    return (
      <Button
        className={classes.btn}
        onClick={() => signIn()}>
        {t('signIn')}
      </Button>
    )
  }

  return (
    <div className={classes.container}>
      {
        session.user.image && (
          <Avatar alt={session.user.name} src={session.user.image} />
        )
      }
      <span className={classes.name}>{session.user.name}</span>
      <Button
        size="small"
        onClick={() => signOut()}
        className={classes.btn}
      >
        {t('signOut')}
      </Button>
    </div>
  )
}

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center'
  },
  name: {
    margin: '0 .5rem',
    borderRight: '1px solid #777',
    paddingRight: '1rem'
  },
  btn: {
    textTransform: 'capitalize'
  }
})