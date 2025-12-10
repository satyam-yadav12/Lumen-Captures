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
    let uri = mockData.filter((val) => val.photo_id == id);

    uri.length > 0 && setImgUrl(uri[0].photo_image_url);
    uri.length > 0 &&
      setImageDetails({
        author: uri[0].photographer_username,
        title: uri[0].ai_description,
        description: uri[0].photo_description,
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
              <p>{id}</p>

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
