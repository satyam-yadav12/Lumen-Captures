import { Skeleton } from "@mui/material";
import React from "react";

const ImageFallback = () => {
  return (
    <div className="m-auto relative break-inside-avoid overflow-hidden rounded-xl my-4 w-[90vw] sm:w-[45vw] lg:w-[30vw] gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:columns-3">
      <div className="w-full h-full overflow-hidden">
        <Skeleton variant="rectangular" height={300} width={400} />
        <div className="md:hidden block h-12 w-[90%]">
          {" "}
          <Skeleton veriant="rectangular" />{" "}
        </div>
      </div>
    </div>
  );
};

export default ImageFallback;
