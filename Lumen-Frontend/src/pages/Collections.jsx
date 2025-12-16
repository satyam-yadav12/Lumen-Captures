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
  const [like, setLike] = useState([]);
  const [likedPhotos, setLikedPhotos] = useState([])

  useEffect(() => {


    const fetchLikedImages = (async () => {
      console.log(user, 'userstatus')
      if (!user) {
        setLike([])
        return;
      }

      try {
        const response = await fetchCollection()
        console.log(response, 'likes')
        let tempLikes = []
        response['collection'].map((val, index) => {
          tempLikes.push(val.img_id)
        })
        console.log(tempLikes, 'temp')
        setLike(tempLikes)
      } catch (error) {
        if (error.response.status && error.response.status === 401) {

          logout()
          navigate('/login')
        }
      }

    })
    fetchLikedImages()
  }, [user])

  useEffect(() => {
    const filterLIkedImages = (async () => {
      try {
        const response = await fetchAllImages()
        let imageData = response['result'].filter((val) => like.includes(val.img_id))

        setLikedPhotos(imageData)
        setMessage('liked image was fetched')
      } catch (error) {
        if (error.data.status && error.data.status === 401) {

          logout()

        }
      }
    })

    filterLIkedImages()
  }, [like])


  return (
    <div>
      <div className="pt-5 w-[98%] m-auto">
        {likedPhotos ? <Image images={likedPhotos} /> : "loading..."}

      </div>
    </div>
  );
};

export default Collections;
