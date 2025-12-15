import { React, createContext, useEffect, useState } from "react"
import { CheckActiveSession, LogoutFromLumen } from "../services/authApi"

export const AuthContext = createContext("")

export const AuthProvider = (({ children }) => {
    const [user, setUser] = useState("")



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