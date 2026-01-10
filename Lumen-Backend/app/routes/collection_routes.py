from flask import Blueprint
from flask_jwt_extended import jwt_required

from ..controllers.collection_controller import (
    save_to_collection,
    unsave_from_collection,
    get_collection_of_user,
    fetch_all_likes_of_user,
)


collection_bp = Blueprint("collection", __name__)


@collection_bp.route("/save/<img_id>", methods=["POST"])
@jwt_required()
def add_img_in_user_collection(img_id):
    return save_to_collection(img_id)


@collection_bp.route("/unsave/<img_id>", methods=["DELETE"])
@jwt_required()
def remove_img_from_user_collection(img_id):
    return unsave_from_collection(img_id)


@collection_bp.route("/collection", methods=["GET"])
@jwt_required()
def find_user_collection():
    return get_collection_of_user()


@collection_bp.route("/likes", methods=["GET"])
@jwt_required()
def fetch_all_likes():
    return fetch_all_likes_of_user()
