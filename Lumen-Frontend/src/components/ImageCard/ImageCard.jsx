import React, { useState } from "react";

import mock_images from "../../assets/photos.json";
import ImageActionBar from "./ImageActionBar";
import ImageOverlay from "./ImageOverlay";
import ImageModal from "./ImageModal";

const Image = ({ images = mock_images }) => {
  const [like, setLike] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [show, setShow] = useState(false);
  const [showUri, setShowUri] = useState("");

  const handleLike = (id) => {
    if (like.includes(id)) {
      setLike((prev) => {
        let newArr = prev.filter((val) => val != id);
        return newArr;
      });
    } else {
      setLike((prev) => [...prev, id]);
    }
  };

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
      {images.map((data, index) => {
        return (
          <div
            key={index}
            className="group hover:opacity-98 relative break-inside-avoid overflow-hidden rounded-xl my-4 w-[90vw] sm:w-[45vw] lg:w-[30vw]"
          >
            <img
              src={data.photo_image_url}
              alt="img"
              id={data.photo_id}
              loading="lazy"
              className={` object-cover m-auto rounded-xl w-full transition-opacity duration-500 ${
                loaded ? "opacity-100" : "opacity-0"
              } aspect-[${data.photo_width}/${data.photo_height}]`}
              onClick={() => {
                createModal(true);
                setShowUri(data.photo_id);
              }}
              // aspectRatio={`${data.photo_width}/${data.photo_height}`}
              onLoad={() => setLoaded(true)}
            />

            <div
              className={`w-full h-full animate-pulse bg-linear-to-r from-gray-400 via-gray-500 to-gray-400 border-gray-500 rounded-3xl aspect-[${
                data.photo_width
              }/${data.photo_height}]${loaded ? `opacity-0 ` : "opacity-100"} `}
            ></div>

            {/*  image overlay */}

            <ImageOverlay
              createModal={createModal}
              setShowUri={setShowUri}
              data={data}
              handleLike={handleLike}
              like={like}
            />
            <ImageActionBar data={data} like={like} handleLike={handleLike} />
          </div>
        );
      })}
    </div>
  );
};

export default Image;
