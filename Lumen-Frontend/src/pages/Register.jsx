import { Button } from "@mui/material";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RegisterWithLumen } from "../services/authApi";
import { Notification } from "../components/Notification";
import { AlertContext } from "../context/AlertMessage";
import { AuthContext } from "../context/AuthContext";


const Register = () => {
  const navigate = useNavigate()
  const { message, setMessage } = useContext(AlertContext)
  const [records, setRecords] = useState({ Full_name: "", Email: "", Password: "", ConfirmPassword: "", City: "", Agree: false })
  const [ProfilePicture, setProfilePicture] = useState(null)
  const [disableSubmit, setDisableSubmit] = useState(false)


  const handleRegister = (async (e) => {
    e.preventDefault()
    setDisableSubmit(() => true)
    // const payload = { ...records, "Profile_picture": ProfilePicture, "Agree": true }//need to fix

    const formData = new FormData()

    for (const key in records) {
      formData.append(key, records[key]);
    }
    formData.append("Profile_picture", ProfilePicture)

    try {
      const response = await RegisterWithLumen(formData)
      setMessage("Registration success")
      console.log(response)
      setDisableSubmit(() => false)
      navigate("/login")
    } catch (error) {
      setMessage("registration fail")
      console.log(error)

    }
    setDisableSubmit(() => false)
  });

  const handleFormChange = ((e) => {

    setRecords((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  })

  const handleFileChange = ((e) => {
    e.target.files[0] ? setProfilePicture(e.target.files[0]) : setProfilePicture(null)
  })
  return (<>

    <div className="relative w-full overflow-hidden">
      <div className=" rounded-2xl flex flex-row w-screen h-[140vh] max-h-[150vh] md:h-[120vh] overflow-hidden">
        <div className="bg-white dark:bg-gray-300 w-full"></div>
        <div className="bg-[#00A2CA] dark:bg-[#222224] w-full"></div>
      </div>
      <div className="top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 absolute grid grid-cols-1 md:grid-cols-4 text-left gap-6 w-screen">
        <div className="hidden mr-4 md:block col-start-1 bg-[url(/theme-3.svg.png)] bg-no-repeat bg-center bg-contain mx-4 px-4 w-5/6 "></div>
        {/* Registration form */}
        <div className="w-full m-auto p-10 dark:bg-[#222224] bg-white h-full border border-white shadow-black drop-shadow-2xl  rounded-3xl col-start-1 md:col-span-2 md:col-start-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <h1 className="text-left font-bold text-2xl my-3 mt-1">Register</h1>
          <div className="col-start-1 row-start-2 md:col-start-1 md:row-start-2 text-left">
            <label htmlFor="password" className="text-left">
              <span className="py-2 my-2">Enter Full Name</span>
              <input
                name="Full_name"
                value={records.Full_name}
                onChange={(e) => handleFormChange(e)}
                type="text"
                className="rounded-sm w-full m-auto border p-2 mb-2  border-gray-200 outline-1 outline-[#00A2CA] focus:outline-[#00A2CA]"
                placeholder="Enter your Password"
              />
            </label>
          </div>
          <div className="col-start-1 row-start-3 md:col-start-2 md:row-start-2 text-left">
            <label htmlFor="password" className="text-left">
              <span className="py-2 my-2">Enter Email</span>
              <input
                name="Email"
                value={records.Email}
                onChange={(e) => handleFormChange(e)}
                type="text"
                className="rounded-sm w-full m-auto border p-2 mb-2  border-gray-200 outline-1 outline-[#00A2CA] focus:outline-[#00A2CA]"
                placeholder="Enter your Password"
              />
            </label>
          </div>
          <div className="col-start-1 row-start-4 md:col-start-1 md:row-start-3 text-left">
            <label htmlFor="password" className="text-left">
              <span className="py-2 my-2">Enter Password</span>
              <input
                name="Password"
                value={records.Password}
                onChange={(e) => handleFormChange(e)}
                type="text"
                className="rounded-sm w-full m-auto border p-2 mb-2  border-gray-200 outline-1 outline-[#00A2CA] focus:outline-[#00A2CA]"
                placeholder="Enter your Password"
              />
            </label>
          </div>
          <div className="col-start-1 row-start-5 md:col-start-2 md:row-start-3 text-left">
            <label htmlFor="Cpassword" className="text-left">
              <span className="py-2 my-2">Confirm Password</span>
              <input
                name="ConfirmPassword"
                value={records.ConfirmPassword}
                onChange={(e) => handleFormChange(e)}
                type="text"
                className="rounded-sm w-full m-auto border p-2 mb-2  border-gray-200 outline-1 outline-[#00A2CA] focus:outline-[#00A2CA]"
                placeholder="Enter your Password"
              />
            </label>
          </div>
          <div className="col-start-1 row-start-6 md:col-start-1 md:row-start-4 text-left">
            <label htmlFor="password" className="text-left">
              <span className="py-2 my-2">Enter City</span>
              <input
                name="City"
                value={records.City}
                onChange={(e) => handleFormChange(e)}
                type="text"
                className="rounded-sm w-full m-auto border p-2 mb-2  border-gray-200 outline-1 dark:hover:outline-white outline-[#00A2CA] focus:outline-[#00A2CA]"
                placeholder="Enter your Password"
              />
            </label>
          </div>
          <div className="col-start-1 row-start-7 md:col-start-2 md:row-start-4 text-left">
            <label htmlFor="password" className="text-left">
              <span className="py-2 my-2">Upload Profile Picture</span>
              <input
                name="ProfilePicture"

                onChange={(e) => handleFileChange(e)}
                type="file"
                className="rounded-sm w-full m-auto border p-2 mb-2  border-gray-200 outline-1 outline-[#00A2CA] dark:hover:outline-white hover:outline-[#00A2CA] focus:outline-[#00A2CA]"
                placeholder="Enter your Password"
              />
            </label>
          </div>
          <div className="row-start-8 md:col-span-2 md:row-start-5 ">
            <input type="checkbox" name="Agree" value={records.Agree} onChange={(e) => setRecords((prev) => ({ ...prev, [e.target.name]: !prev.Agree }))} /><span>Agree with Terms&Condition</span>
          </div>
          <div className="flex flex-col justify-center md:col-span-2 w-full p-1 m-auto text-centerrow-start-9 md:row-start-6 bg-[#00A2CA] dark:bg-white dark:text-black  rounded-sm my-2 text-white font-semibold">
            <Button onClick={e => handleRegister(e)} color="inherit" disable={disableSubmit}>
              Register
            </Button>
          </div>
          <p className="font-light text-center md:col-span-2 row-start-10 md:row-start-7 ">
            Already registered{" "}
            <Link to="/login">
              <span className="text-blue-500 font-normal ">Login</span>
            </Link>{" "}
            here
          </p>
        </div>
        <div className=" hidden md:block col-start-4 bg-[url(/common.svg.png)] bg-no-repeat bg-center bg-contain mx-4 px-4 w-full "></div>
      </div>
    </div>
  </>
  );
};

export default Register;
