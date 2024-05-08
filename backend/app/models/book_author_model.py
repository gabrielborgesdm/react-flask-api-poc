from backend.app.models.model import db

BookAuthor = db.Table(
    "BookAuthor",
    db.Column("id", db.Integer, primary_key=True),
    db.Column("bookId", db.Integer, db.ForeignKey("Book.id")),
    db.Column("authorId", db.Integer, db.ForeignKey("Author.id")),
)
