from sqlalchemy import Column
from sqlalchemy import String
from sqlalchemy import DateTime

from datetime import datetime

from app.database.db import Base


class Chat(Base):

    __tablename__ = "chats"

    id = Column(
        String,
        primary_key=True
    )

    title = Column(
        String
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )