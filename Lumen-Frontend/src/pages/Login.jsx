import { Button, CircularProgress } from "@mui/material";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginWithLumen } from "../services/authApi";
import { AuthContext } from "../context/AuthContext";
import { AlertContext } from "../context/AlertMessage";
import GoogleLoginButton from "../components/googleLoginButton";
// import { AlertContext } from "../context/AlertMessage";

const Login = () => {
  const navigate = useNavigate()

  const { user, setUser, logout } = useContext(AuthContext)
  const { setMessage } = useContext(AlertContext)
  const [formData, setFormData] = useState({ Email: "", Password: "" })
  const [disableSubmit, setDisableSubmit] = useState(false)

  const handleLogin = (async () => {
    setDisableSubmit(() => true)
    user && logout();
    try {
      if (formData['Email'] != "" && formData['Password'] != "") {
        const result = await LoginWithLumen(formData)
        // console.log(result['user name'])
        setUser(result['user name'])
        setMessage(`Welcome ${result['user name']}!`)
        setDisableSubmit(() => false)
        navigate('/')
      }
    } catch (error) {
      // console.log(error)
      setMessage(error.response.data['error'])
    }

    setFormData({ Email: "", Password: "" })
    setDisableSubmit(() => false)

  });
  return (
    <>
      {/* <Notification message={message} setMessage={changeNotification} /> */}
      <div className="relative w-full  overflow-hidden">
        <div className="flex flex-row w-screen h-screen overflow-hidden">
          <div className="bg-white dark:bg-gray-300 w-full"></div>
          <div className="bg-[#00A2CA] dark:bg-[#3d3d56] w-full"></div>
        </div>
        <div className="top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 absolute grid grid-cols-1 md:grid-cols-4 text-left gap-6 w-screen">
          <div className="hidden md:block col-start-1 bg-[url(/theme-3.svg.png)] bg-no-repeat bg-center bg-contain mx-4 px-4 w-full "></div>
          {/* Login form */}
          <div className="lg:w-5/6 m-auto p-10 bg-white dark:bg-[#222224] h-full border border-white shadow-black drop-shadow-2xl  rounded-3xl col-start-1 md:col-span-2 md:col-start-2 flex flex-col justify-start ">
            <h1 className="text-left font-bold text-2xl my-3 mt-1 ">Login</h1>
            <div className="text-left ">
              <label htmlFor="username" className="text-left my-2 py-2">
                <span className="py-2 my-2 ">Enter Email</span>
                <input
                  type="text"
                  className="rounded-sm w-full m-auto border p-2 mb-2 border-gray-200 outline-1 dark:hover:outline-whitehover:outline-[#00A2CA] focus:outline-[#00A2CA]"
                  placeholder="Enter a Valid Email"
                  value={formData['Email']}
                  onChange={(e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                  name="Email"

                />
              </label>
            </div>
            <div className="text-left my-2 py-2">
              <label htmlFor="password" className="text-left">
                <span className="py-2 my-2 ">Enter Password</span>
                <input
                  type="text"
                  className="rounded-sm w-full m-auto border p-2 mb-2  border-gray-200 outline-1 dark:hover:outline-white hover:outline-[#00A2CA] focus:outline-[#00A2CA]"
                  placeholder="Enter your Password"
                  value={formData['Password']}
                  onChange={(e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                  name="Password"
                />
              </label>
            </div>
            <div className="flex flex-col justify-center bg-[#00A2CA] dark:bg-white  dark:text-black text-white rounded-sm my-2  font-semibold">
              <Button onClick={handleLogin} color="inherit" disabled={disableSubmit}>
                Login{disableSubmit ? <CircularProgress size={20} /> : ""}
              </Button>
            </div>
            <p className="font-light text-center ">
              Not registered yet?{" "}
              <Link to="/register">
                <span className="text-blue-500 font-normal ">Register</span>
              </Link>{" "}
              here
            </p>
            <div className=" flex flex-row justify-center items-center m-2 mt-4">
              <GoogleLoginButton />
            </div>

          </div>
          <div className=" hidden md:block col-start-4 bg-[url(/common.svg.png)] bg-no-repeat bg-center bg-cover ml-auto px-4 w-full "></div>
        </div>
      </div>
    </>
  );
};

export default Login;
