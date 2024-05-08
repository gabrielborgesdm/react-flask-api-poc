from flask import Blueprint
from backend.app.services.management_service import ManagementService

blueprint = Blueprint("authors", __name__, url_prefix="/authors")
management_service = ManagementService()


@blueprint.route("/", methods=["GET"])
def get_all():
    authors = management_service.get_authors()

    return authors, 200
