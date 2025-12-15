import { createContext, useState } from "react";

export const AlertContext = createContext("")

export const AlertProvider = (({ children }) => {
    const [message, setMessage] = useState("")

    return <AlertContext.Provider value={{ message, setMessage }}>{children}</AlertContext.Provider>
})