import unittest
from unittest.mock import patch
from backend.tests.conftest import app
from backend.tests.mocks.author_mock import author_create_without_name_mock, author_create_mock


class TestGetAuthors(unittest.TestCase):
    @patch("backend.app.services.management_service.ManagementService.get_authors")
    def test_get_all(self, mock_get_authors):
        authors_mock_result = [{"id": 1, "name": "Author 1"}]
        mock_get_authors.return_value = authors_mock_result

        with app.test_client() as testing_client:
            response = testing_client.get("/authors/")

            self.assertEqual(response.status_code, 200)

            self.assertEqual(
                response.json,
                authors_mock_result,
            )

            mock_get_authors.assert_called_once()


class TestCreateAuthor(unittest.TestCase):
    @patch("backend.app.services.management_service.ManagementService.create_author")
    def test_should_return_bad_request_when_author_is_empty(self, mock_create_author):
        authors_mock_result = {"title": "Author 1"}
        mock_create_author.return_value = authors_mock_result

        with app.test_client() as client:
            response = client.post("/authors/", json=author_create_without_name_mock)

            self.assertEqual(response.status_code, 400)

    @patch("backend.app.services.management_service.ManagementService.create_author")
    def test_should_succeed(self, mock_create_author):
        authors_mock_result = {"title": "Author 1"}
        mock_create_author.return_value = authors_mock_result

        with app.test_client() as client:
            response = client.post("/authors/", json=author_create_mock)

            self.assertEqual(response.status_code, 201)

            self.assertEqual(
                response.json,
                authors_mock_result,
            )

            mock_create_author.assert_called_once()
