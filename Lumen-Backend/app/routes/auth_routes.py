from flask import Blueprint, url_for, jsonify
from flask_jwt_extended import jwt_required
from ..controllers.auth_controllers import register, login, logout, get_me
from ..controllers.google_auth import authorize_by_google
from ..extensions import oauth

auth_bp = Blueprint("auth", __name__)
google = oauth.create_client("google")


@auth_bp.route("/register", methods=["POST"])
def register_user():
    return register()


@auth_bp.route("/login", methods=["POST"])
def login_user():
    return login()


@auth_bp.route("/logout", methods=["POST"])
@jwt_required()
def logout_user():
    return logout()


@auth_bp.route("/me", methods=["GET"])
@jwt_required()
def get_current_user():
    return get_me()


@auth_bp.route("/google/login")
def login_with_google():
    redirect_url = url_for("auth.get_details_from_google", _external=True)
    print(redirect_url)
    return google.authorize_redirect(redirect_url)


@auth_bp.route("/google/login/callback")
def get_details_from_google():
    return authorize_by_google(google)


@auth_bp.route("/healthz")
def check_health():
    return jsonify({"status": "ok"}), 200
