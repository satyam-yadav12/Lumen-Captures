import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Profile from "../pages/Profile/Profile";
import Collections from "../pages/Collections";
import Uploads from "../pages/Uploads";
import UploadImage from "../pages/UploadImage";
import Feedback from "../pages/Feedback";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Developer from "../pages/Developer";
import About from "../pages/About";
import Layout from "../components/Layout/Layout";
import Explore from "../pages/Explore";
import Terms from "../pages/Terms";
import UpdateImage from "../pages/UpdateImage";

const PageRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="collection" element={<Collections />} />
          <Route path="uploads" element={<Uploads />} />
          <Route path="uploads/:img_id" element={<UpdateImage />} />
          <Route path="upload-image" element={<UploadImage />} />
          <Route path="feedback" element={<Feedback />} />
          <Route path="developer" element={<Developer />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="explore/:query" element={<Explore />} />
          <Route path="terms" element={<Terms />} />
          <Route path="*" element={"Not found"} />
        </Route>
      </Routes>
    </>
  );
};

export default PageRoutes;
