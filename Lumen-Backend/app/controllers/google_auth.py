from flask import jsonify, make_response


from ..extensions import mongo
from ..services.authorization_helpers import generate_new_username
from ..services.cloudinary_functions import upload_profile_image
from ..utils.db import insert_user_data, search_by_email
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    set_access_cookies,
    set_refresh_cookies,
    decode_token,
)
from dotenv import load_dotenv
import os
from datetime import datetime, timezone


load_dotenv()


def authorize_by_google(google):
    token = google.authorize_access_token()
    id_info = token.get("userinfo")

    if not id_info:
        return jsonify({"msg": "google login fail", "status": 401})

    return generate_token_by_google_info(id_info)


def generate_token_by_google_info(data):
    Full_name = data.get("name")
    profile_picture = data.get("picture")
    email = data.get("email")
    try:
        user_registered = search_by_email(email)
        if user_registered:
            username = user_registered["Username"]
        if not user_registered:
            # generate_new_and_unique_Username write function here
            username = generate_new_username(Full_name)

            profile_img_url = "None"
            if profile_picture:
                upload_profile_img = upload_profile_image(profile_picture, username)
                profile_img_url = upload_profile_img["Url"]

            user_details = {
                "Full_name": Full_name,
                "Email": email,
                "Username": username,
                "Agree": True,
                "Profile_picture": profile_img_url,
                "created_at": datetime.now(timezone.utc),
                "Contribution_count": "None",
            }

            insert_user_data(user_details)

        # generate token
        additional = {"username": username}

        access_token = create_access_token(identity=email, additional_claims=additional)
        refresh_token = create_refresh_token(
            identity=email, additional_claims=additional
        )

        jti = decode_token(refresh_token)["jti"]
        mongo.db.jti_validation.insert_one({"jti": jti, "valid": True})

        # resp = jsonify({'msg': 'login successful', 'user name': user_details['Username'], "access_toke": access_token, "refresh_token": refresh_token, "jti": jti, "jti id": jti_id})
        redirect_uri = os.getenv("FRONTEND_ORIGIN", "http://localhost:5173")
        resp = make_response(
            f"""
            <html>
            <body>
            <div><p>Login Success</p>
            <br/>
            <a href="{redirect_uri}">Click here</a><span> to go to Home page</span>
            </body>
            <script>
            window.location.href = "{redirect_uri}";
            </script>
            </html>
            """
        )

        set_access_cookies(resp, access_token)
        set_refresh_cookies(resp, refresh_token)

        return resp
    except Exception as e:
        return jsonify({"error": {e}}), 500
