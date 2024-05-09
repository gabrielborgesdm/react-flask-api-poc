import unittest
from unittest.mock import patch
from backend.tests import app


class TestAuthorController(unittest.TestCase):

    @patch("backend.app.services.management_service.ManagementService.get_authors")
    def test_get_all(self, mock_get_authors):
        books_mock_result = [{"name": "Author 1"}]
        mock_get_authors.return_value = books_mock_result

        with app.test_client() as client:
            response = client.get("/authors/")

            self.assertEqual(response.status_code, 200)

            self.assertEqual(
                response.json,
                books_mock_result,
            )

            mock_get_authors.assert_called_once()


if __name__ == "__main__":
    unittest.main()
