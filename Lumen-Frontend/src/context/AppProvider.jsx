import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from "./AuthContext"
import { ThemeProvider } from "./Themecontext"
import { AlertProvider } from "./AlertMessage"

const AppProvider = (({ children }) => {
    return <BrowserRouter>
        <AlertProvider>
            <AuthProvider>
                <ThemeProvider>

                    {children}

                </ThemeProvider>
            </AuthProvider>
        </AlertProvider>
    </BrowserRouter>
})

export default AppProvider