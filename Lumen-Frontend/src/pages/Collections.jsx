import React from "react";
import Image from "../components/ImageCard/ImageCard";
import mockData from "../assets/photos.json";

const Collections = () => {
  return (
    <div>
      <div className="pt-5 w-[98%] m-auto">
        <Image images={mockData} />
      </div>
    </div>
  );
};

export default Collections;
