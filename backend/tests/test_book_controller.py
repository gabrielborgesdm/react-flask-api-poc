import unittest
from unittest.mock import patch
from backend.main import app


class TestBookController(unittest.TestCase):

    @patch("backend.app.services.management_service.ManagementService.get_books")
    def test_get_all(self, mock_get_books):
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


if __name__ == "__main__":
    unittest.main()
