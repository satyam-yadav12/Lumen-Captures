import axiosApi from "./refreshToken";


export const saveToCollection = (async (img_id) => {
    try {
        const response = await axiosApi.post(`/images/save/${img_id}`)
        return response.data
    }
    catch (error) {
        throw error
    }
})


export const removeFromSaved = (async (img_id) => {
    try {
        const response = await axiosApi.delete(`/images/unsave/${img_id}`)
        return response.data
    }
    catch (error) {
        throw error
    }
})


export const fetchCollection = (async () => {
    try {
        const response = await axiosApi.get("/images/collection")
        return response.data
    }
    catch (error) {
        throw error
    }
})


export const postFeedback = (async (payload) => {
    try {
        const response = await axiosApi.post("misc/feedback", payload)
        return response.data
    }
    catch (error) {
        throw error
    }
})


export const reportImageContent = (async (img_id, payload) => {
    try {
        const response = await axiosApi.post(`misc/reportcontent/${img_id}`, payload)
        return response.data
    }
    catch (error) {
        throw error
    }
})


//search


export const SearchKeyword = (async (keyword, page = 1) => {
    try {
        const response = await axiosApi.get(`/lumen/search?q=${keyword}&page=${page}`)
        return response.data
    }
    catch (error) {
        throw error
    }
})


export const fetchAllImages = (async () => {
    try {
        const response = await axiosApi.get(`/lumen/allimages`)
        return response.data
    }
    catch (error) {
        throw error
    }
})