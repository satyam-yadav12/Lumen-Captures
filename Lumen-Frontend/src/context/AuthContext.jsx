import { React, createContext, useContext, useEffect, useState } from "react"
import { CheckActiveSession, LogoutFromLumen } from "../services/authApi"
import { AlertContext } from "./AlertMessage"

export const AuthContext = createContext("")

export const AuthProvider = (({ children }) => {

    const [user, setUser] = useState("")
    const [isAuthChecked, setIsAuthChecked] = useState(false)

    useEffect(() => {


        checkSession()


    }, [])

    const checkSession = async () => {
        try {
            const response = await CheckActiveSession()
            console.log(response.data)

            setUser(response.data.username)
        } catch (error) {
            console.log(error)
            setUser("")
        } finally {
            setIsAuthChecked(true)
        }
    }


    async function logout() {
        if (user) {
            try {
                const response = await LogoutFromLumen()
                console.log(response)

            } catch (error) {
                console.log(error)
            }
        }
        setUser("")
    }
    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    )
})