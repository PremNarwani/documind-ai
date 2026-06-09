import os
import uuid

from fastapi import APIRouter
from fastapi import UploadFile
from fastapi import File
from fastapi import HTTPException

from app.rag.ingest import load_and_chunk_pdf
from app.services.chroma_service import store_chunks
from app.services.chat_service import create_chat

router = APIRouter()


@router.post("/upload")
async def upload_pdf(
    file: UploadFile = File(...)
):

    try:

        # Validate file type
        if not file.filename.lower().endswith(".pdf"):
            raise HTTPException(
                status_code=400,
                detail="Only PDF files are supported."
            )

        # Generate unique chat id
        chat_id = str(uuid.uuid4())

        # Ensure uploads folder exists
        os.makedirs("uploads", exist_ok=True)

        # Save uploaded file
        save_path = os.path.join(
            "uploads",
            file.filename
        )

        with open(save_path, "wb") as buffer:
            buffer.write(
                await file.read()
            )

        # Load and chunk PDF
        chunks = load_and_chunk_pdf(
            save_path
        )

        # Store embeddings in ChromaDB
        store_chunks(
            chat_id,
            chunks
        )

        # Create chat record in SQLite
        create_chat(
            chat_id,
            file.filename
        )

        return {
            "chat_id": chat_id,
            "file_name": file.filename,
            "chunks": len(chunks),
            "message": "Document uploaded successfully"
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )