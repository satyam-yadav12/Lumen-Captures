import React, { useCallback, useEffect, useState } from "react";
import mockData from "../../assets/photos_extracted.json";

const ImageModal = ({ id, show, setShow }) => {
  const [imgUrl, setImgUrl] = useState(null);
  const [loaded, setLoaded] = useState(false); //not used yet, make it useful
  const [imageDetails, setImageDetails] = useState({
    author: "",
    title: "",
    description: "",
  });

  useEffect(() => {
    setImgUrl(id.photo_image_url || id.secure_url)
    setImageDetails({
      author: id.photographer_username || id.owner,
      title: id.ai_description || id.title,
      description: id.photo_description || id.description,
    });
  }, [id]);

  // const boxModal =useCallback((status)=>{
  //   setShow(status)
  // }),

  return (
    <>
      {show && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 no-scrollbar"
          onClick={() => setShow(false)}
        >
          <div
            className="dark:bg-black/70 relativew-full md:w-[90%]  h-[90%] max-h-[90vh] bg-white/70 rounded-2xl shadow-xl overflow-y-auto p-4 no-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            {/* content */}
            <div className="flex flex-col items-center justify-start gap-4 pt-6 no-scrollbar">
              <img
                src={imgUrl}
                alt="main img"
                className="w-[98%] md:h-[70vh] object-contain"
              />
              {/* close button top-right */}
              <button
                className=" fixed top-12 md:right-25 right-8 text-5xl font-bold dark:text-white"
                onClick={() => setShow(false)}
              >
                ×
              </button>
              <p>{id.photo_id || id.img_id}</p>

              <div className="w-full text-justify">
                <p className="p-2 font-mono font-semibold">
                  {imageDetails.author}
                </p>
                <p className="p-2 font-mono font-medium">
                  {imageDetails.title}
                </p>
                <p className="p-2 font-mono font-medium">
                  {imageDetails.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageModal;
