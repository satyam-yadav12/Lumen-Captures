import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { AlertContext } from "../context/AlertMessage";

const Contact = () => {
  const { user, changeUser } = useContext(AuthContext)

  const { message, setMessage } = useContext(AlertContext)

  return (<div className="h-[50vh] m-5 text-center">Contact
    <p>Hi {user}!</p>
    <button onClick={() => setMessage("hellow world")}>changeUser</button>
  </div>);
};

export default Contact;
