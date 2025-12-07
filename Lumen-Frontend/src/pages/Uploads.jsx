import React from "react";
import Image from "../components/ImageCard/ImageCard";
import mockData from "../assets/photos.json";

const Uploads = () => {
  return (
    <div>
      <h1 className="mt-5 m-auto text-2xl text-center">
        Image uploaded by {"Username"}
      </h1>
      <div className="pt-5 w-[98%] m-auto">
        <Image images={mockData} />
      </div>
    </div>
  );
};

export default Uploads;
