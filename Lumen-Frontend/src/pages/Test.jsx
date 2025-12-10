
import React, { useEffect } from 'react'
import api from "../services/AxiosInstance"

const Test = () => {
    const payload = {
        "Email": "john@gmail.com",
        "Password": "John@123"
    }


    const fetch = (async () => {
        const response = await api.post("/login", payload)
        console.log(response)
    })
    const fetchMe = (async () => {
        const response = await api.get("/me",)
        console.log(response)
    })
    const fetchSearch = (async () => {
        const response = await api.get("/lumen/search?q=world",)
        console.log(response)
    })





    return (
        <div>hi
            <div>
                <button className='p-2 m-5 border rounded-2xl' onClick={fetch}>click me</button>
                <button className='p-2 m-5 border rounded-2xl' onClick={fetchMe}>fetch me</button>
                <button className='p-2 m-5 border rounded-2xl' onClick={fetchSearch}>search</button>
            </div>
        </div>
    );
}

export default Test