import React, { useState, useEffect, Suspense, useContext } from "react";
import FilterChips from "../components/FilterChips";
import { CircularProgress } from "@mui/material";
import Hero from "../components/Hero/Hero";
import useImagePagination from "../hooks/useImagePagination";

const Image = React.lazy(() => import("../components/ImageCard/ImageCard"));

const Home = () => {

  const [isFilterApplied, setIsFilterApplied] = useState(0)

  const { images, setImages, loading, hasMore, setHasMore, page, setPage, limit, request, cursor, setCursor } = useImagePagination()

  useEffect(() => {

    setCursor("")
    setImages([])
    setHasMore(true)
    setPage(Number(!page))


  }, [isFilterApplied])

  useEffect(() => {

    const fetchImages = (async () => {
      if (isFilterApplied) {
        const response = await request({ url: "/lumen/source", method: "GET", params: { cursor: cursor, limit: limit } })

      }
      else {
        const response = await request({ url: "/lumen/allimages", method: "GET", params: { cursor: cursor, limit: limit } })

      }

    })
    fetchImages()

  }, [page])

  return (
    <div>
      <div>
        <Hero />
      </div>
      <div>
        <FilterChips isFilterApplied={isFilterApplied} setIsFilterApplied={setIsFilterApplied} />
      </div>

      <div className="mt-5">

        {images ?
          <Suspense fallback={<CircularProgress size={40} />}>
            <Image images={images} hasMore={hasMore} page={page} setPage={setPage} loading={loading} />
          </Suspense> : <CircularProgress size={40} />}
      </div>
    </div>
  );
};

export default Home;
