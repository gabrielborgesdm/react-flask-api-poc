from datetime import date
from werkzeug.exceptions import BadRequest

from backend.tests.conftest import BaseTestCase
from backend.tests.mocks.author_mock import author_create_mock, author_create_without_name_mock
from backend.tests.mocks.mock_utils import get_mock_with_custom_args
from backend.tests.mocks.books_mock import (
    book_create_with_invalid_author_mock,
    get_book_with_authors,
)

from backend.app.services.management_service import ManagementService

management_service = ManagementService()

author_mock = get_mock_with_custom_args(author_create_mock, birthDate=date.today())
book_mock = get_book_with_authors([{"authorCreationPayload": author_mock}])


class TestCreateBook(BaseTestCase):
    def test_should_create_book_and_its_author(self):
        book = management_service.create_book(book_mock)

        self.assertEqual(len(management_service.get_authors()), 1)

        self.assertEqual(book.get("title"), book_mock.get("title"))
        self.assertEqual(book.get("pages"), book_mock.get("pages"))

    def test_should_throw_when_author_is_inexistent(self):
        self.assertEqual(len(management_service.get_authors()), 0)

        with self.assertRaises(BadRequest):
            book_with_inexistent_author_mock = get_book_with_authors([{"existentAuthorId": 1}])
            management_service.create_book(book_with_inexistent_author_mock)

    def test_should_create_book_and_find_a_created_author(self):
        author = management_service.create_author(author_mock)

        self.assertIsNotNone(author.get("id"))
        book = management_service.create_book(
            get_book_with_authors([{"existentAuthorId": author.get("id")}])
        )

        self.assertEqual(len(management_service.get_authors()), 1)

        self.assertEqual(book.get("title"), book_mock.get("title"))
        self.assertEqual(book.get("pages"), book_mock.get("pages"))

    def test_should_fail_when_book_does_not_have_required_field(self):
        with self.assertRaises(Exception):
            management_service.create_book(book_create_with_invalid_author_mock)


class TestCreateAuthor(BaseTestCase):
    def test_should_create_author(self):
        author = management_service.create_author(author_mock)
        self.assertEqual(author.get("name"), author_mock.get("name"))
        self.assertEqual(author.get("email"), author_mock.get("email"))

    def test_should_fail_when_author_does_not_have_required_field(self):
        with self.assertRaises(Exception):
            management_service.create_author(author_create_without_name_mock)


class TestGetAuthors(BaseTestCase):
    def test_count_should_start_being_zero(self):
        authors = management_service.get_authors()
        self.assertEqual(len(authors), 0)

    def test_should_have_one_author_after_creation(self):

        author = management_service.create_author(author_mock)

        authors = management_service.get_authors()
        self.assertEqual(len(authors), 1)
        self.assertEqual(author.get("name"), authors[0].get("name"))
