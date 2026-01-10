import axiosApi from "./refreshToken";


export const saveToCollection = (async (img_id) => {

    const response = await axiosApi.post(`/images/save/${img_id}`)
    return response.data

})


export const removeFromSaved = (async (img_id) => {

    const response = await axiosApi.delete(`/images/unsave/${img_id}`)
    return response.data

})


export const fetchCollection = (async () => {

    const response = await axiosApi.get("/images/likes")
    return response.data

})


export const postFeedback = (async (payload) => {

    const response = await axiosApi.post("misc/feedback", payload)
    return response.data

})


export const reportImageContent = (async (img_id, payload) => {

    const response = await axiosApi.post(`misc/reportcontent/${img_id}`, payload)
    return response.data

})


//search


export const SearchKeyword = (async (keyword, page = 1) => {

    const response = await axiosApi.get(`/lumen/search?q=${keyword}&page=${page}`)
    return response.data

})


export const fetchAllImages = (async () => {

    const response = await axiosApi.get(`/lumen/allimages`)
    return response.data

})