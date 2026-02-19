import { useContext, useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";
import { AlertContext } from "../../context/AlertMessage";
import { AuthContext } from "../../context/AuthContext";
import useColumnCount from "../../hooks/useColumnCount";
import {
  fetchCollection,
  removeFromSaved,
  saveToCollection,
} from "../../services/Search_misc";
import SkeletonLoader from "../SkeletonLoader";
import ImagePlace from "./Image";
import ImageActionBar from "./ImageActionBar";
import ImageModal from "./ImageModal";
import ImageOverlay from "./ImageOverlay";

const Image = ({
  images,
  TextValues = ["Report Content", "Download"],
  hasMore,
  loading,
  page,
  setPage,
}) => {
  const colCount = useColumnCount();
  const { user, logout } = useContext(AuthContext);
  const { setMessage } = useContext(AlertContext);
  const navigate = useNavigate();
  const [like, setLike] = useState([]);

  const [show, setShow] = useState(false);
  const [showUri, setShowUri] = useState("");
  //state for infinite scrolling; may need to move it from here

  const [spreadImages, setSpreadImages] = useState([]);

  const observer = useRef(null);
  const lastImageRef = useRef(null);

  //infinite scrolling hooks and functions

  const loadMore = () => {
    setPage((p) => p + 1);
  };

  useEffect(() => {
    if (!hasMore) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        loadMore();
      }
    });

    if (lastImageRef.current) {
      observer.current.observe(lastImageRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [loading, hasMore]);

  //infinite scroll hooks and effects

  const buildColumns = (images, colCount) => {
    const temp = [];

    if (colCount) {
      if (colCount === 3) {
        temp.push([], [], []);
      } else if (colCount === 2) {
        temp.push([], []);
      } else {
        temp.push([]);
      }
    }
    let measure = new Array(temp.length).fill(0);
    const getMinIndex = () => {
      if (measure.length == 1) {
        return 0;
      }
      const min = Math.min(...measure);
      let idx = 0;
      measure.forEach((val, index) => {
        if (val == min) {
          idx = index;
        }
      });
      return idx;
    };
    images.forEach((element) => {
      const idx = getMinIndex();
      temp[idx].push(element);
      measure[idx] += 400 * (element.photo_height / element.photo_width);
    });

    setSpreadImages(temp);

    return;
  };
  useEffect(() => {
    buildColumns(images, colCount);
  }, [images, colCount]);

  //manage likes
  useEffect(() => {
    const fetchLikedImages = async () => {
      // console.log(user, 'userstatsu')
      if (!user) {
        setLike([]);
        return;
      }

      try {
        const response = await fetchCollection();
        // console.log(response, 'likes')
        let tempLikes = [];
        response["collection"].map((val, index) => {
          tempLikes.push(val.img_id);
        });

        setLike(tempLikes);
      } catch (error) {
        // console.log(error, "error1")
        if (error.response.status && error.response.status === 401) {
          logout();
        }
      }
    };
    fetchLikedImages();
  }, [user, images]);
  const sendLikeToLumen = async (img_id) => {
    try {
      const response = await saveToCollection(img_id);
      // console.log(response)
      setMessage(`like sent`);
    } catch (error) {
      // console.log(error, "error")
      if (error.response.status && error.response.status === 401) {
        logout();
        navigate("/login");
      }
    }
  };
  const removeLikeFromLumen = async (img_id) => {
    try {
      const response = await removeFromSaved(img_id);
      // console.log(response)
      setMessage(`dislike sent`);
    } catch (error) {
      // console.log(error)
      if (error.status && error.status === 401) {
        logout();
        navigate("/login");
      }
    }
  };
  const handleLike = async (id) => {
    if (like.includes(id)) {
      removeLikeFromLumen(id);
      setLike((prev) => {
        let newArr = prev.filter((val) => val != id);

        return newArr;
      });
    } else {
      sendLikeToLumen(id);
      setLike((prev) => [...prev, id]);
    }
  };
  //manage likes
  const createModal = (state) => {
    setShow(state);
    state
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  };

  return (
    <div>
      <div>
        <ImageModal photo={showUri} show={show} createModal={createModal} />
        {/* change names and prop names */}
      </div>
      <div className="flex flex-row gap-4 px-4">
        {spreadImages.map((val, index) => {
          return (
            <div key={index} className="flex flex-col">
              {val.map((data, index) => {
                return (
                  <div
                    key={data.img_id}
                    className={`group  hover:opacity-98 relative break-inside-avoid overflow-hidden rounded-xl my-4 h-max w-[90vw] sm:w-[45vw] lg:w-[30vw] `}
                  >
                    <ImagePlace
                      data={data}
                      index={index}
                      createModal={createModal}
                      setShowUri={setShowUri}
                      lastImageRef={lastImageRef}
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

                    <ImageActionBar
                      data={data}
                      like={like}
                      handleLike={handleLike}
                      TextValues={TextValues}
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <div className="h-max flex flex-row justify-center" ref={lastImageRef}>
        {hasMore ? <SkeletonLoader /> : "no more images to show"}
      </div>
    </div>
  );
};

export default Image;
