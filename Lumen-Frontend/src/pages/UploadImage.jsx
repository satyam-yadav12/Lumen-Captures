import { Button } from "@mui/material";
import React, { useState } from "react";

const UploadImage = () => {
  const [image, setImage] = useState("");

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) setImage("");
    setImage(URL.createObjectURL(file));
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5  mt-5 overflow-hidden m-auto">
      <div className="lg:ml-auto my-auto col-start-1 row-start-1">
        {image ? (
          <img
            src={image}
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
            id="title"
          />
          <label htmlFor="description">Enter Description</label>
          <textarea
            name="description"
            id="description"
            className="  border border-black p-4  my-1 block dark:border-white dark:bg-gray-100 dark:text-black"
          ></textarea>

          <label htmlFor="Tag">Enter tags separated by space</label>
          <input
            className="border border-black p-4 my-1 block dark:bg-gray-100 dark:border-white dark:text-black"
            type="text"
            name="tag"
            id="Tag"
          />
        </div>
      </div>
      <div className="m-auto my-4 col-span-2">
        <Button variant="contained">Upload Image</Button>
      </div>
    </div>
  );
};

export default UploadImage;
