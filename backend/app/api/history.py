from fastapi import APIRouter

from app.database.db import SessionLocal
from app.models.chat import Chat

from app.services.chat_service import (
    delete_chat
)

router = APIRouter()


@router.get("/chats")
def get_chats():

    db = SessionLocal()

    chats = (
        db.query(Chat)
        .order_by(Chat.created_at.desc())
        .all()
    )

    db.close()

    return chats


@router.delete("/chat/{chat_id}")
def remove_chat(
    chat_id: str
):

    delete_chat(chat_id)

    return {
        "message":
        "Chat deleted successfully"
    }