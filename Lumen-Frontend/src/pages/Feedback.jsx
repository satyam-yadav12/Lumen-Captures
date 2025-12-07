import { Rating, Button } from "@mui/material";
import React from "react";

const Feedback = () => {
  return (
    <div>
      <div className="w-[90%] m-auto shadow-md shadow-gray-500 rounded-3xl p-3  my-5">
        {" "}
        <div className="h-15 my-5 text-black dark:text-white">
          <Rating name="rating" size="large" defaultValue={0} />
        </div>
        <div className=" w-full md:w-5/6 m-auto flex flex-col justify-start items-start gap-3">
          <div className="gap-2  w-full md:w-5/6 flex flex-col md:flex-row justify-start items-center ">
            <label
              htmlFor="title"
              className="text-left mr-auto w-full  md:w-1/4 mx-0 md:mx-4"
            >
              Enter Name{" "}
            </label>
            <input
              className=" w-full md:w-5/6 mx-4 border border-black p-4 my-1  dark:bg-gray-200 dark:border-white dark:text-black "
              type="text"
              name="title"
              id="title"
            />
          </div>
          <div className="gap-2  w-full md:w-5/6 flex flex-col md:flex-row justify-start items-center ">
            <label
              className="text-left mr-auto w-full  md:w-1/4 mx-0 md:mx-4"
              htmlFor="title"
            >
              Enter Email{" "}
            </label>
            <input
              className="  w-full md:w-5/6 border mx-4 border-black p-4 my-1  dark:bg-gray-200 dark:border-white dark:text-black "
              type="text"
              name="email"
              id="email"
            />
          </div>

          <div className="gap-2  w-full md:w-5/6 flex flex-col md:flex-row justify-start items-center ">
            <label
              className="text-left mr-auto w-full  md:w-1/4 mx-0 md:mx-4"
              htmlFor="description"
            >
              Enter Title
            </label>
            <input
              className=" w-full md:w-5/6 mx-4 border border-black p-4 my-1  dark:bg-gray-200 dark:border-white dark:text-black"
              type="text"
              name="tag"
              id="Tag"
            />
          </div>
          <div className="gap-2  w-full md:w-5/6 flex flex-col md:flex-row justify-start items-center ">
            <label
              className="text-left mr-auto w-full  md:w-1/4 mx-0 md:mx-4"
              htmlFor="Tag"
            >
              Enter Description
            </label>
            <textarea
              name="description"
              id="description"
              className=" w-full md:w-5/6  h-25 mx-4  border border-black p-4  my-1  dark:border-white dark:bg-gray-200 dark:text-black"
            ></textarea>
          </div>

          <div className=" my-4 col-span-2 m-auto">
            <Button variant="contained">Send Feedback</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
