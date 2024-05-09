import unittest
from unittest.mock import patch

from backend.tests import app
from backend.tests.mocks.books_mock import (
    book_create_with_invalid_author_mock,
    book_create_with_existent_author_id_mock,
)


class TestBookController(unittest.TestCase):

    @patch("backend.app.services.management_service.ManagementService.get_books")
    def test_get_all_Should_succeed(self, mock_get_books):
        books_mock_result = [{"title": "Book 1"}, {"title": "Book 2"}]
        mock_get_books.return_value = books_mock_result

        with app.test_client() as client:
            response = client.get("/books/")

            self.assertEqual(response.status_code, 200)

            self.assertEqual(
                response.json,
                books_mock_result,
            )

            mock_get_books.assert_called_once()

    @patch("backend.app.services.management_service.ManagementService.create_book")
    def test_create_book_Should_return_bad_request_When_author_is_empty(
        self, mock_create_book
    ):
        books_mock_result = {"title": "Book 1"}
        mock_create_book.return_value = books_mock_result

        with app.test_client() as client:
            response = client.post("/books/", json=book_create_with_invalid_author_mock)

            self.assertEqual(response.status_code, 400)
            self.assertEqual(
                response.json["description"],
                "existentAuthorId or authorCreationPayload is required",
            )

    @patch("backend.app.services.management_service.ManagementService.create_book")
    def test_create_book_Should_succeed(self, mock_create_book):
        books_mock_result = {"title": "Book 1"}
        mock_create_book.return_value = books_mock_result

        with app.test_client() as client:
            response = client.post(
                "/books/", json=book_create_with_existent_author_id_mock
            )

            self.assertEqual(response.status_code, 201)

            self.assertEqual(
                response.json,
                books_mock_result,
            )

            mock_create_book.assert_called_once()


if __name__ == "__main__":
    unittest.main()
