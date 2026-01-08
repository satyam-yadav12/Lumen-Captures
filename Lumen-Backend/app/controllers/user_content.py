from flask import request, jsonify
from flask_jwt_extended import get_jwt
from ..services.user_content_helpers import generate_img_id, create_img_data_to_upload
from ..services.cloudinary_functions import (
    upload_user_images,
    delete_cloudinary_img_by_user,
)
from ..utils.db import (
    insert_img_data,
    update_image_details_in_db,
    search_for_user_uploads,
    delete_image_details,
    delete_all_image_likes,
)


# route("/upload-new", methods=["POST"])


def upload_new_img():
    img_data = request.form
    try:
        img = request.files["picture"]

    except Exception as e:
        return jsonify({"unexpected error occured": str(e)}), 400

    id = get_jwt()
    username = id["username"]
    Uri = ""

    try:
        if username and img and img_data:

            img_id = generate_img_id(img_data["title"])
            if img_id:
                cloudinary_response = upload_user_images(img, img_id, username)
                Uri, folder = cloudinary_response["Url"], cloudinary_response["folder"]
                img_height = cloudinary_response["img_height"]
                img_width = cloudinary_response["img_width"]

            if Uri and folder:
                img_collection_data = create_img_data_to_upload(
                    img_data, Uri, folder, username, img_id, img_height, img_width
                )

            if img_collection_data:
                insert_id = insert_img_data(img_collection_data)

            return (
                jsonify(
                    {
                        "msg": "image upload successfull",
                        "image_id": img_id,
                        "result": cloudinary_response,
                    }
                ),
                201,
            )
    except Exception as e:
        if Uri != "":
            delete_user_img(img_id)
        return (
            jsonify(
                {
                    "unexpected error occured": str(e),
                    "result": cloudinary_response,
                }
            ),
            400,
        )


# route("/uploads", methods=["GET"])


def get_user_uploads():
    cursor = request.args.get("cursor")
    limit = request.args.get("limit") or 21
    claims = get_jwt()
    id = claims.get("username")
    if id:
        user_uploads, count = search_for_user_uploads(id, cursor, limit)
    return (
        jsonify(
            {
                "msg": "user uploaded images are fetched",
                "result": user_uploads,
                "total": count,
            }
        ),
        200,
    )


# route("/uploads/<id>/update", methods=["PUT", "PATCH"])


def update_img_details(id):
    data = request.json

    updated_img = {
        "title": data["title"],
        "description": data["description"],
        "tags": data["tags"],
    }
    if updated_img:
        update_image_details_in_db(id, updated_img)
    return jsonify({"msg": "image updated"}), 200


# route("/uploads/<id>/delete", methods=["DELETE"])


def delete_user_img(id):
    user = get_jwt()["username"]
    delete_cloudinary_img_by_user(id, user, "user_uploaded_img")
    delete_image_details(id)
    delete_all_image_likes(id)
    return jsonify({"msg": "image deleted successfull"}), 200
