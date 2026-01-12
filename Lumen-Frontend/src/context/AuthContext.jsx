import { React, createContext, useContext, useEffect, useState } from "react"
import { CheckActiveSession, LogoutFromLumen } from "../services/authApi"
import { AlertContext } from "./AlertMessage"


export const AuthContext = createContext("")

export const AuthProvider = (({ children }) => {
    const { setMessage } = useContext(AlertContext)
    const [user, setUser] = useState("")
    const [loading, setLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        checkSession()
    }, [])

    async function logout() {

        if (user) {
            try {
                const response = await LogoutFromLumen()
                console.log(response)

            } catch (error) {
                console.log(error)
                if (error.response?.error == 401) {
                    setUser("")
                }
            }
        }
        setUser("")


    }
    const checkSession = async () => {

        try {
            setLoading(true)
            const response = await CheckActiveSession()
            // console.log(response.data)
            setIsAuthenticated(true)
            setUser(response.data.username)
        } catch (error) {
            if (error.response?.status === 401) {
                logout()

            }

        } finally {
            setLoading(false)
        }
    }



    return (
        <AuthContext.Provider value={{ user, setUser, logout, loading, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
})