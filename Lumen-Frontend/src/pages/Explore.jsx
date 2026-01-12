import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Image from '../components/ImageCard/ImageCard'
import useImagePagination from '../hooks/useImagePagination'

const Explore = () => {

  const { images, loading, hasMore, page, setPage, request, cursor, setCursor, setImages, setHasMore } = useImagePagination()


  const { query } = useParams()

  useEffect(() => {

    setCursor("")
    setImages([])
    setHasMore(true)
    setPage(Number(!page))


  }, [query])

  useEffect(() => {
    
    const fetchImages = (async () => {
      const response = await request({ url: `/lumen/search?q=${query}&cursor=${cursor}&limit=${10}`, method: "GET" })
      // console.log(response)
    })
    fetchImages()

  }, [page])

  return (
    <div>
      {images ? <Image images={images} hasMore={hasMore} page={page} setPage={setPage} loading={loading} /> : "loading..."}
    </div>
  )
}

export default Explore