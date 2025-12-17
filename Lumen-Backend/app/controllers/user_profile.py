from flask import jsonify, request
from werkzeug.security import generate_password_hash
from flask_jwt_extended import get_jwt_identity, unset_jwt_cookies
from ..models.user_validation import user_registration_schema
from ..utils.db import search_by_email, update_user_data, update_without_search
from marshmallow import ValidationError
from ..services.cloudinary_functions import upload_profile_image


# route("profile", methods=["GET"])


def get_profile():
    id = get_jwt_identity()
    user_details = search_by_email(id)
    filtered_user_data = filter_userdata(user_details, ["Password", "Agree"])
    return jsonify({"user details": filtered_user_data, "response_code": 201}), 200


# route("editprofile", methods=["PUT", "PATCH"])


def edit_profile():
    data = request.json
    id = get_jwt_identity()
    Schema = user_registration_schema(partial=True)
    try:
        validate_data = Schema.load(data)
        if validate_data:
            update_user_data(id, data)

        return jsonify({"msg": "profile update successfully"}), 200

    except ValidationError as err:
        return jsonify({"error": err.messages}), 400
    except ValueError as e:
        return jsonify({"error": str(e)}), 401


# route("changepassword", methods=["PUT"])


def edit_password():
    id = get_jwt_identity()
    data = request.json
    Schema = user_registration_schema(partial=True)
    try:
        validate_data = Schema.load(data)
        hash_password = generate_password_hash(data.get("Password"))
        update_param = {"Password": hash_password}
        if validate_data:
            update_user_data(id, update_param)

        resp = jsonify({"msg": "password updated successfully"})
        unset_jwt_cookies(resp)
        return resp

    except ValueError as e:
        return jsonify({"error": str(e)}), 401
    except ValidationError as err:
        return jsonify({"error": err.messages}), 400


# route("change-profile-picture", methods=["PUT", "PATCH"])


def change_profile_picture():
    id = get_jwt_identity()

    try:
        img = request.files["Profile_picture"]
    except Exception as e:
        return jsonify({"error": "file not received"}), 400

    try:
        user_details = search_by_email(id)
        username = user_details["Username"]
        update_param = {"Profile_picture": "None"}
        if img:
            New_secure_uri = upload_profile_image(img, username)
            update_param = {"Profile_picture": New_secure_uri["Url"]}

        update_without_search(id, update_param)
        return (
            jsonify(
                {
                    "msg": "profile image updated successfully",
                    "secure_url": update_param,
                }
            ),
            200,
        )
    except ValueError as e:
        return jsonify({"error": str(e)}), 400


def filter_userdata(data, exclude_keys):
    filtered_data = {}
    for key, val in data.items():
        if key not in exclude_keys:
            filtered_data[key] = val

    return filtered_data
