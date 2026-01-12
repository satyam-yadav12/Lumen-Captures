import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import { CheckActiveSession } from "../services/authApi";
import { AlertContext } from "../context/AlertMessage";
export default function PrivateRoute({ children }) {

    const checkSession = async () => {
        let result = false
        try {
            setLoading(true)
            const response = await CheckActiveSession()
            // console.log(response.data)
            result = true
            setUser(response.data.username)
        } catch (error) {
            console.log(error)
            setUser("")
            setMessage("user not found login again")
            result = false
        } finally {
            setLoading(false)
        }
        return result
    }
    const { setUser } = useContext(AuthContext);
    const { setMessage } = useContext(AlertContext)
    const [loading, setLoading] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(checkSession)




    return isAuthenticated ? children : <Navigate to="/login" replace />;
}
