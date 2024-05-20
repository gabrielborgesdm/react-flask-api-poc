from flask import Flask
from flask_cors import CORS
from flask_marshmallow import Marshmallow
from flask_migrate import Migrate
from backend.app.handlers.http_error_handler import handle_exception
from backend.config import Config

from backend.app.models.model import db

from backend.app.controllers.book_controller import blueprint as books_bp
from backend.app.controllers.author_controller import blueprint as authors_bp


app = Flask(__name__)
app.config.from_object(Config)

cors = CORS(app)


app.register_blueprint(books_bp)
app.register_blueprint(authors_bp)
app.register_error_handler(400, handle_exception)

db.init_app(app)

migrate = Migrate(app, db)
ma = Marshmallow(app)
