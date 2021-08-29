import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next'
import { Typography, Grid, Button, makeStyles } from '@material-ui/core';

export const SelectLang = () => {
  const { locales, locale } = useRouter()
  const { t } = useTranslation(['common'])
  const classes = useStyles()

  return (
    <Grid container justifyContent="space-between" className={`bg-gray ${classes.conatiner}`}>
      <Grid item></Grid>
      <Grid item>
        <Typography variant='body2' component='span' className={classes.text}>{t('language')}:</Typography>
        {
          locales.map(lang => (
            <form
              action='/api/language'
              method='POST'
              key={lang}
              style={{ display: 'inline-block' }}
            >
              <input type="hidden" name="preferredLocale" value={lang} />
              <Button
                type="submit"
                variant={lang === locale ? 'outlined' : 'text'}
                className={classes.text}
                style={{ marginLeft: '.5rem' }}
              >
                {lang.split('-')[0]}
              </Button>
            </form>
          ))
        }
      </Grid>
    </Grid>
  )
}

const useStyles = makeStyles({
  conatiner: {
    padding: '0 1rem'
  },
  text: {
    fontSize: '.75rem',
    color: "#555"
  }
})