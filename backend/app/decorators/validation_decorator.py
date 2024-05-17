from flask import g, jsonify, request
from marshmallow import ValidationError
from werkzeug.exceptions import BadRequest


def validate_schema(schema):
    def decorator(f):
        def wrapper(*args, **kwargs):
            json_data = request.get_json()
            if not json_data:
                return jsonify({"message": "No input data provided"}), 400

            try:
                data = schema.load(json_data)
                g.validated_data = data
            except ValidationError as err:
                raise BadRequest(err.messages) from err
            return f(*args, **kwargs)

        wrapper.__name__ = f.__name__
        return wrapper

    return decorator
