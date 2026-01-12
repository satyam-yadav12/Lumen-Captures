import React, { useState } from "react";


const ImagePlace = ({
  data,
  createModal,
  setShowUri,

}) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      <div className={`relative w-full rounded-xl overflow-hidden aspect-[${data.photo_height}/${data.photo_width}]`}>
        {!loaded && (
          <div
            className={`absolute w-full h-full  animate-pulse bg-linear-to-r from-gray-200 via-gray-300 to-gray-200 border-gray-400 rounded-xl inset-0 `}
          >

          </div>
        )}
        <img
          src={data.thumb_url}
          alt="img"

          id={data.img_id}
          loading="lazy"
          className={` object-cover bg-gray-200 m-auto rounded-xl min-h-30 w-full transition-opacity duration-500 
     ${loaded ? "opacity-100" : "opacity-0"} 
        `}
          onClick={() => {
            createModal(true);
            setShowUri(data);
          }}
          // aspectRatio={`${data.photo_width}/${data.photo_height}`}
          onLoad={() => setLoaded(true)}
        />
      </div>


    </>
  );
};

export default ImagePlace; //NOTE: rename
