import React, { useState, useContext, useEffect } from "react";
import Image from "../components/ImageCard/ImageCard";
import mockData from "../assets/photos.json";
import { useNavigate } from "react-router-dom";
import { fetchAllImages, fetchCollection } from "../services/Search_misc";
import { AuthContext } from "../context/AuthContext";
import { AlertContext } from "../context/AlertMessage";

const Collections = () => {
  const { user, logout } = useContext(AuthContext)
  const { setMessage } = useContext(AlertContext)
  const navigate = useNavigate()

  const [likedPhotos, setLikedPhotos] = useState([])



  useEffect(() => {
    const fetchLikedImages = (async () => {
      if (!user) {
        return
      }
      try {

        const response = await fetchCollection()
        console.log(response, 'likes')
        setLikedPhotos(response.collection)
        setMessage('liked image was fetched')
      } catch (error) {
        if (error.data.status && error.data.status === 401) {

          logout()
          navigate('/login')

        }
      }
    })

    fetchLikedImages()
  }, [user])


  return (
    <div>
      <div className="pt-5 w-[98%] m-auto">
        {likedPhotos ? <Image images={likedPhotos} /> : "loading..."}

      </div>
    </div>
  );
};

export default Collections;
