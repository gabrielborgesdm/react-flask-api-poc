from flask import Blueprint

from app.controllers.book_controller import create_book


blueprint = Blueprint("blueprint", __name__)

blueprint.route("/books", methods=["POST"])(create_book)
