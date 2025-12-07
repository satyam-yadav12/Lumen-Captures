import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export default function ImageMenuButton({ TextValues }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={(e) => {
          e.stopPropagation();
          setAnchorEl(e.currentTarget);
        }}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/128/3917/3917764.png"
          alt="Menu"
          className="h-6 w-max object-contain pr-1 pl-3 mb-1 pb-1 dark:invert"
        />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={(e) => {
          e.stopPropagation();
          handleClose(null);
        }}
        slotProps={{
          list: {
            "aria-labelledby": "basic-button",
          },
        }}
      >
        {TextValues.map((val, index) => {
          return (
            <MenuItem
              onClick={(e) => {
                e.stopPropagation();
                handleClose(null);
              }}
              key={index}
            >
              {val}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}
