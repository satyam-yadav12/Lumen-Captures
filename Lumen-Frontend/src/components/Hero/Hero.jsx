import { Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import HeroTypeText from "./HeroTypeText";
import { ThemeContext } from "../../context/Themecontext";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [tag, setTag] = useState("Discover, search, and share images");
  const navigate = useNavigate();

  const { theme: mode, Imgtag } = useContext(ThemeContext);

  const [bgImg, setBgImg] = useState(`/${Imgtag}-image-1.avif`);

  const updateTag = () =>
    setTag(
      tag == "Discover, search, and share images"
        ? "Upload your images for everyone to see"
        : "Discover, search, and share images"
    );

  useEffect(() => {
    const chagneTag = setTimeout(() => {
      updateTag();
    }, 5000);

    return () => clearTimeout(chagneTag);
  }, [tag]);

  useEffect(() => {
    let num = 1;
    setBgImg(() => `/${Imgtag}-image-1.avif`);
    const changeBack = setInterval(() => {
      if (num <= 4) {
        setBgImg(`/${Imgtag}-image-${num + 1}.avif`);
        num = num + 1;
      } else {
        num = 1;
        setBgImg(`/${Imgtag}-image-${num}.avif`);
      }
    }, 5000);

    return () => clearInterval(changeBack);
  }, [Imgtag]);

  return (
    <div className="mt-5">
      <div className="relative w-full h-[400px]">
        <div
          className="bg-center bg-clip-border bg-no-repeat bg-cover w-full h-[400px] opacity-[0.67] inset-0 bg-linear-to-b from-black/40 to-transparent"
          style={{ backgroundImage: `url(${bgImg} )` }}
        ></div>
        <div className="top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 absolute flex flex-col items-center justify-center text-center">
          {/* the text in middle */}
          <h1
            className="text-4xl font-bold p-5 m-2 pb-1
       mb-0 text-shadow-2xs text-shadow-white text-center"
          >
            Welcome to Lumen Captures!
          </h1>
          <h2 className="font-normal text-center p-3 m-2 pt-0 mt-0   text-shadow-2xs text-shadow-white h-10">
            <HeroTypeText text={tag} />
          </h2>

          <div className="p-2 m-3 flex justify-center">
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/login")}
            >
              {" "}
              Login / Register
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
