import axiosApi from "./refreshToken"

export const LoginWithLumen = (async (payload) => {

    const response = await axiosApi.post("/login", payload)
    return response.data


})


export const RegisterWithLumen = (async (payload) => {

    const response = await axiosApi.post("/register", payload)
    return response.data

})


export const LogoutFromLumen = (async () => {

    const response = await axiosApi.post("/logout")
    return response.data


})

export const CheckActiveSession = (async () => {
    return await axiosApi.get("/me", {
        meta: { allowUnauth: true }
    });
})

