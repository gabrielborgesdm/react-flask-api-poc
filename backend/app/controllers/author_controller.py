from flask import Blueprint, g

from backend.app.decorators.validation_decorator import validate_schema
from backend.app.services.management_service import ManagementService
from backend.app.schemas.author_schema import author_create_schema


blueprint = Blueprint("authors", __name__, url_prefix="/authors")
management_service = ManagementService()


@blueprint.route("/", methods=["GET"])
def get_all():
    authors = management_service.get_authors()

    return authors, 200


@blueprint.route("/", methods=["POST"])
@validate_schema(author_create_schema)
def create():
    author = management_service.create_author(g.validated_data)

    return author, 201
