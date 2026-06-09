from app.database.db import SessionLocal

from app.models.chat import Chat
from app.models.message import Message
from app.services.chroma_service import client


def create_chat(
    chat_id: str,
    title: str
):

    db = SessionLocal()

    chat = Chat(
        id=chat_id,
        title=title
    )

    db.add(chat)

    db.commit()

    db.close()
    
def save_message(
    chat_id: str,
    role: str,
    content: str
):

    db = SessionLocal()

    message = Message(
        chat_id=chat_id,
        role=role,
        content=content
    )

    db.add(message)

    db.commit()

    db.close()
    
def get_chat_messages(
    chat_id: str
):

    db = SessionLocal()

    messages = db.query(
        Message
    ).filter(
        Message.chat_id == chat_id
    ).all()

    db.close()

    return messages

def get_chat_messages(
    chat_id: str
):

    db = SessionLocal()

    messages = db.query(
        Message
    ).filter(
        Message.chat_id == chat_id
    ).order_by(
        Message.id
    ).all()

    db.close()

    return messages

def delete_chat(
    chat_id: str
):

    db = SessionLocal()

    # Delete messages
    db.query(Message).filter(
        Message.chat_id == chat_id
    ).delete()

    # Delete chat
    db.query(Chat).filter(
        Chat.id == chat_id
    ).delete()

    db.commit()

    db.close()

    # Delete Chroma collection
    try:

        client.delete_collection(
            name=chat_id
        )

    except Exception as e:

        print(
            "Chroma delete error:",
            e
        )