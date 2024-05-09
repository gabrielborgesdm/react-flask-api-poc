book_create_with_invalid_author_mock = {
    "title": "Aboovk",
    "authors": [{"nonExistentProperty": "123"}],
    "pages": 100,
}

book_create_with_existent_author_id_mock = {
    "title": "Aboovk",
    "authors": [{"existentAuthorId": "123"}],
    "pages": 100,
}
