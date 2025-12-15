import React, { useEffect } from "react";

export const Notification = ({ message, setMessage }) => {
  useEffect(() => {
    message && startTimer();
  }, [message]);

  const startTimer = () => {
    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  return (
    <div
      className={
        message
          ? "fixed ml-[50%] mr-[50%] translate-[-50%] mt-8 w-1/2 z-"
          : "hidden"
      }
    >
      <p className="p-2 text-center font-bold px-4 m-3  bg-blue-100 text-blue-600 border border-blue-600  z-50">
        {message ? message + "..." : ""}
      </p>
    </div>
  );
};


export default Notification 