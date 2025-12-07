import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();
  const navigateToHome = () => navigate("/");
  return (
    <div
      className="flex flex-row cursor-pointer select-none "
      onClick={navigateToHome}
    >
      <img src="/logo.png" alt="Lumen" className="inline p-1 h-13" />
      <div className="inline p-1">
        <p className="font-extrabold m-0 p-0 font-sans">LUMEN</p>
        <p className="font-bold m-0 p-0 font-serif">Captures</p>
      </div>
    </div>
  );
};

export default Logo;
