import unittest
from flask import Flask

from backend.app.handlers.http_error_handler import handle_exception

from backend.app.models.model import db

from backend.app.controllers.book_controller import blueprint as books_bp
from backend.app.controllers.author_controller import blueprint as authors_bp


app = Flask(__name__)
app.config["TESTING"] = True
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///:memory:"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db.init_app(app)

app.register_blueprint(books_bp)
app.register_blueprint(authors_bp)
app.register_error_handler(400, handle_exception)


class BaseTestCase(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.app = app
        cls.app_context = cls.app.app_context()
        cls.app_context.push()
        cls.db = db

    @classmethod
    def tearDownClass(cls):
        cls.app_context.pop()

    def setUp(self):
        self.db.session.close()
        self.reset_db()

    def reset_db(self):
        self.db.drop_all()
        self.db.create_all()
