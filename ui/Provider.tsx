import { StylesProvider, ThemeProvider } from "@material-ui/core"
import { theme } from "./theme"

export const UIProvider: React.FC = ({children}) => {
    return (
        <StylesProvider injectFirst>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </StylesProvider>
    )
}