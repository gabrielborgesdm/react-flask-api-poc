from backend.app.models.model import db
from backend.app.models.book_author_model import BookAuthor


class BookModel(db.Model):
    __tablename__ = "Book"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(300), nullable=False)
    pages = db.Column(db.Integer, nullable=False)
    authors = db.relationship("AuthorModel", secondary=BookAuthor, back_populates="books")
