from flask import Blueprint
from flask_jwt_extended import jwt_required
from ..controllers.feedback_controller import (
    send_feedback,
    send_content_violetion_report,
    fetch_feedback_data,
)

feedback_bp = Blueprint("feedback", __name__)


@feedback_bp.route("/feedback", methods=["POST"])
def add_feedback():
    return send_feedback()


@feedback_bp.route("/fetchfeedback", methods=["GET"])
def fetch_feedback():
    return fetch_feedback_data()


@feedback_bp.route("/reportcontent/<id>", methods=["POST"])
@jwt_required()
def report_an_image(id):
    return send_content_violetion_report(id)
