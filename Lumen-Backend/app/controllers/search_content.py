from flask import jsonify, request
from ..utils.db import (
    find_all_images,
    find_text_search_result,
    find_total_count_of_text_results,
)


# route("/search", methods=["GET"])
def search_keyword():
    keyword = request.args.get("q", "").strip()
    page = int(request.args.get("page", 1))
    limit = 10

    if not keyword:
        return jsonify({"error": "search keyword required"}), 400

    skip = (page - 1) * limit

    text_search_result = find_text_search_result(
        keyword, skip, limit
    )  # use text search

    text_results = list(text_search_result)  # text search

    total_results = find_total_count_of_text_results(keyword)  # text search

    response = {
        "search_result": text_results,
        "total_results": total_results,
        "keyword": keyword,
    }

    return jsonify({"data": response, "response_code": 200}), 200


# route("/allimages", methods=["GET"])
def fetch_all_images():
    result, count = find_all_images()
    return jsonify({"result": result, "count": count})
