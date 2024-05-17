from marshmallow import Schema, fields, validate, validates
from marshmallow_sqlalchemy import SQLAlchemySchema, auto_field
from marshmallow_sqlalchemy.fields import Nested
from werkzeug.exceptions import BadRequest

from backend.app.models.book_model import BookModel
from backend.app.schemas.author_schema import AuthorSchema, AuthorCreateSchema


class AuthorFindOrCreateSchema(Schema):
    existentAuthorId = fields.Int()
    authorCreationPayload = fields.Nested(AuthorCreateSchema)


class BookCreateSchema(Schema):
    title = fields.Str(required=True, validate=validate.Length(max=300))
    authors = fields.Nested(AuthorFindOrCreateSchema, many=True)
    pages = fields.Int(required=True)

    @validates("authors")
    def items_must_not_be_empty(self, value):
        if not value:
            raise BadRequest("List of authors cannot be empty")

        for item in value:
            if not item.get("existentAuthorId") and not item.get("authorCreationPayload"):
                raise BadRequest("existentAuthorId or authorCreationPayload is required")


class BookSchema(SQLAlchemySchema):
    class Meta:
        model = BookModel
        include_relationships = True
        load_instance = True

    id = auto_field()
    title = auto_field()
    authors = Nested(AuthorSchema, many=True, exclude=["books"])
    pages = auto_field()


book_schema = BookSchema()
books_schema = BookSchema(many=True)

book_create_schema = BookCreateSchema()
