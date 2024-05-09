from flask import Blueprint
from flask_pydantic import validate

from backend.app.dtos.author_dto import AuthorCreateDto
from backend.app.services.management_service import ManagementService


blueprint = Blueprint("authors", __name__, url_prefix="/authors")
management_service = ManagementService()


@blueprint.route("/", methods=["GET"])
def get_all():
    authors = management_service.get_authors()

    return authors, 200


@blueprint.route("/", methods=["POST"])
@validate()
def create(body: AuthorCreateDto):
    management_service.create_author(body)

    return body.__dict__, 201
