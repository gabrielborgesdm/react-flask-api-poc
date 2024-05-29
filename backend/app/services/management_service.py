from typing import Dict, List
from werkzeug.exceptions import BadRequest
from contextlib import contextmanager

from backend.app.models.model import db
from backend.app.models.author_model import AuthorModel
from backend.app.models.book_model import BookModel
from backend.app.schemas.author_schema import AuthorSchema, author_schema, authors_schema
from backend.app.schemas.book_schema import AuthorFindOrCreateSchema, books_schema, book_schema


class ManagementService:
    @contextmanager
    def session_scope(self):
        try:
            db.session.begin()
            yield
        except Exception as e:
            db.session.rollback()
            print(f"An error occurred: {e}")
            raise e
        finally:
            db.session.close()

    def get_authors(self):
        authors_response = []
        with self.session_scope():
            authors = db.session.query(AuthorModel).all()
            authors_response = authors_schema.dump(authors)
        return authors_response

    def get_books(self):
        books_response = []
        with self.session_scope():
            books = db.session.query(BookModel).all()
            books_response = books_schema.dump(books)

        return books_response

    def create_author(self, author_data: Dict) -> AuthorSchema:
        author_response = None

        with self.session_scope():
            author_model = AuthorModel(**author_data)
            db.session.add(author_model)
            db.session.commit()
            author_response = author_schema.dump(author_model)

        return author_response

    def create_book(self, book_dto: Dict):
        book_response = None
        with self.session_scope():
            authors = self._get_authors_for_book_creation(book_dto.get("authors"))
            del book_dto["authors"]

            book = BookModel(**book_dto)
            book.authors = authors
            db.session.add(book)
            db.session.commit()
            book_response = book_schema.dump(book)

        return book_response

    def _get_authors_for_book_creation(self, authors_dto: List[AuthorFindOrCreateSchema]):
        authors = [self._find_or_create_author(author) for author in authors_dto]

        return authors

    def _find_or_create_author(
        self, author_dto: Dict[str, AuthorFindOrCreateSchema]
    ) -> AuthorModel:
        existent_id = author_dto.get("existentAuthorId")
        if existent_id is None:
            return AuthorModel(**author_dto.get("authorCreationPayload"))

        author = db.session.get(AuthorModel, existent_id)
        if author is None:
            raise BadRequest(f"author of id {existent_id} was not found")

        return author
