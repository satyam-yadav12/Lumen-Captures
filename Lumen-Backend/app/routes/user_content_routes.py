from flask import Flask, Blueprint
from flask_jwt_extended import jwt_required

from ..controllers.user_profile import (
    get_profile,
    edit_profile,
    edit_password,
    change_profile_picture,
)
from ..controllers.user_content import (
    upload_new_img,
    get_user_uploads,
    update_img_details,
    delete_user_img,
    find_img,
)

user_profile_bp = Blueprint("user", __name__)


@user_profile_bp.route("/profile", methods=["GET"])
@jwt_required()
def fetch_user_profile():
    return get_profile()


@user_profile_bp.route("/editprofile", methods=["PUT", "PATCH"])
@jwt_required()
def edit_user_profile():
    return edit_profile()


@user_profile_bp.route("/changepassword", methods=["PUT"])
@jwt_required()
def edit_user_password():
    return edit_password()


@user_profile_bp.route("/change-profile-picture", methods=["PUT", "PATCH"])
@jwt_required()
def replace_profile_picture():
    return change_profile_picture()


@user_profile_bp.route("/upload-new", methods=["POST"])
@jwt_required()
def user_upload_img():
    return upload_new_img()


@user_profile_bp.route("/uploads", methods=["GET"])
@jwt_required()
def find_img_uploaded_by_user():
    return get_user_uploads()


@user_profile_bp.route("/uploads/<id>/update", methods=["PUT", "PATCH"])
@jwt_required()
def edit_img_data(id):
    return update_img_details(id)


@user_profile_bp.route("/uploads/<id>/delete", methods=["DELETE"])
@jwt_required()
def delete_img_data(id):
    return delete_user_img(id)


@user_profile_bp.route("/uploads/<id>", methods=["GET"])
def fetch_img(id):
    return find_img(id)
