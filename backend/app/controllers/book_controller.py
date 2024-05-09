from flask import Blueprint
from flask_pydantic import validate

from backend.app.dtos.book_dto import BookCreateDto
from backend.app.services.management_service import ManagementService


blueprint = Blueprint("books", __name__, url_prefix="/books")
management_service = ManagementService()


@blueprint.route("/", methods=["GET"])
def get_all():
    books = management_service.get_books()

    return books, 200


@blueprint.route("/", methods=["POST"])
@validate()
def create(body: BookCreateDto):
    book = management_service.create_book(body)

    return book, 201
