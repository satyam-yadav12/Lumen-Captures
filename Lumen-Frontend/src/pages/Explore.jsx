import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Image from '../components/ImageCard/ImageCard'
import useImagePagination from '../hooks/useImagePagination'

const Explore = () => {

  const { images, loading, hasMore, page, setPage, request, cursor } = useImagePagination()


  const { query } = useParams()



  useEffect(() => {
    const fetchImages = (async () => {
      const response = await request({ url: `/lumen/search?q=${query}&cursor=${cursor}&limit=${10}`, method: "GET" })
      // console.log(response)
    })
    fetchImages()

  }, [page, query])

  return (
    <div>
      {images ? <Image images={images} hasMore={hasMore} page={page} setPage={setPage} loading={loading} /> : "loading..."}
    </div>
  )
}

export default Explore