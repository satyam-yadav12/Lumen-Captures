import React, { useContext, useState } from "react";
import SearchBar from "./SearchBar";
import { Button, Drawer } from "@mui/material";
import MenuIcon from "@Mui/icons-material/Menu";

import Logo from "../../Logo/Index";

import { ThemeContext } from "../../../context/Themecontext";
import DrawerContent from "../DrawerContent";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user } = useContext(AuthContext)
  const [open, setOpen] = useState(false);

  const [isActive, setIsActive] = useState("false");

  const { theme: mode, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate()
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const changeActive = () => {
    setIsActive(true);
  };


  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4  gap-4 mt-2  items-center">
        <div className=" m-3 col-start-1 md:col-start-1">
          <Logo />
        </div>
        <div className="col-span-2 order-last md:order-0  w-[97%] gap-0 ">
          <SearchBar />
        </div>
        <div className="justify-self-end col-start-2 md:col-start-4 m-3 p-3 font-bold cursor-pointer ">
          {user ? (
            <MenuIcon
              onClick={toggleDrawer(true)}
              className="mr-5"
              color="primary"
              fontSize="large"
            />
          ) : (
            <div className="flex flex-row gap-2">
              <Button
                onClick={toggleTheme}
                className="inline "
                variant="outlined"
              >
                {mode}
              </Button>
              <Button
                onClick={() => navigate('/login')}
                className="inline"
                variant="outlined"
              >
                Login
              </Button>
            </div>
          )}
          <div
            className={
              mode == "dark" ? "bg-black text-white" : "bg-white text-black"
            }
          >
            <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
              <DrawerContent
                user={user}
                isActive={isActive}
                toggleDrawer={toggleDrawer}
                changeActive={changeActive}
              />
            </Drawer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
