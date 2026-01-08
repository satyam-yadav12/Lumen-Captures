from ..extensions import mongo
from bson import ObjectId


# database name auth_student
def search_by_email(email):
    user_details = mongo.db.auth_student.find_one({"Email": email})

    return user_details


def search_by_username(username):
    user_details = mongo.db.auth_student.find_one({"Username": username})

    return user_details


def insert_user_data(data):
    insertion_id = mongo.db.auth_student.insert_one(data).inserted_id
    return insertion_id


def update_user_data(email, data):
    user_details = search_by_email(email)
    if not user_details:
        raise ValueError("email not registered")
    mongo.db.auth_student.update_one({"Email": email}, {"$set": data})


def update_without_search(email, data):
    mongo.db.auth_student.update_one({"Email": email}, {"$set": data})


def delete_user(email):
    exist = search_by_email(email)
    if exist:
        mongo.db.auth_student.delete_one({"Email": email})
    return


# database name user_imgs #used nowhere
def search_for_img_name(public_name):
    img_details = mongo.db.user_imgs.find_one({"img_id": public_name})
    return img_details


def insert_img_data(data):
    insertion_id = mongo.db.user_imgs.insert_one(data).inserted_id
    return insertion_id


def update_image_details_in_db(img_id, update_data):
    mongo.db.user_imgs.update_one({"img_id": img_id}, {"$set": update_data})
    return {"msg": "success"}


def search_for_user_uploads(user, cursor, limit):
    if cursor:
        query = {
            "username": user,
            "_id": {"$lt": ObjectId(cursor)},
        }
    else:
        query = {"username": user}
    limit = int(limit)
    result = mongo.db.user_imgs.find(query).sort({"_id": -1}).limit(limit)
    count = mongo.db.user_imgs.count_documents({"username": user})
    return result, count


def update_Like_counts_in_img(img_id):
    mongo.db.user_imgs.update_one({"img_id": img_id}, {"$inc": {"count_of_likes": 1}})
    return True


def decrement_Like_count_in_img(img_id):
    mongo.db.user_imgs.update_one({"img_id": img_id}, {"$inc": {"count_of_likes": -1}})
    return True


def delete_image_details(img_id):
    mongo.db.user_imgs.delete_one({"img_id": img_id})
    return {"msg": "success"}


def find_all_user_uploads(cursor, limit):
    if cursor:
        query = {"source": "lumen", "_id": {"$lt": ObjectId(cursor)}}
    else:
        query = {"source": "lumen"}

    limit = int(limit)
    result = mongo.db.user_imgs.find(query).sort({"_id": -1}).limit(limit)
    count = mongo.db.user_imgs.count_documents({"source": "lumen"})
    return result, count


# search related queries


# def find_search_results_title(keyword, skip, limit):
#     result = (
#         mongo.db.user_imgs.find({"title": {"$regex": keyword, "$options": "i"}})
#         .skip(skip)
#         .limit(limit)
#     )
#     return result


# def find_search_results_tags(keyword, skip, limit):
#     result = (
#         mongo.db.user_imgs.find({"tags": {"$regex": keyword, "$options": "i"}})
#         .skip(skip)
#         .limit(limit)
#     )
#     return result


# updated search on index
def find_text_search_result(keyword, cursor, limit):
    if cursor:
        query = {"$text": {"$search": keyword}, "_id": {"$lt": ObjectId(cursor)}}

    else:
        query = {"$text": {"$search": keyword}}

    limit = int(limit)

    results = mongo.db.user_imgs.find(query).sort({"_id": -1}).limit(limit)

    return results


def find_total_count_of_text_results(keyword):
    result = mongo.db.user_imgs.count_documents({"$text": {"$search": keyword}})
    return result


# use index based text search
# def find_total_count_of_results_title(keyword):
#     result = mongo.db.user_imgs.count_documents(
#         {"title": {"$regex": keyword, "$options": "i"}}
#     )
#     return result


# def find_total_count_of_results_tag(keyword):
#     result = mongo.db.user_imgs.count_documents(
#         {"tags": {"$regex": keyword, "$options": "i"}}
#     )
#     return result


def find_all_images(cursor, limit):
    if cursor:
        query = {"_id": {"$lt": ObjectId(cursor)}}
    else:
        query = {}

    limit = int(limit)
    result = mongo.db.user_imgs.find(query).sort({"_id": -1}).limit(limit)
    count = mongo.db.user_imgs.count_documents({})
    return result, count


# database name user_collection
def insert_collection_data(data):
    insert_id = mongo.db.user_collection.insert_one(data).inserted_id
    return insert_id


def delete_collection_data(user, img):
    mongo.db.user_collection.delete_one({"username": user, "img_id": img})
    return {"msg": "success"}


def search_collection_of_user(user, cursor, limit):
    match_stage = {"user.username": user}
    if cursor:
        match_stage["_id"] = {"$lt": ObjectId(cursor)}

    limit = int(limit)
    response = mongo.db.user_imgs.aggregate(
        [
            {
                "$lookup": {
                    "from": "user_collection",
                    "localField": "img_id",
                    "foreignField": "img_id",
                    "as": "user",
                }
            },
            {"$unwind": "$user"},
            {"$match": match_stage},
            {"$sort": {"_id": -1}},
            {"$limit": limit},
        ]
    )
    result = list(response)

    return result


def delete_all_image_likes(id):
    result = mongo.db.user_collection.delete_many({"img_id": id})
    return result


def check_if_like_exist(id, user):
    result = mongo.db.user_collection.find_one({"img_id": id, "username": user})
    if result:
        raise Exception("like exist")
    return False


# database name counters
def increment_counter(name):
    counter = mongo.db.counters.find_one_and_update(
        {"counter_id": name},
        {"$inc": {"sequence_value": 1}},
        return_document=True,
        upsert=True,
    )
    return counter["sequence_value"]


# database name user_feedback
def insert_feedback_data(data):
    insertion = mongo.db.user_feedback.insert_one(data).inserted_id
    return insertion


def find_all_feedbacks():
    result = mongo.db.user_feedback.find({})
    return result


# database name content_report
def insert_content_report(data):
    insertion = mongo.db.content_report.insert_one(data).inserted_id
    return insertion


# refresh token helper


def token_is_not_revoked(token):
    jti_details = mongo.db.jti_validation.find_one({"jti": token})
    if not jti_details:
        return "found_nothing"
    if jti_details["valid"]:
        return jti_details
    else:
        return jti_details


def revoke_refresh_token(token):
    mongo.db.jti_validation.update_one({"jti": token}, {"$set": {"valid": False}})
    return True


def save_new_jti(token):
    mongo.db.jti_validation.insert_one({"jti": token, "valid": True})
    return True
