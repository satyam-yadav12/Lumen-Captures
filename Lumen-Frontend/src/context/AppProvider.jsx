import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from "./AuthContext"
import { ThemeProvider } from "./Themecontext"
import { AlertProvider } from "./AlertMessage"

const AppProvider = (({ children }) => {
    return <BrowserRouter>
        <AuthProvider>
            <ThemeProvider>
                <AlertProvider>
                    {children}
                </AlertProvider>
            </ThemeProvider>
        </AuthProvider>
    </BrowserRouter>
})

export default AppProvider