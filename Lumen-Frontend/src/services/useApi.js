
import api from "./AxiosInstance"
import { useEffect, useState } from "react"

const useApi = (({ method, route, payload }) => {
    const [response, setResponse] = useState(null)
    const [usern, setUser] = useState(null)
    const publicRoutes = ["/login", "/register", "/search"]


    const makeApiCall = (async () => {
        let fetchResult;
        if (!payload) {
            fetchResult = await api[method](route);
        }
        else {
            fetchResult = await api[method](route, payload);
        }

        setResponse(fetchResult)
        return fetchResult
    })

    const FetchResponse = (async () => {
        //check if it is a public route
        if (publicRoutes.includes(route)) {
            const apiResult = await makeApiCall()

        }

        //check if user is aunthorized
        const userName = await api.get("/me").catch(async (error) => {
            if (error.status == 401) {
                const refresh = await api.get("/refresh")
                const user = await api.get("/me")
                console.log(user, "catched adn refreshed")
            }
            console.log(error)
        })

        console.log(userName)
        // make final api calls
        if (userName) {
            const apiResult = await makeApiCall()

        } else {
            console.log("user is not registered")
        }

    })

    useEffect(() => {
        FetchResponse()
    }, [route, payload])

    return response;
})

export default useApi