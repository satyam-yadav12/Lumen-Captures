import React, { useCallback, useEffect, useState } from "react";
import { find_specific_img } from "../../services/userContent-Profile"
import ImageCredit from "../ImageCredit";
import CircularProgress from "@mui/material/CircularProgress";

const ImageModal = ({ photo = null, show, createModal }) => {
  const [imgUrl, setImgUrl] = useState(null);
  const [imageDetails, setImageDetails] = useState({
    author: "",
    title: "",
    description: "",
    source: "",
  });


  const closeImageModal = (() => {
    setImgUrl(null)
    createModal(false)
  })

  useEffect(() => {



    async function fetchImage() {
      if (!photo.img_id) return;
      const response = await find_specific_img(photo.img_id)
      // console.log(response)

      setImgUrl(response.data.result.img_url)

      setImageDetails({
        author: response.data.result.username,
        title: response.data.result.title,
        description: response.data.result.description,
        source: response.data.result.source || "unsplash"
      });
    }
    fetchImage()


  }, [photo]);



  return (
    <>
      {show && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 no-scrollbar"
          onClick={() => createModal(false)}
        >
          <div
            className="dark:bg-black/70 relativew-full md:w-[90%]  h-[90%] max-h-[90vh] bg-white/70 rounded-2xl shadow-xl overflow-y-auto p-4 no-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            {/* content */}
            <div className="flex flex-col items-center justify-start gap-4 pt-6 no-scrollbar">
              {
                imgUrl ? <img
                  src={imgUrl}
                  alt="main img"
                  className="w-[98%] md:h-[70vh] object-contain"
                /> : <div className="flex justify-center items-center m-auto">
                  <CircularProgress size={40} />
                </div>
              }

              {/* close button top-right */}
              <button
                className=" fixed top-12 md:right-25 right-8 text-5xl font-bold dark:text-white"
                onClick={closeImageModal}
              >
                ×
              </button>


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
                <p className="p-2 font-mono font-medium">
                  {imageDetails.source == "unsplash" ? <ImageCredit username={imageDetails.author} /> : ""}
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
