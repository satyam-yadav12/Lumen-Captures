import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import { CheckActiveSession } from "../services/authApi";
export default function PrivateRoute({ children }) {
    const { loading, isAuthenticated } = useContext(AuthContext);
    // const [loading, setLoading] = useState(false)
    // const [isAuthenticated, setIsAuthenticated] = useState(false)
    // useEffect(() => {
    //     checkSession()
    // }, [])

    // const checkSession = async () => {

    //     try {
    //         setLoading(true)
    //         const response = await CheckActiveSession()
    //         // console.log(response.data)
    //         setIsAuthenticated(true)
    //         setUser(response.data.username)
    //     } catch (error) {
    //         console.log(error)
    //         setUser("")
    //     } finally {
    //         setLoading(false)
    //     }
    // }

    if (loading) {
        return <div>Checking session...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
}
