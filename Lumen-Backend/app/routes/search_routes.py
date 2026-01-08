from flask import Blueprint
from flask_jwt_extended import jwt_required

from ..controllers.search_content import (
    search_keyword,
    fetch_all_images,
    fetch_all_user_uploads,
)

search_bp = Blueprint("search", __name__)


@search_bp.route("/search", methods=["GET"])
def search_img():
    return search_keyword()


@search_bp.route("/allimages", methods=["GET"])
def find_all_img():
    return fetch_all_images()


@search_bp.route("/source", methods=["GET"])
def filter_user_uploads():
    return fetch_all_user_uploads()
