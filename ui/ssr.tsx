import { useEffect } from "react"
export { ServerStyleSheets } from '@material-ui/core/styles'

/**
 * Config to Server-side rendering
 * @see: https://material-ui.com/styles/advanced/#next-js
 */
export const useServerStyles = () => {
   useEffect(() => {
       const jsStyles = document.querySelector('#jss-server-side')

       if(jsStyles) {
           jsStyles.remove()
       }
   }, [])
}
