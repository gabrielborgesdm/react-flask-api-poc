from flask import Blueprint


blueprint = Blueprint("books", __name__, url_prefix="/books")


@blueprint.route("/", methods=["GET"])
def create_book():
    return "hi"
