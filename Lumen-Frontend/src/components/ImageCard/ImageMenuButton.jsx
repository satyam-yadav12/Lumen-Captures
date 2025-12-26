import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { AlertContext } from "../../context/AlertMessage"
import { reportImageContent } from "../../services/Search_misc";
import { deleteImage } from "../../services/userContent-Profile";

export default function ImageMenuButton({ TextValues, data }) {
  const { setMessage } = React.useContext(AlertContext)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [img, setImg] = React.useState("")
  const [img_id, setImg_id] = React.useState("")

  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };
  React.useEffect(() => {
    if (data && (data.photo_image_url || data.secure_url)) {
      setImg(data.photo_image_url || data.secure_url)
      setImg_id(data.img_id)
    }

  }, [data])


  const downloadImage = async (imageUrl, fileName) => {

    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();


      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');

      a.href = url;
      a.download = fileName || 'downloaded-image';

      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);


    } catch (error) {
      console.log('Error downloading image:', error);
      window.open(imageUrl, '_blank');

    }
  }

  const editImage = ((val) => {
    console.log(val)
    setMessage(val)
  })
  const deleteImagefromLumen = (async (id) => {
    try {
      const response = await deleteImage(id)

      window.location.reload()
      setMessage("image deleted")
      console.log(response)
    }
    catch (error) {
      console.log(error)
      setMessage("request failed")
    }

  })
  const reportImage = (async (id) => {
    const payload = {
      reason: "Image report detected (auto)"
    }
    try {
      const response = await reportImageContent(id, payload)


      console.log(response)
      setMessage('Image sent for review')
    }
    catch (error) {
      console.log(error)
      setMessage("request failed")
    }

  })

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
        <img className="h-6 w-max object-contain pr-1 pl-3 mb-1 pb-1 dark:invert lg:invert shadow-2xl" src="https://cdn-icons-png.flaticon.com/128/3917/3917764.png" alt="menu" />

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


              {val == 'Download' && <button className="cursor-pointer " onClick={() => downloadImage(img, "download")}>{val}</button>}
              {val == 'Report Content' && <button className="cursor-pointer " onClick={() => reportImage(img_id)}>{val}</button>}
              {val == 'Edit Image' && <button className="cursor-pointer " onClick={() => editImage(img_id)}>{val}</button>}
              {val == 'Delete Image' && <button className="cursor-pointer " onClick={() => deleteImagefromLumen(img_id)}>{val}</button>}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}
