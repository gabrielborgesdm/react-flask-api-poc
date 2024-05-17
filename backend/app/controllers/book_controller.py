from flask import Blueprint, g

from backend.app.decorators.validation_decorator import validate_schema
from backend.app.services.management_service import ManagementService
from backend.app.schemas.book_schema import book_create_schema


blueprint = Blueprint("books", __name__, url_prefix="/books")
management_service = ManagementService()


@blueprint.route("/", methods=["GET"])
def get_all():
    books = management_service.get_books()

    return books, 200


@blueprint.route("/", methods=["POST"])
@validate_schema(book_create_schema)
def create():
    book = management_service.create_book(g.validated_data)

    return book, 201
