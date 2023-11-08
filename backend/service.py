import os

from openai import OpenAI
from openai.types.beta.threads import ThreadMessage

from backend.models import Message

client = OpenAI(api_key=os.environ["OPENAI_KEY"])


def get_messages(thread_id: str) -> list[Message]:
    messages = client.beta.threads.messages.list(thread_id=thread_id)
    prepared_messages = []
    for i, message in enumerate(messages.data):
        prepared_messages.append(_build_message(message, i == 0))
    prepared_messages.reverse()
    return prepared_messages


def _build_message(message: ThreadMessage, is_last_message: bool) -> Message:
    text = message.content[0].text.value
    if "IMAGE GENERATION PROMPT:" in text and is_last_message:
        image_url = get_image(text.replace("IMAGE GENERATION PROMPT:", ""))
        return Message(text=image_url, role=message.role, type="image")
    else:
        return Message(text=text, role=message.role, type="text")


def create_thread() -> str:
    thread = client.beta.threads.create()
    return thread.id


def reply(thread_id: str, text: str) -> None:
    client.beta.threads.messages.create(
        thread_id=thread_id,
        content=text,
        role="user",
    )
    old_messages = get_messages(thread_id)
    client.beta.threads.runs.create(
        thread_id=thread_id,
        assistant_id="asst_RrdkHpZIEPZ9bgwSE6zMGap2",
    )
    while True:
        new_messages = get_messages(thread_id)
        if len(old_messages) != len(new_messages):
            if new_messages[-1].text != "":
                break


def get_image(prompt: str) -> str:
    response = client.images.generate(
        model="dall-e-3",
        prompt=prompt,
        size="1024x1024",
        quality="standard",
        n=1,
    )
    return response.data[0].url
