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
        const result = await axiosApi.put("/user/editprofile", payload)
        return result
    } catch (error) {
        throw error
    }
})


export const updatePassword = (async (payload) => {
    try {
        const response = await axiosApi.put("/user/changepassword", payload)
        return response.data
    }
    catch (error) {
        throw error
    }
})


export const updateProfilePicture = (async (payload) => {
    try {
        const response = await axiosApi.put("/user/change-profile-picture", payload)
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
        const response = await axiosApi.delete(`/user/uploads/${img_id}/delete`)
        return response.data
    }
    catch (error) {
        throw error
    }
})


export const updateImage = (async (img_id, payload) => {
    try {
        const response = await axiosApi.put(`/user/uploads/${img_id}/update`, payload)
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
