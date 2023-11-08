from typing import Literal

from pydantic import BaseModel


class Message(BaseModel):
    text: str
    role: Literal["user", "assistant"]
    type: Literal["text", "image"]


class ImageRequest(BaseModel):
    prompt: str


class ImageResponse(BaseModel):
    image_url: str


class ChatResponse(BaseModel):
    messages: list[Message]


class NewChatResponse(BaseModel):
    thread_id: str
    messages: list[Message]


class NewMessageRequest(BaseModel):
    thread_id: str
    message: Message
