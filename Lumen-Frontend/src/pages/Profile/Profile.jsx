import { Button } from "@mui/material";
import React, { useEffect, useContext, useState } from "react";
import Uploads from "../Uploads";
import UpdatePassword from "./UpdatePassword";
import { editProfile, getProfile, updateProfilePicture } from "../../services/userContent-Profile";
import { AuthContext } from "../../context/AuthContext";
import { AlertContext } from "../../context/AlertMessage";

const Profile = () => {
  const { setMessage } = useContext(AlertContext)
  const [disableEdit, setDisableEdit] = useState(true);
  const { logout } = useContext(AuthContext)
  const [profileData, setProfileData] = useState({
    Full_name: "",
    City: "",

    Username: "",
    Email: "",
    Profile_picture: ""
  });
  const [changePicture, setChangePicture] = useState(false)
  const [storeFileToChange, setStoreFileToChange] = useState(null)



  useEffect(() => {
    let tempProfile = {
      Full_name: "",
      City: "",

      Username: "",
      Email: "",
      Profile_picture: ""
    }
    const fetchProfileData = (async (tempProfile) => {
      const response = await getProfile()
      // console.log(response)
      const responseField = response.data["user details"]
      for (const key in tempProfile) {
        if (key in responseField) {
          tempProfile[key] = responseField[key]
        }
      }
      // console.log(tempProfile)
      setProfileData(tempProfile)
    })
    try {
      fetchProfileData(tempProfile)
    }
    catch (error) {
      if (error.response.status === 401) {
        logout()
      }
      // console.log(error)
    }
  }, [])


  const openPicture = (e) => {
    console.log("Profile picture clicked:", e.target.src);
    // Additional logic to handle picture click can be added here
  };

  const allowEdit = () => {
    setDisableEdit(false);
  };

  const saveChanges = (async () => {
    if (!(profileData.Full_name && profileData.City)) {
      setMessage("field must not empty")
    }
    const payload = {
      Full_name: profileData.Full_name,
      City: profileData.City,

    }
    // console.log(payload)
    try {
      const response = await editProfile(payload)
      // console.log(response)
      setMessage('success')
    } catch (error) {
      // console.log(error)
      setMessage("failed")
    }
    setDisableEdit(true);
  });

  const handleFileUpload = (async (e) => {
    const file = storeFileToChange
    if (!file) {
      return

    };
    const url = (URL.createObjectURL(file))
    setProfileData((prev) => ({ ...prev, Profile_picture: url }));
    setChangePicture(false)
    const payload = new FormData()
    payload.append("Profile_picture", storeFileToChange)

    try {
      const response = await updateProfilePicture(payload)
      // console.log(response)
      setMessage("profile picture was changed")
    } catch (error) {
      // console.log(error)
      setMessage("request failed")
    }
  });

  const handleFileChange = ((e) => {
    e.target.files[0] ? setStoreFileToChange(e.target.files[0]) : setStoreFileToChange(null)
  })

  return (
    <div>
      <div className="grid grid-cols-2 gap-2 w-full md:w-5/6 m-auto text-center my-7  border-b-2 border-gray-500 p-4">
        <h1 className="text-2xl font-bold m-auto">{profileData.Username}</h1>
        <div
          className={
            disableEdit ? "w-max text-center m-auto md:mr-auto p-2" : "hidden"
          }
        >
          <Button variant="contained" color="primary" onClick={allowEdit}>
            Edit Profile
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 w-full md:w-5/6 m-auto border-b-2 border-gray-500 pb-12 pt-5">
        <div className="columns-1 gap-3 w-1/2 m-auto md:mx-0 md:ml-auto">
          <img
            src={
              profileData.Profile_picture != ""
                ? profileData.Profile_picture
                : "https://cdn-icons-png.flaticon.com/128/149/149071.png"
            }
            alt="profile"
            className="h-40 mt-5 w-max rounded-full ml-auto  mb-auto inline select-none border border-gray-300"
            onClick={openPicture}
          />


          {changePicture ?
            (<div className="w-max my-5 flex flex-col">
              <input type="file" onChange={(e) => handleFileChange(e)} className="border p-2 m-2 " />
              <div className="z-50 m-auto w-max my-5  p-2 ">
                <Button variant="outlined" onClick={handleFileUpload} >save</Button></div>
            </div>) :
            (<div className="w-max m-auto my-5">
              <Button variant="outlined" color="primary" onClick={() => setChangePicture(true)}>
                Change
              </Button>
            </div>)}
        </div>

        <div className=" text-left m-auto col-start-1 gap-0 w-full p-2 md:col-span-2">
          <div className="flex flex-col md:w-max md:m-auto md:justify-start ">
            <div className="flex-col md:flex-row flex gap-1 md:gap-5">
              <span className="inline m-2 mr-auto text-2xl pt-2 text-gray-500 font-semibold">
                Full Name
              </span>{" "}
              <input
                type="text"
                value={profileData.Full_name}
                disabled={disableEdit}
                onChange={(e) =>
                  setProfileData((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
                name="Full_name"
                className="inline m-2 text-2xl font-semibold border p-2  pl-4"
              />
            </div>
            <div className="flex-col md:flex-row flex gap-1 md:gap-5">
              <span className="inline m-2 mr-auto text-2xl pt-2 text-gray-500 font-semibold">
                Email
              </span>{" "}
              <input
                type="text"
                value={profileData.Email}
                disabled={true}
                className="inline m-2 text-2xl font-semibold border p-2  pl-4"
              />
            </div>
            <div className="flex-col md:flex-row flex gap-1 md:gap-5">
              <span className="inline m-2 mr-auto text-2xl pt-2 text-gray-500 font-semibold">
                City
              </span>{" "}
              <input
                type="text"
                value={profileData.City}
                disabled={disableEdit}
                onChange={(e) =>
                  setProfileData((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
                name="City"
                className="inline m-2 text-2xl font-semibold border p-2  pl-4"
              />
            </div>

          </div>
        </div>
        <div
          className={
            disableEdit ? "hidden" : "md:col-span-3 m-auto w-max p-4 my-4"
          }
        >
          <Button
            variant="contained"
            color="primary"
            className="w-max"
            onClick={saveChanges}
          >
            Save Changes
          </Button>
        </div>
      </div>
      <UpdatePassword />
      <Uploads />
    </div>
  );
};

export default Profile;
