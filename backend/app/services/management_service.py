from backend.app.models.author_model import AuthorModel
from backend.app.models.book_model import BookModel
from backend.app.dtos.book_dto import BookCreateDto, BookResponseDto
from backend.app.dtos.author_dto import AuthorCreateDto, AuthorResponseDto
from backend.app.models.model import db


class ManagementService:
    def get_authors(self):
        authors = AuthorModel.query.all()

        return [AuthorResponseDto(**author.__dict__).__dict__ for author in authors]

    def get_books(self):
        books = BookModel.query.all()

        return [BookResponseDto(**book.__dict__).__dict__ for book in books]

    def create_author(self, author: AuthorCreateDto):
        data = author.__dict__
        with db.session.begin():
            author = AuthorModel(**data)
            db.session.add(author)
            db.session.commit()

    def create_book(self, book: BookCreateDto):
        print(book)
        with db.session.begin():
            books = BookModel.query.all()

        return books
