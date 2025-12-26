import React, { Fragment, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { ThemeContext } from "../../context/Themecontext";
import { AuthContext } from "../../context/AuthContext"
import { LogoutFromLumen } from "../../services/authApi";

const DrawerContent = ({ isActive, toggleDrawer }) => {
  const { theme } = useContext(ThemeContext);
  const { user: name, setUser } = useContext(AuthContext)

  const handleLogOut = (async () => {
    const ApiResult = await LogoutFromLumen();
    console.log(ApiResult)
    setUser("")
  })

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
          <p className="inline mr-auto ">{name ? name : "Login"}</p>
          <span
            className={`ml-auto mr-3 px-3 cursor-pointer rotate-element ${isActive ? "active-state" : ""
              }`}
            onClick={toggleDrawer(false)}
          >
            ×
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
              <ListItemText primary={<button onClick={handleLogOut}>Log Out</button>} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </div>
  );
};

export default DrawerContent;
