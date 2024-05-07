from typing import List, Optional
from pydantic import BaseModel, field_validator
from werkzeug.exceptions import BadRequest

from app.dtos.author_dto import AuthorDto


class AuthorFindOrCreateDto(BaseModel):
    existentAuthorId: Optional[str] = None
    authorCreationPayload: Optional[AuthorDto] = None


class BookCreateDto(BaseModel):
    title: str
    authors: List[AuthorFindOrCreateDto]
    pages: int

    @field_validator("authors")
    @classmethod
    def items_must_not_be_empty(cls, v):
        if not v:
            raise BadRequest("List of authors cannot be empty")

        for item in v:
            if not item.existentAuthorId and not item.authorCreationPayload:
                raise BadRequest(
                    "existentAuthorId or authorCreationPayload is required"
                )

        return v
