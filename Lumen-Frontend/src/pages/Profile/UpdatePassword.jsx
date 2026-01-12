import React, { useContext, useState } from "react";
import { Button } from "@mui/material";
import { updatePassword } from "../../services/userContent-Profile";
import { AlertContext } from "../../context/AlertMessage";

const UpdatePassword = () => {
  const { setMessage } = useContext(AlertContext)
  const [passwords, setPasswords] = useState({ Password: "", ConfirmPassword: "" })

  const updateUserPassword = (async () => {
    // console.log(passwords)
    if (!(passwords.Password && passwords.ConfirmPassword)) {
      setMessage("Password and Confirm Password fields must not be empty")
      return
    } else if (passwords.Password != passwords.ConfirmPassword) {
      setMessage("Password and Confirm Password fields must match")
      return
    }
    try {
      const response = await updatePassword(passwords)
      // console.log(response)
      setMessage(response.msg)

      setTimeout(() => {
        window.location.reload()
      }, 300);

    }
    catch (error) {
      // console.log(error)
      setMessage("request failed")
    }
  })
  return (
    <div>
      <p className="m-auto p-2 md:hidden  mt-5 font-medium">
        Update Your Password
      </p>
      <div className="flex flex-col gap-3 md:flex-row justify-center w-5/6 ml-10 md:mx-auto  mt-2">
        <input
          type="text"
          value={passwords.Password}
          onChange={(e) => setPasswords((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
          name="Password"
          className="bg-white dark:bg-gray-100  dark:text-black dark:font-medium border border-black p-1.5 mx-3 text-black focus:outline-none rounded-sm"
        />
        <input
          type="text"
          value={passwords.ConfirmPassword}
          onChange={(e) => setPasswords((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
          name="ConfirmPassword"
          className="bg-white dark:bg-gray-100 dark:text-black dark:font-medium border border-black p-1.5 mx-3 text-black focus:outline-none rounded-sm"
        />
        <div className="w-5/6 m-auto md:m-2 md:w-max md:h-full">
          <Button variant="contained" color="secondary" onClick={updateUserPassword}>
            Change Password
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
