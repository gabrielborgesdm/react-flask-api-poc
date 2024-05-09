import unittest
from unittest.mock import patch


from backend.app.dtos.author_dto import AuthorResponseDto
from backend.app.services.management_service import ManagementService
from backend.tests.mocks.author_mock import author_mock


class TestManagementService(unittest.TestCase):

    @patch("backend.app.models.author_model.AuthorModel.query", create=True)
    def test_get_authors_should_succeed(self, mock_query):
        books_mock_result = [
            AuthorResponseDto(**author_mock),
            AuthorResponseDto(**author_mock),
        ]
        mock_query.all.return_value = books_mock_result

        response = ManagementService().get_authors()

        self.assertEqual(len(response), len(books_mock_result))
        mock_query.all.assert_called_once()
