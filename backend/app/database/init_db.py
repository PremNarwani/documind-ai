from app.database.db import Base
from app.database.db import engine

from app.models.chat import Chat
from app.models.message import Message


def init_db():

    Base.metadata.create_all(
        bind=engine
    )