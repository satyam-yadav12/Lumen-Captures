from flask import jsonify, request
from marshmallow import ValidationError
from flask_jwt_extended import unset_jwt_cookies, get_jwt_identity, get_jwt
from pymongo.errors import DuplicateKeyError
from ..services.authorization_helpers import (
    validate_user_data,
    create_user_data,
    generate_and_set_tokens,
    check_password_and_user_email,
)
from ..utils.db import insert_user_data, search_by_email, delete_user
from ..services.cloudinary_functions import upload_profile_image, delete_profile_image


# route("/register", methods=["POST"])
def register():
    data = request.form
    img = request.files.get("Profile_picture")

    insertion = None
    profile_img_url = ""
    try:
        validate_data, username = validate_user_data(data)

        if img and img.filename and img.filename.strip() != "":

            upload_results = upload_profile_image(img, username)
            if upload_results["Url"]:
                profile_img_url = upload_results["Url"]
        profile_img_url = profile_img_url.replace(
            "/upload/", "/upload/w_400,h_400,c_fill,f_auto,q_auto/"
        )
        if validate_data and username:
            user_details = create_user_data(data, username, profile_img_url)
            insertion = insert_user_data(user_details)

            if insertion:
                return (
                    jsonify(
                        {
                            "msg": "user registered success fully",
                            "insertion id": insertion,
                            "validation result": validate_data,
                            "profile": profile_img_url,
                            "img": img,
                        }
                    ),
                    200,
                )
            else:
                return jsonify({"msg": "error inserting user data"}), 500
        else:
            return jsonify({"msg": "error inserting user data"}), 500

    except ValidationError as error:
        if insertion:
            delete_user(data.get("Email"))
        if profile_img_url:
            delete_profile_image(username)
        return jsonify({"msg": "some error occured", "errors": error.messages}), 400
    except DuplicateKeyError as e:
        return (
            jsonify(
                {
                    "error occured": str(e),
                    "msg": "error in generating username, Try again",
                }
            ),
            500,
        )
    except ValueError as e:
        if insertion:
            delete_user(data.get("Email"))
        if profile_img_url:
            delete_profile_image(username)
        return jsonify({"unexpected error occured": str(e)}), 400
    except Exception as e:
        if insertion:

            delete_user(data.get("Email"))
        if profile_img_url:
            delete_profile_image(username)
        return (
            jsonify(
                {
                    "unexpected error occured": str(e),
                }
            ),
            400,
        )


# route("/login", methods=["POST"])


def login():
    details = request.json

    try:
        user_details, check_password = check_password_and_user_email(details)
        if check_password and user_details:
            additional = {
                "username": user_details["Username"],
            }

            return generate_and_set_tokens(user_details, additional)
        else:
            return jsonify({"error": "incorrect user email or password"}), 401

    except ValueError as e:
        return jsonify({"error": str(e)}), 400

    except Exception as error:
        return jsonify({"error": str(error)}), 500


# route("/logout", methods=["POST"])


def logout():
    resp = jsonify({"msg": "logout Successful"})
    unset_jwt_cookies(resp)
    return resp


# route("/me", methods=["GET"])


def get_me():
    id = get_jwt_identity()
    claims = get_jwt()
    username = claims.get("username")

    if not username:
        return jsonify({"msg": "welcome !", "username": "not found"}), 401
    return jsonify({"msg": f"welcome {id}!", "username": username}), 200
