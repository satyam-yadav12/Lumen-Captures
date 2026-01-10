import React, { useContext, useEffect } from "react";
import Image from "../components/ImageCard/ImageCard";
import { AuthContext } from "../context/AuthContext";
import useImagePagination from "../hooks/useImagePagination";

const Uploads = () => {

  const { user } = useContext(AuthContext)
  const { images, loading, hasMore, page, setPage, limit, request, cursor } = useImagePagination()

  useEffect(() => {
    const fetchImages = (async () => {
      const response = await request({ url: "/user/uploads", method: "GET", params: { cursor: cursor, limit: limit } })


    })
    fetchImages()

  }, [page])
  return (
    <div>
      <h1 className="mt-5 m-auto text-2xl text-center">
        Image uploaded by {user}
      </h1>
      <div className="pt-5 w-[98%] m-auto">
        {images ? <Image images={images} TextValues={['Edit Image', 'Delete Image']} hasMore={hasMore} page={page} setPage={setPage} loading={loading} /> : "loading..."}
        { }
      </div>
    </div>
  );
};

export default Uploads;
