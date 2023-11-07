import os

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

from openai import OpenAI

client = OpenAI(api_key=os.environ["OPENAI_KEY"])
app = FastAPI()


class ImageRequest(BaseModel):
    prompt: str


@app.get("/")
async def root():
    return {"message": "Hello World2"}


@app.post("/generate-image/")
async def generate_image(request: ImageRequest):
    if not request.prompt:
        raise HTTPException(status_code=400, detail="Prompt is required")

    # Call the OpenAI API to generate the image
    try:

        response = client.images.generate(
            model="dall-e-3",
            prompt=request.prompt,
            size="1024x1024",
            quality="standard",
            n=1,
        )

        image_url = response.data[0].url
    except Exception as e:
        # Handle exceptions (e.g., network error, invalid API key)
        raise HTTPException(status_code=500, detail=str(e))

    return {"image_url": image_url}


# Dummy run command for the FastAPI app
if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
