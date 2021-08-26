import { useRouter } from 'next/router';
import { Typography, Grid, Button } from '@material-ui/core';

export const SelectLang = () => {
  const { locales, locale } = useRouter()

  return (
    <Grid container justify="space-between">
      <Grid item></Grid>
      <Grid item>
        <Typography variant='body2' component='span'>Language:</Typography>
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
