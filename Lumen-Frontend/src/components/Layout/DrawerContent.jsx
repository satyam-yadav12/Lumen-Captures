import React, { Fragment, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { ThemeContext } from "../../context/Themecontext";

const DrawerContent = ({ user, isActive, toggleDrawer, changeActive }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div
      className={
        theme === "dark"
          ? "bg-[#222224] text-white h-full"
          : "bg-white text-black"
      }
    >
      <Box sx={{ width: 250 }} role="presentation">
        <div className="ml-auto  p-3 shadow-sm rounded-sm shadow-gray-500  font-semibold text-2xl mt-[50px] w-[95%]  m-auto flex ">
          <p className="inline mr-auto ">{user ? user : "Login / Register"}</p>
          <span
            className={`ml-auto mr-3 px-3 cursor-pointer rotate-element ${
              isActive ? "active-state" : ""
            }`}
            onClick={toggleDrawer(false)}
          >
            X
          </span>
        </div>
        <List>
          {["Profile", "Collection", "Uploads", "Upload Image"].map(
            (text, index) => (
              <Fragment key={index}>
                <Link to={"/" + text.toLowerCase().replace(" ", "-")}>
                  <ListItem
                    key={text}
                    onClick={toggleDrawer(false)}
                    disablePadding
                  >
                    <ListItemButton>
                      {" "}
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                </Link>
              </Fragment>
            )
          )}
        </List>
        <div className="bg-gray-400 dark:h-1">
          <Divider />
        </div>
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary={"Change Theme"} onClick={toggleTheme} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary={"Log Out"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </div>
  );
};

export default DrawerContent;
