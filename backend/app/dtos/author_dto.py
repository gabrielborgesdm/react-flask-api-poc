from datetime import date
from typing import Optional
from pydantic import BaseModel, EmailStr, Field


class AuthorCreateDto(BaseModel):
    name: str = Field(max_length=300)
    email: Optional[EmailStr] = Field(max_length=320)
    nationality: Optional[str] = Field(max_length=100)
    birthDate: date


class AuthorResponseDto(BaseModel):
    name: str
    email: Optional[str]
    nationality: Optional[str]
    birthDate: date
