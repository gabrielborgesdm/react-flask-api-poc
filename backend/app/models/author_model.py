from backend.app.models.model import db
from backend.app.models.book_author_model import BookAuthor


class AuthorModel(db.Model):
    __tablename__ = "Author"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(300), nullable=False)
    nationality = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(320), nullable=True)
    birthDate = db.Column(db.Date, nullable=True)
    books = db.relationship("BookModel", secondary=BookAuthor, back_populates="authors")
