import { useContext } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer";
import Notification from "../Notification"
import { AlertContext } from "../../context/AlertMessage";

const Layout = () => {
  const { message, setMessage } = useContext(AlertContext)
  return (

    <>
      <div className="fixed  z-100"><Notification message={message} setMessage={setMessage} /></div>

      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
