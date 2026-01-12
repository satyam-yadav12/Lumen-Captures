from flask import jsonify, request
from flask_jwt_extended import get_jwt
from ..services.collection_helpers import create_collection_data
from ..utils.db import (
    insert_collection_data,
    delete_collection_data,
    search_collection_of_user,
    check_if_like_exist,
    update_Like_counts_in_img,
    decrement_Like_count_in_img,
    fetch_all_liked_images,
)


# route("/save/<img_id>", methods=["POST"])


def save_to_collection(img_id):
    claims = get_jwt()
    user_name = claims.get("username")
    if not user_name:
        return jsonify({"msg": "aunauthorize"}), 401
    try:
        liked = check_if_like_exist(img_id, user_name)
        if not liked:
            data = create_collection_data(img_id, user_name)
            insertion = insert_collection_data(data)
            update_Like_counts_in_img(img_id)
            return jsonify({"msg": "success", "insert id": insertion}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400


# route("/unsave/<img_id>", methods=["DELETE"])


def unsave_from_collection(img_id):
    user_name = get_jwt()["username"]
    delete_collection_data(user_name, img_id)
    decrement_Like_count_in_img(img_id)
    return jsonify({"msg": "success"}), 200


# route("/collection", methods=["GET"])


def get_collection_of_user():
    cursor = request.args.get("cursor") or None
    limit = request.args.get("limit") or 21
    claims = get_jwt()
    user_name = claims.get("username")

    if not user_name:
        return jsonify({"msg": "aunauthorize"}), 401
    collection = search_collection_of_user(user_name, cursor, limit)
    return jsonify({"msg": "success", "result": collection, "count": "NA"}), 200


def fetch_all_likes_of_user():
    claims = get_jwt()
    user_name = claims.get("username")
    if not user_name:
        return jsonify({"msg": "aunauthorize"}), 401
    collection = fetch_all_liked_images(user_name)
    return jsonify({"msg": "success", "collection": collection}), 200
