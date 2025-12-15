import axios from "axios"

const api = axios.create({
    baseURL: "http://127.0.0.1:5000",
    withCredentials: true
})

/*
api.interceptors.request.use(async (config) => {
    // const userName = await api.get("/me").catch(async(error)=>{
    //if(error.status == 401){
    //const refresh = await api.get("/refresh")
    // const user = await api.get("/me")
    // return user
    //}
    //})
    return config;
}, (error) => {
    return promise.reject(error)
});
*/
export default api