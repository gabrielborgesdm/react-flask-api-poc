from flask import Flask
from flask_migrate import Migrate
from backend.config import Config
from backend.app.models.model import db

from backend.app.controllers.book_controller import blueprint as books_bp
from backend.app.controllers.author_controller import blueprint as authors_bp


app = Flask(__name__)
app.config.from_object(Config)


app.register_blueprint(books_bp)
app.register_blueprint(authors_bp)

migrate = Migrate(app, db)

if __name__ == "__main__":
    db.init_app(app)
    app.run()
