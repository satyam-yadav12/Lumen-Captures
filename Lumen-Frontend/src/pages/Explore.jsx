import React, { useContext, useEffect, useState } from 'react'
import { SearchKeyword } from '../services/Search_misc'
import { AlertContext } from '../context/AlertMessage'
import { useParams } from 'react-router-dom'
import Image from '../components/ImageCard/ImageCard'

const Explore = () => {
  const { setMessage } = useContext(AlertContext)
  const [images, setImages] = useState([])

  const page = useParams()



  useEffect(() => {
    console.log(page, 'page')
    const fetchImages = (async () => {
      const response = await SearchKeyword(page.query, page['page'])
      console.log(response)
      setImages(response.data.search_result)
      setMessage("search images was fetched")
    })
    fetchImages()
  }, [page])
  return (
    <div>
      {images ? <Image images={images} /> : "loading..."}

    </div>
  )
}

export default Explore