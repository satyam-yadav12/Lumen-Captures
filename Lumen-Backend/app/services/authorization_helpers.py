from ..models.user_validation import user_registration_schema
from ..utils.db import search_by_email, search_by_username
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    set_access_cookies,
    set_refresh_cookies,
    decode_token,
)
from datetime import datetime, timezone
from ..extensions import mongo
from flask import jsonify
import random


# validate user data for registration
def validate_user_data(data):
    Schema = user_registration_schema()

    validate_data = Schema.load(data)

    email_exist = search_by_email(data.get("Email"))
    if email_exist:
        raise ValueError("Email already registered")
    username = generate_new_username(data.get("Full_name"))
    return True, username


# create user data for registration
def create_user_data(data, username, profile_url):
    hashed_password = generate_password_hash(data.get("Password"))
    user_details = {
        "Full_name": data.get("Full_name"),
        "Email": data.get("Email"),
        "Password": hashed_password,
        "Username": username,
        "City": data.get("City"),
        "Agree": data.get("Agree"),
        "Profile_picture": profile_url,
        "created_at": datetime.now(timezone.utc),
        "Contribution_count": "None",
    }
    return user_details


def generate_new_username(
    full_name,
):  # write function to generate random and unique username
    username = full_name.split(" ")
    username = "_".join(username).lower()
    count = 0
    check = True

    while check:
        if count != 0:
            random_nums = random.randint(10, 9999)
            username = username + str(random_nums)

        mongo_result = search_by_username(username)
        if not mongo_result:
            check = False
        else:
            count += 1
    return username


# generate JWT token for Login


def generate_and_set_tokens(user_details, additional):
    access_token = create_access_token(
        identity=user_details["Email"], additional_claims=additional
    )
    refresh_token = create_refresh_token(
        identity=user_details["Email"], additional_claims=additional
    )

    jti = decode_token(refresh_token)["jti"]
    jti_id = mongo.db.jti_validation.insert_one(
        {"jti": jti, "valid": True}
    ).inserted_id  # replace mongo query with utils function

    resp = jsonify({"msg": "login successful", "user name": user_details["Username"]})

    set_access_cookies(resp, access_token)
    set_refresh_cookies(resp, refresh_token)

    return resp


# check password and user email for Login
def check_password_and_user_email(data):
    user_details = search_by_email(data.get("Email"))
    password = data.get("Password")

    if user_details is None:
        raise ValueError("user not exist")

    check_password = check_password_hash(user_details["Password"], password)

    if not check_password:
        raise ValueError("incorrect password")

    return user_details, True
