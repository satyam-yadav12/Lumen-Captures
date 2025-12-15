import axiosApi from "./refreshToken"

export const LoginWithLumen = (async (payload) => {
    try {
        const response = await axiosApi.post("/login", payload)
        return response.data
    } catch (error) {
        throw error
    }

})


export const RegisterWithLumen = (async (payload) => {
    try {
        const response = await axiosApi.post("/register", payload)
        return response.data
    } catch (error) {
        throw error
    }
})


export const LogoutFromLumen = (async () => {
    try {
        const response = await axiosApi.post("/logout")
        return response.data
    } catch (error) {
        throw error
    }

})

export const CheckActiveSession = (async () => {
    try {
        const response = await axiosApi.get("/me")
        return response.data
    } catch (error) {
        throw error
    }
})

