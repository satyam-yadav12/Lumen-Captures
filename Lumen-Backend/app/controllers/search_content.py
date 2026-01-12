from flask import jsonify, request
from ..utils.db import (
    find_all_images,
    find_all_user_uploads,
    find_text_search_result,
)


# route("/search", methods=["GET"])
def search_keyword():
    cursor = request.args.get("cursor")
    limit = request.args.get("limit") or 21
    keyword = request.args.get("q", "").strip()

    if not keyword:
        return jsonify({"error": "search keyword required"}), 400

    text_search_result = find_text_search_result(
        keyword, cursor, limit
    )  # use text search

    text_results = list(text_search_result)  # text search

    return (
        jsonify(
            {
                "result": text_results,
                "count": "NA",
                "keyword": keyword,
            }
        ),
        200,
    )


# route("/allimages", methods=["GET"])
def fetch_all_images():
    cursor = request.args.get("cursor")
    limit = request.args.get("limit") or 21
    result, count = find_all_images(cursor, limit)
    return jsonify({"result": result, "count": count}), 200


def fetch_all_user_uploads():
    cursor = request.args.get("cursor")
    limit = request.args.get("limit") or 21
    result, count = find_all_user_uploads(cursor, limit)
    return jsonify({"result": result, "count": count}), 200
