from typing import List, Optional
from pydantic import BaseModel, Field, field_validator
from werkzeug.exceptions import BadRequest

from backend.app.dtos.author_dto import AuthorCreateDto, AuthorResponseDto


class AuthorFindOrCreateDto(BaseModel):
    existentAuthorId: Optional[str] = None
    authorCreationPayload: Optional[AuthorCreateDto] = None


class BookCreateDto(BaseModel):
    title: str = Field(max_length=300)
    authors: List[AuthorFindOrCreateDto]
    pages: int

    @field_validator("authors")
    @classmethod
    def items_must_not_be_empty(cls, v):
        if not v:
            raise BadRequest("List of authors cannot be empty")

        for item in v:
            if not item.existentAuthorId and not item.authorCreationPayload:
                raise BadRequest("existentAuthorId or authorCreationPayload is required")

        return v


class BookResponseDto(BaseModel):
    title: str
    authors: Optional[List[AuthorResponseDto]]
    pages: int
