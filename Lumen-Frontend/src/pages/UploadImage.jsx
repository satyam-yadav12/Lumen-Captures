import { Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { UploadImageToLumen } from "../services/userContent-Profile";
import { AlertContext } from "../context/AlertMessage";

const UploadImage = () => {
  const { setMessage } = useContext(AlertContext)
  const [imagePreview, setImagePreview] = useState("");
  const { user, logout } = useContext(AuthContext)
  const [imageDetails, setImageDetails] = useState({ title: "", description: "", tags: [] })
  const [payloadImage, setPayloadImage] = useState(null)
  const [disableSubmit, setDisableSubmit] = useState(false)

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setImagePreview("");
      setPayloadImage(null)
    };
    setImagePreview(URL.createObjectURL(file));
    setPayloadImage(e.target.files[0])
  };

  const uploadImageDetails = (async (payload) => {
    let message;
    try {
      const response = await UploadImageToLumen(payload)
      message = `Image was uploaded`

      // setMessage("image was uploaded")
    } catch (error) {
      console.log(error)
      message = error['message']
      if (error.response.status === 401) {
        logout()
      }


    }
    setImageDetails({ title: "", description: "", tags: [] })
    return message
  })
  const handleSubmit = (async (e) => {
    e.preventDefault()
    setDisableSubmit(() => true)
    let payload = new FormData()
    for (const key in imageDetails) {
      if (key != "tags") {
        payload.append(key, imageDetails[`${key}`])
      } else {

        payload.append("tags", JSON.stringify(imageDetails['tags']))
      }

    }
    payload.append('picture', payloadImage)
    console.log(payload)
    const msg = await uploadImageDetails(payload)
    console.log(msg, 'msg')
    setMessage(msg)

    setDisableSubmit(() => false)
    return
  })

  const handleChange = ((e) => {
    if (e.target.name != "tags") {
      setImageDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }
    else {
      let text = e.target.value
      let tagContainer = text.split(" ")

      setImageDetails((prev) => ({ ...prev, [e.target.name]: tagContainer }))
    }

  })
  useEffect(() => {
    console.log(imageDetails, 'imageDetails')
  }, [imageDetails])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5  mt-5 overflow-hidden m-auto">
      <div className="lg:ml-auto my-auto col-start-1 row-start-1">
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="preview"
            className="h-full max-h-[430px] w-full  object-contain bg-gray-100"
          />
        ) : (
          <div className="h-[430px] w-full m-2 ml-2.5 md:w-[350px] text-center  align-middle flex flex-col items-center justify-center bg-gray-300 border border-black dark:border-white">
            <div className="m-auto dark:text-black">
              <img
                src="https://cdn-icons-png.flaticon.com/128/696/696755.png"
                alt="No Image"
                className="h-10 w-10 m-auto"
              />
              No Image Selected
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col justify-start md:mr-auto md:m-2 text-left lg:col-start-2 row-start-2 md:row-start-1 m-auto">
        <p>select a file to upload</p>
        <input
          className="border border-black p-4  my-1 block dark:text-black dark:border-white dark:bg-gray-100"
          type="file"
          name="file"
          id="file"
          onChange={handleFile}
          accept="image/*"
        />
        <div className="flex flex-col gap-3">
          <label htmlFor="title">Enter Title </label>
          <input
            className="border border-black p-4 my-1 block dark:bg-gray-100 dark:border-white dark:text-black "
            type="text"
            name="title"
            onChange={handleChange}
            value={imageDetails.title}
            id="title"
          />
          <label htmlFor="description">Enter Description</label>
          <textarea
            name="description"
            id="description"
            onChange={handleChange}
            value={imageDetails.description}
            className="  border border-black p-4  my-1 block dark:border-white dark:bg-gray-100 dark:text-black"
          ></textarea>

          <label htmlFor="Tag">Enter tags separated by space</label>
          <input
            className="border border-black p-4 my-1 block dark:bg-gray-100 dark:border-white dark:text-black"
            type="text"
            name="tags"
            value={imageDetails.tags.join(" ")}
            onChange={handleChange}
            id="Tag"
          />
        </div>
      </div>
      <div className="m-auto my-4 col-span-2">
        <Button variant="contained" disable={disableSubmit} onClick={(e) => handleSubmit(e)}>Upload Image</Button>
      </div>
    </div>
  );
};

export default UploadImage;
