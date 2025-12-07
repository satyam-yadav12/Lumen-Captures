import React from "react";
import { Button } from "@mui/material";
const UpdatePassword = () => {
  return (
    <div>
      <p className="m-auto p-2 md:hidden  mt-5 font-medium">
        Update Your Password
      </p>
      <div className="flex flex-col gap-3 md:flex-row justify-center w-5/6 ml-10 md:mx-auto  mt-2">
        <input
          type="text"
          className="bg-white dark:bg-gray-100  dark:text-black dark:font-medium border border-black p-1.5 mx-3 text-black focus:outline-none rounded-sm"
        />
        <input
          type="text"
          className="bg-white dark:bg-gray-100 dark:text-black dark:font-medium border border-black p-1.5 mx-3 text-black focus:outline-none rounded-sm"
        />
        <div className="w-5/6 m-auto md:m-2 md:w-max md:h-full">
          <Button variant="contained" color="secondary">
            Change Password
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
