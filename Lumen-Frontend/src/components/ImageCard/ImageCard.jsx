import React, { useContext, useEffect, useRef, useState } from "react";

import mock_images from "../../assets/photos_extracted.json";
import ImageActionBar from "./ImageActionBar";
import ImageOverlay from "./ImageOverlay";
import ImageModal from "./ImageModal";
import ImagePlace from "./Image";
import { CircularProgress } from "@mui/material"
import { fetchCollection, removeFromSaved, saveToCollection } from "../../services/Search_misc";
import { AuthContext } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { AlertContext } from "../../context/AlertMessage";

const Image = ({ images = mock_images, TextValues = ['Report Content', 'Download'] }) => {
  const { user, logout } = useContext(AuthContext)
  const { setMessage } = useContext(AlertContext)
  const navigate = useNavigate()
  const [like, setLike] = useState([]);

  const [show, setShow] = useState(false);
  const [showUri, setShowUri] = useState("");
  //state for infinite scrolling; may need to move it from here
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [photos, setPhotos] = useState([]);
  const limit = 10;
  const observer = useRef(null);
  const lastImageRef = useRef(null);



  useEffect(() => {
    setPhotos([]);
    setPage(0);
    setHasMore(true);
  }, [images]);

  //infinite scrolling hooks and functions


  const loadMore = () => {
    setPage((prev) => prev + 1);
  };
  useEffect(() => {
    console.log(photos, "photos")
  }, [photos])

  useEffect(() => {

    const fetchImages = async () => {

      setLoading(true);
      const start = limit * page;
      const end = start + limit;

      const temp = images.slice(start, end); //crete api call

      setPhotos((prev) => [...prev, ...temp]);
      if (temp.length < limit) setHasMore(false);

      setLoading(false);
    };
    fetchImages();
  }, [page, images]);

  useEffect(() => {
    if (!hasMore || loading) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMore();
      }
    });

    if (lastImageRef.current) {
      observer.current.observe(lastImageRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect()
      }

    }
  }, [hasMore, loading, photos]);

  //infinite scroll hooks and effects


  //manage likes
  useEffect(() => {
    const fetchLikedImages = (async () => {
      console.log(user, 'userstatsu')
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
        console.log(error, "error1")
        if (error.response.status && error.response.status === 401) {

          logout()

        }

      }

    })
    fetchLikedImages()
  }, [user, photos])
  const sendLikeToLumen = (async (img_id) => {
    try {
      const response = await saveToCollection(img_id)
      console.log(response)
      setMessage(`like sent`)
    } catch (error) {
      console.log(error, "error")
      if (error.response.status && error.response.status === 401) {

        logout()
        navigate('/login')
      }


    }
  })
  const removeLikeFromLumen = (async (img_id) => {
    try {
      const response = await removeFromSaved(img_id)
      console.log(response)
      setMessage(`dislike sent`)
    } catch (error) {
      console.log(error)
      if (error.status && error.status === 401) {

        logout()
        navigate('/login')
      }
    }
  })
  const handleLike = (async (id) => {
    if (like.includes(id)) {
      removeLikeFromLumen(id)
      setLike((prev) => {
        let newArr = prev.filter((val) => val != id);

        return newArr;
      });
    } else {
      sendLikeToLumen(id)
      setLike((prev) => [...prev, id]);
    }
  });
  //manage likes
  const createModal = (state) => {
    setShow(state);
    state
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  };
  // FIXME : setLoading & loading functions are universial, make it to work like individual image

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 px-4">
      <div>
        <ImageModal id={showUri} show={show} setShow={createModal} />
      </div>
      {photos.map((data, index) => {
        return (
          <div
            key={data.photo_id || data.img_id}
            className={`group  hover:opacity-98 relative break-inside-avoid overflow-hidden rounded-xl my-4 h-max w-[90vw] sm:w-[45vw] lg:w-[30vw] `}

          >
            <ImagePlace
              data={data}
              index={index}
              createModal={createModal}
              setShowUri={setShowUri}
              lastImageRef={lastImageRef}
              photos={photos}
            />



            {/*  image overlay */}

            <ImageOverlay
              createModal={createModal}
              setShowUri={setShowUri}
              data={data}
              handleLike={handleLike}
              like={like}
              TextValues={TextValues}
            />

            <ImageActionBar data={data} like={like} handleLike={handleLike} TextValues={TextValues} />
          </div>
        );
      })}
      {loading && <CircularProgress />}
      {!hasMore && <p>No more images to show</p>}
    </div>
  );
};

export default Image;
