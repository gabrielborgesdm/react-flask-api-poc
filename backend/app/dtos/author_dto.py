from datetime import date
from pydantic import BaseModel


class AuthorDto(BaseModel):
    name: str
    birthDate: date
    nationality: str
