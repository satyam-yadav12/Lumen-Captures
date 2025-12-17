import { Rating, Button } from "@mui/material";
import React, { useContext, useState } from "react";
import { AlertContext } from "../context/AlertMessage";
import { postFeedback } from "../services/Search_misc"

const Feedback = () => {
  const { setMessage } = useContext(AlertContext)
  const [formData, setFormData] = useState({ Name: "", Title: "", Email: "", Description: "" })

  const sendFeedback = (async () => {
    const test = { Name: "", Title: "", Email: "", Description: "" }
    if (!(formData.Name && formData.Description && formData.Email && formData.Title)) {
      setMessage("field must not be empty")
      return
    }
    try {
      const response = await postFeedback(formData)
      console.log(response)
      setMessage('feedback sent')

    } catch (error) {
      console.log(error)
      setMessage("request failed")
    }
  })

  const handleChange = ((e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  })
  return (
    <div>
      <div className="w-[90%] m-auto shadow-md shadow-gray-500 rounded-3xl p-3  my-5">
        {" "}
        <div className="h-15 my-5 text-black dark:text-white">
          <Rating
            name="rating"
            size="large"
            defaultValue={0}
            sx={{
              "& .MuiRating-iconEmpty": {
                color: "lightgray", // gray-200 outline
              },
            }}
          />
        </div>
        <div className=" w-full md:w-5/6 m-auto flex flex-col justify-start items-start gap-3">
          <div className="gap-2  w-full md:w-5/6 flex flex-col md:flex-row justify-start items-center ">
            <label
              htmlFor="Name"
              className="text-left mr-auto w-full  md:w-1/4 mx-0 md:mx-4"
            >
              Enter Name{" "}
            </label>
            <input
              className=" w-full md:w-5/6 mx-4 border border-black p-4 my-1  dark:bg-gray-100 dark:border-white dark:text-black "
              type="text"
              name="Name"
              value={formData.Name}
              onChange={(e) => handleChange(e)}

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
              className="  w-full md:w-5/6 border mx-4 border-black p-4 my-1  dark:bg-gray-100 dark:border-white dark:text-black "
              type="text"
              name="Email"
              value={formData.Email}
              onChange={(e) => handleChange(e)}
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
              className=" w-full md:w-5/6 mx-4 border border-black p-4 my-1  dark:bg-gray-100 dark:border-white dark:text-black"
              type="text"
              name="Title"
              value={formData.Title}
              onChange={(e) => handleChange(e)}
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
              name="Description"
              id="description"
              value={formData.Description}
              onChange={(e) => handleChange(e)}
              className=" w-full md:w-5/6  h-25 mx-4  border border-black p-4  my-1  dark:border-white dark:bg-gray-100 dark:text-black"
            ></textarea>
          </div>

          <div className=" my-4 col-span-2 m-auto">
            <Button variant="contained" onClick={sendFeedback}>Send Feedback</Button>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Feedback;
