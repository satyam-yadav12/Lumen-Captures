import React, { useCallback, useContext, useEffect, useState } from "react";
import Image from "../components/ImageCard/ImageCard";
import mockData from "../assets/photos.json";
import { GetAllImagesByUser } from "../services/userContent-Profile";
import { AuthContext } from "../context/AuthContext";

const Uploads = () => {
  const { logout } = useContext(AuthContext)
  const [imageData, setImageData] = useState([])
  useEffect(() => {
    const fetchUserUploads = (async () => {
      try {
        const response = await GetAllImagesByUser()
        console.log(response)
        setImageData(response.data)
      } catch (error) {
        if (error.response.status === 401) {
          logout()
        }
        console.log(error)
      }
    })
    fetchUserUploads()
  }, [])
  return (
    <div>
      <h1 className="mt-5 m-auto text-2xl text-center">
        Image uploaded by {"Username"}
      </h1>
      <div className="pt-5 w-[98%] m-auto">
        {imageData ? <Image images={imageData} TextValues={['Edit Image', 'Delete Image']} /> : "loading..."}

      </div>
    </div>
  );
};

export default Uploads;
