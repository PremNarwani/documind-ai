from fastapi import APIRouter

from app.services.chat_service import (
    get_chat_messages
)

router = APIRouter()


@router.get("/chat/{chat_id}")
def get_messages(
    chat_id: str
):

    messages = get_chat_messages(
        chat_id
    )

    return [
        {
            "role": m.role,
            "content": m.content
        }
        for m in messages
    ]