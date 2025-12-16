import axiosApi from "./refreshToken"




export const getProfile = (async () => {
    try {
        const result = await axiosApi.get("/user/profile")
        return result
    } catch (error) {
        throw error
    }
})


export const editProfile = (async (payload) => {
    try {
        const result = await axiosApi.put("/user/edit-profile", payload)
        return result
    } catch (error) {
        throw error
    }
})


export const updatePassword = (async (payload) => {
    try {
        const response = await axiosApi.put("/user/update-password", payload)
        return response.data
    }
    catch (error) {
        throw error
    }
})


export const updateProfilePicture = (async (payload) => {
    try {
        const response = await axiosApi.put("/user/update-profile-picture", payload)
        return response.data
    }
    catch (error) {
        throw error
    }
})


export const deleteAccount = (async () => {
    try {
        const response = await axiosApi.delete("/user/deleteAccount")
        return response.data
    }
    catch (error) {
        throw error
    }
})
//content


export const UploadImageToLumen = (async (payload) => {

    const response = await axiosApi.post("/user/upload-new", payload)
    return response

})


export const deleteImage = (async (img_id) => {
    try {
        const response = await axiosApi.delete(`/user/delete_img/${img_id}`)
        return response.data
    }
    catch (error) {
        throw error
    }
})


export const updateImage = (async (img_id, payload) => {
    try {
        const response = await axiosApi.put(`/user/update_img/${img_id}`, payload)
        return response.data
    }
    catch (error) {
        throw error
    }
})


export const GetAllImagesByUser = (async () => {
    try {
        const response = await axiosApi.get(`/user/uploads`)
        return response.data
    }
    catch (error) {
        throw error
    }
})
