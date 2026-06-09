from fastapi import FastAPI

from app.services.gemini_service import (
    test_llm
)

from app.api.upload import (
    router as upload_router
)

from app.api.chat import (
    router as chat_router
)

from app.api.history import (
    router as history_router
)

from app.api.messages import (
    router as messages_router
)

from fastapi.middleware.cors import (
    CORSMiddleware
)

from app.database.init_db import (
    init_db
)

# Create FastAPI app
app = FastAPI(
    title="DocuMind AI",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize database
init_db()

# Register routers
app.include_router(upload_router)
app.include_router(chat_router)
app.include_router(history_router)
app.include_router(messages_router)


@app.get("/")
def home():

    return {
        "message":
        "DocuMind AI Backend Running"
    }


@app.get("/test-llm")
def test():

    return {
        "response":
        test_llm()
    }