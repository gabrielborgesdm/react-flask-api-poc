from app.models.model import db
from app.models.book_author_model import BookAuthor


class BookModel(db.Model):
    __tablename__ = "Book"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(300), nullable=False)
    email = db.Column(db.String(320), nullable=True)
    nationality = db.Column(db.String(100), nullable=False)
    birthDate = db.Column(db.Date, nullable=False)
    authors = db.relationship("AuthorModel", secondary=BookAuthor, backref="Book")
