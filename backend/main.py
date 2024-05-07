from flask import Flask, json
from flask_migrate import Migrate
from config import Config
from app.models.model import db
from werkzeug.exceptions import HTTPException

from app.controllers.book_controller import blueprint as books_bp
from app.controllers.author_controller import blueprint as authors_bp


app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)

app.register_blueprint(books_bp)
app.register_blueprint(authors_bp)

migrate = Migrate(app, db)


@app.errorhandler(HTTPException)
def handle_exception(e):
    """Return JSON instead of HTML for HTTP errors."""
    # start with the correct headers and status code from the error
    response = e.get_response()
    # replace the body with JSON
    response.data = json.dumps(
        {
            "code": e.code,
            "name": e.name,
            "description": e.description,
        }
    )
    response.content_type = "application/json"
    return response


if __name__ == "__main__":

    app.run()
