import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext';
import { AlertContext } from '../context/AlertMessage';

const GoogleLoginButton = () => {
    const { user } = useContext(AuthContext)
    const { setMessage } = useContext(AlertContext)
    const loginWithGoogle = (async () => {
        if (user) {
            setMessage("already logged in with an account")
            return
        }
        let message;
        try {
            window.location.href = "http://localhost:5000/google/login";
            message = "Redirecting to google login"
        }
        catch (error) {
            console.log(error)
            message = 'login failed'
        }
        finally {
            setMessage(message)
        }
    })


    return (
        <div className=" bg-white text-black flex flex-row justify-center items-center p-1 px-3 ml-1 text-center cursor-pointer h-max md:h-15 border-black border rounded-lg w-max " onClick={loginWithGoogle}><img src="https://cdn-icons-png.flaticon.com/128/300/300221.png" className="h-13 mr-3 p-3 px-0.5 inline " />Continue with Google</div>
    )
}

export default GoogleLoginButton