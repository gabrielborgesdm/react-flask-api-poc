from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy

from app.controllers.book_controller import blueprint as books_bp

app = Flask(__name__)
app.config.from_object(Config)
app.register_blueprint(books_bp)
db = SQLAlchemy(app)

if __name__ == "__main__":
    app.run(debug=True)
