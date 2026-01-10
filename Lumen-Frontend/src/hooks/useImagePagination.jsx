import React, { useState, useContext, useEffect } from "react"
import axiosApi from "../services/refreshToken";
import { AlertContext } from "../context/AlertMessage"


function useImagePagination() {


    const { setMessage } = useContext(AlertContext)
    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [cursor, setCursor] = useState("")
    const limit = 10;


    async function request(config) {
        if (!hasMore || loading) return;

        try {
            setLoading(true)
            const response = await axiosApi(config)
            const result = response.data.result
            setImages((prev) => ([...prev, ...response.data.result]));
            if (response.data.result.length < limit) setHasMore(false);
            setCursor(() => result[result.length - 1]["_id"]["$oid"])
            setMessage(" images was fetched", result[result.length - 1]["_id"]["$oid"])
            console.log(response, `response ${config.url}`)
        }
        catch (error) {
            console.log(error, `error ${config.url}`)
        }
        finally {
            setLoading(false)
        }

    }



    return { setMessage, images, setImages, loading, setLoading, hasMore, setHasMore, page, setPage, limit, request, cursor, setCursor }
}

export default useImagePagination;
