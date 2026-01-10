import React from "react";
import ImageMenuButton from "./ImageMenuButton";

const ImageActionBar = ({ data, like, handleLike, TextValues }) => {
  return (
    <div className="h-12 p-2 block lg:hidden rounded-2xl">
      <div className="flex flex-row   ">
        <p className="h-full w-max  px-1 pt-1.5 mr-auto font-semibold">
          {data.photographer_username || data.username}
        </p>
        <div className="ml-auto flex flex-row">
          {like.includes(`${data.photo_id || data.img_id}`) ? (
            <img
              src="https://img.icons8.com/?size=64&id=aId5rVASLwDE&format=png"
              alt="like"
              className=" px-2 h-7 mt-0.5  object-contain  w-max dark:invert"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleLike(data.photo_id || data.img_id);
              }}
            />
          ) : (
            <img
              src="https://cdn-icons-png.flaticon.com/128/25/25424.png"
              alt="like"
              className=" px-2 h-6  mt-1.5 object-contain  w-max dark:invert"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleLike(data.photo_id || data.img_id);
              }}
            />
          )}
          <ImageMenuButton
            TextValues={TextValues}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageActionBar;
