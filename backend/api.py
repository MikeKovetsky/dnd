from fastapi import FastAPI, HTTPException
from starlette.middleware.cors import CORSMiddleware

from backend.models import ChatResponse, NewMessageRequest, ImageResponse, ImageRequest, NewChatResponse
from backend.service import get_messages, get_image, reply, create_thread

app = FastAPI(
    title="DnD helper API",
    description="API for generating images for DnD helper app",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["Content-Disposition"]
)


@app.get("/")
async def root():
    return {"message": "Hello World2"}


@app.post("/image", response_model=ImageResponse)
async def generate_image(request: ImageRequest):
    if not request.prompt:
        raise HTTPException(status_code=400, detail="Prompt is required")
    try:
        image_url = get_image(request.prompt)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    return ImageResponse(image_url=image_url)


@app.get("/chat/{thread_id}", response_model=ChatResponse)
async def get_chat(thread_id: str):
    return ChatResponse(messages=get_messages(thread_id))


@app.post("/chat", response_model=NewChatResponse)
async def create_chat():
    thread_id = create_thread()
    return NewChatResponse(thread_id=thread_id, messages=get_messages(thread_id))


@app.put("/chat", response_model=ChatResponse)
async def reply_chat(request: NewMessageRequest):
    reply(request.thread_id, request.message.text)
    return ChatResponse(messages=get_messages(request.thread_id))


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
