import React from "react";
import ImageMenuButton from "./ImageMenuButton";

const ImageOverlay = ({ createModal, setShowUri, data, handleLike, like, TextValues }) => {
  return (
    <div >
      {" "}
      <div
        onClick={() => {
          createModal(true);
          setShowUri(data);
        }}
        className=" hidden  md:flex md:flex-col justify-evenly w-full h-full p-2 text-2xl text-bold text-white font-bold shadow-lg rounded-2xl shadow-black opacity-0 inset-0 group-hover:opacity-100 transition-opacity ease duration-300 text-center top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 absolute lg:bg-black/20"
      >
        <div className="flex flex-row h-[20%] p-2 mb-auto">
          <img
            src="/logo.png"
            alt="logo"
            className="h-6 w-max object-contain px-2 p-0 mt-2 mr-auto "
          />
          <ImageMenuButton TextValues={TextValues} data={data} />
        </div>
        <div className="w-full h-[60%] flex flex-col justify-center items-center">
          <button className="bg-transparent border border-transparent shadow-2xl rounded-3xl opacity-50 p-2 h-max w-max ">
            Open
          </button>
        </div>
        <div className="flex flex-row h-[20%] p-2 ">
          <p className="h-full w-max  px-2 mr-auto shadow-2xl">
            {data.username}
          </p>

          {like.includes(`${data.img_id}`) ? (
            <img
              src="https://img.icons8.com/?size=64&id=aId5rVASLwDE&format=png"
              alt="like"
              className="ml-auto px-2 mt-2 h-6 invert  object-contain  w-max shadow-2xl"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleLike(data.img_id);
              }}
            />
          ) : (
            <img
              src="https://cdn-icons-png.flaticon.com/128/25/25424.png"
              alt="like"
              className="ml-auto px-2 mt-2 h-6 invert  object-contain  w-max shadow-2xl "
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleLike(data.img_id);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageOverlay;
