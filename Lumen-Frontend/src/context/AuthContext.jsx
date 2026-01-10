import { React, createContext, useContext, useEffect, useState } from "react"
import { CheckActiveSession, LogoutFromLumen } from "../services/authApi"


export const AuthContext = createContext("")

export const AuthProvider = (({ children }) => {

    const [user, setUser] = useState("")
    const [loading, setLoading] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    useEffect(() => {
        checkSession()
    }, [])

    const checkSession = async () => {

        try {
            setLoading(true)
            const response = await CheckActiveSession()
            // console.log(response.data)
            setIsAuthenticated(true)
            setUser(response.data.username)
        } catch (error) {
            console.log(error)
            setUser("")
        } finally {
            setLoading(false)
        }
    }


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
    return (
        <AuthContext.Provider value={{ user, setUser, logout, loading, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
})