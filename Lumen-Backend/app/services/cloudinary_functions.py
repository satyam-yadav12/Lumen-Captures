import cloudinary
import cloudinary.uploader


# user_profile_operations
def upload_profile_image(img, username):
    upload_results = cloudinary.uploader.upload(
        img, public_id=username, folder="Profile_pictures", overwrite=True
    )
    if upload_results["secure_url"]:
        return {
            "msg": "profile image updated successfuly",
            "Url": upload_results["secure_url"],
            "response_code": 201,
        }
    else:
        return None


def delete_profile_image(username):
    delete = cloudinary.uploader.destroy(
        f"Profile_pictures/{username}", invalidate=True
    )
    return {"msg": "profile image deleted successfully"}


# user content operations
def upload_user_images(img, public_name, user):
    upload_results = cloudinary.uploader.upload(
        img,
        public_id=f"{user}/{public_name}",
        folder="user_uploaded_img",
        overwrite=True,
    )
    return {
        "msg": "image uploaded successfully",
        "Url": upload_results["secure_url"],
        "folder": f"user_uploaded_img/{user}",
        "result": upload_results,
        "img_height": upload_results["height"],
        "img_width": upload_results["width"],
        "response_code": 201,
    }


def delete_cloudinary_img_by_user(public_name, prefix, folder):
    delete = cloudinary.uploader.destroy(
        f"{folder}/{prefix}/{public_name}", invalidate=True
    )
    return {"msg": "image deleted successfully"}
