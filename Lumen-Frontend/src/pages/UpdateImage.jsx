import { Button, CircularProgress } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { updateImage, find_specific_img } from "../services/userContent-Profile";
import { AlertContext } from "../context/AlertMessage";
import { useParams } from 'react-router-dom'

const UpdateImage = () => {
    const { setMessage } = useContext(AlertContext)
    const [imagePreview, setImagePreview] = useState("");
    const { user, logout } = useContext(AuthContext)
    const [imageDetails, setImageDetails] = useState({ title: "", description: "", tags: [] })
    const [loading, setLoading] = useState(false)
    const [disableSubmit, setDisableSubmit] = useState(false)


    const { img_id } = useParams()
    useEffect(() => {
        async function fetchImage() {
            const response = await find_specific_img(img_id)
            // console.log(response)
            let img = { title: "", description: "", tags: [] }
            if (response) {
                img.title = response.data.result.title
                img.description = response.data.result.description
                img.tags = JSON.parse(response.data.result.tags)
                // console.log(response.data.result.tags)
            }

            setImageDetails(img)
            setImagePreview(response.data.result.secure_url)
            if (response.data.result.username != user) {
                setDisableSubmit(true)
            }
        }
        fetchImage()
    }, [])

    const uploadImageDetails = (async (img_id, payload) => {
        let message;
        try {
            const response = await updateImage(img_id, payload) //change function
            message = `Image was uploaded`

            // setMessage("image was uploaded")
        } catch (error) {
            // console.log(error)
            message = "action failed"
            if (error.response?.status === 401) {
                logout()
            }



        }
        return message
    })

    const handleSubmit = (async (e) => {
        e.preventDefault()
        if (loading) return;

        setDisableSubmit(() => true)
        setLoading(() => true)
        let payload = {
            title: imageDetails.title,
            description: imageDetails.description,
            tags: JSON.stringify(imageDetails['tags'])
        }


        // console.log(payload, "payload")
        const msg = await uploadImageDetails(img_id, payload)
        // console.log(msg, 'msg')
        setMessage(msg)

        setDisableSubmit(() => false)
        setLoading(() => false)
        return
    })

    const handleChange = ((e) => {
        if (e.target.name != "tags") {
            setImageDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }))
        }
        else {
            let text = e.target.value
            let tagContainer = text.split(" ")

            setImageDetails((prev) => ({ ...prev, [e.target.name]: tagContainer }))
        }

    })


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5  mt-5 overflow-hidden m-auto">
            <div className="lg:ml-auto my-auto col-start-1 row-start-1">
                {imagePreview && (
                    <img
                        src={imagePreview}
                        alt="preview"
                        className="h-full max-h-107.5 w-full  object-contain bg-gray-100"
                    />
                )}
            </div>
            <div className="flex flex-col justify-start md:mr-auto md:m-2 text-left lg:col-start-2 row-start-2 md:row-start-1 m-auto">

                <div className="flex flex-col gap-3">
                    <label htmlFor="title">Enter Title </label>
                    <input
                        className="border border-black p-4 my-1 block dark:bg-gray-100 dark:border-white dark:text-black "
                        type="text"
                        name="title"
                        onChange={handleChange}
                        value={imageDetails.title}
                        disabled={disableSubmit}
                        id="title"
                    />
                    <label htmlFor="description">Enter Description</label>
                    <textarea
                        name="description"
                        id="description"
                        onChange={handleChange}
                        value={imageDetails.description}
                        disabled={disableSubmit}
                        className="  border border-black p-4  my-1 block dark:border-white dark:bg-gray-100 dark:text-black"
                    ></textarea>

                    <label htmlFor="Tag">Enter tags separated by space</label>
                    <input
                        className="border border-black p-4 my-1 block dark:bg-gray-100 dark:border-white dark:text-black"
                        type="text"
                        name="tags"
                        value={imageDetails.tags.join(" ")}
                        disabled={disableSubmit}
                        onChange={handleChange}
                        id="Tag"
                    />
                </div>
            </div>
            <div className="m-auto my-4 col-span-2">
                <Button variant="contained" disabled={disableSubmit} onClick={(e) => handleSubmit(e)}>Save Details{disableSubmit ? loading && <CircularProgress size={20} /> : ""}</Button>
            </div>
        </div>
    );
};


export default UpdateImage;
