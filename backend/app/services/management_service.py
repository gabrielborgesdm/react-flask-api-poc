from typing import Dict, List
from werkzeug.exceptions import BadRequest

from backend.app.models.model import db
from backend.app.models.author_model import AuthorModel
from backend.app.models.book_model import BookModel
from backend.app.schemas.author_schema import AuthorSchema, author_schema, authors_schema
from backend.app.schemas.book_schema import AuthorFindOrCreateSchema, books_schema, book_schema


class ManagementService:
    def get_authors(self):
        authors = db.session.query(AuthorModel).all()
        return authors_schema.dump(authors)

    def get_books(self):
        books = db.session.query(BookModel).all()
        return books_schema.dump(books)

    def create_author(self, author_data: Dict) -> AuthorSchema:
        with db.session.begin(True):
            author = AuthorModel(**author_data)
            db.session.add(author)
        return author_schema.dump(author)

    def create_book(self, book_dto: Dict):
        with db.session.begin(True):
            authors = self._get_authors_for_book_creation(book_dto.get("authors"))

            del book_dto["authors"]
            book = BookModel(**book_dto)
            book.authors = authors
            db.session.add(book)

        return book_schema.dump(book)

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
