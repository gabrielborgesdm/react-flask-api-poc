from marshmallow import Schema, fields, validate
from marshmallow_sqlalchemy import SQLAlchemySchema, auto_field
from marshmallow_sqlalchemy.fields import Nested

from backend.app.models.author_model import AuthorModel


class AuthorCreateSchema(Schema):
    name = fields.Str(required=True, validate=validate.Length(min=1, max=300))
    email = fields.Email(validate=validate.Length(min=1, max=320))
    nationality = fields.Str(required=True, validate=validate.Length(min=1, max=100))
    birthDate = fields.Date()


class AuthorSchema(SQLAlchemySchema):
    class Meta:
        model = AuthorModel
        include_relationships = True
        load_instance = True

    id = auto_field()
    name = auto_field()
    email = auto_field()
    nationality = auto_field()
    birthDate = auto_field()
    books = Nested("BookSchema", many=True, exclude=["authors"])


author_schema = AuthorSchema()
authors_schema = AuthorSchema(many=True)

author_create_schema = AuthorCreateSchema()
