import React, { useEffect } from "react";
import Image from "../components/ImageCard/ImageCard";


import useImagePagination from "../hooks/useImagePagination";

const Collections = () => {


  const { images, loading, hasMore, page, setPage, limit, request, cursor } = useImagePagination()



  useEffect(() => {
    const fetchImages = (async () => {
      const response = await request({ url: "/images/collection", method: "GET", params: { cursor: cursor, limit: limit } })

    })
    fetchImages()

  }, [page])

  return (
    <div>
      <div className="pt-5 w-[98%] m-auto">
        {images ? <Image images={images} hasMore={hasMore} page={page} setPage={setPage} loading={loading} /> : "loading..."}

      </div>
    </div>
  );
};

export default Collections;
