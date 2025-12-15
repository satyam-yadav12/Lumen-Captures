import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export default function ImageMenuButton({ TextValues, data }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [img, setImg] = React.useState("")
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };
  React.useEffect(() => {
    data && (data.photo_image_url) && setImg(data.photo_image_url)

  }, [data])


  const downloadImage = async (imageUrl, fileName) => {
    try {
      // 1. Fetch the image data from the URL
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      // 2. Create a temporary local URL for the blob
      const url = window.URL.createObjectURL(blob);

      // 3. Create a temporary anchor element and trigger the download
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      // Use the download attribute to suggest a file name
      a.download = fileName || 'downloaded-image.jpg';

      document.body.appendChild(a);
      a.click(); // Programmatically click the anchor to start the download
      document.body.removeChild(a);

      // 4. Clean up the temporary URL
      window.URL.revokeObjectURL(url);
      console.log('Image download initiated');

    } catch (error) {
      console.error('Error downloading image:', error);
      alert('Failed to download image. Check console for details.');
    }
  }
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
              {val == 'Download' ? <button onClick={() => downloadImage(img, "download")}>{val}</button> : val}            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}
