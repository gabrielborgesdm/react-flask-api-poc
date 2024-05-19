from backend.tests.mocks.author_mock import author_create_mock

book_create_with_invalid_author_mock = {
    "title": "Aboovk",
    "authors": [{"nonExistentProperty": "123"}],
    "pages": 100,
}

book_create_mock = {
    "title": "Aboovk",
    "authors": [{"authorCreationPayload": author_create_mock}],
    "pages": 100,
}


def get_book_with_authors(authors):
    return {
        "title": "Aboovk",
        "authors": authors,
        "pages": 100,
    }
