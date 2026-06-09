from fastapi import APIRouter
from pydantic import BaseModel

from app.rag.retriever import retrieve_context
from app.rag.generator import generate_answer

from app.services.search_service import google_search
from app.services.chat_service import (
    save_message,
    get_chat_messages
)

router = APIRouter()


class ChatRequest(BaseModel):
    chat_id: str
    question: str


@router.post("/chat")
def chat(request: ChatRequest):

    # Save user message
    save_message(
        request.chat_id,
        "user",
        request.question
    )

    # Load chat history
    history_messages = get_chat_messages(
        request.chat_id
    )

    chat_history = ""

    for msg in history_messages:
        chat_history += (
            f"{msg.role}: {msg.content}\n"
        )

    # Retrieve context from ChromaDB
    results = retrieve_context(
        request.chat_id,
        request.question
    )

    documents = results["documents"][0]
    distances = results["distances"][0]

    best_distance = (
        distances[0]
        if distances and len(distances) > 0
        else 999
    )

    print("\n" + "=" * 50)
    print("QUESTION:", request.question)
    print("CHAT ID:", request.chat_id)
    print("DISTANCES:", distances)
    print("BEST DISTANCE:", best_distance)
    print("=" * 50 + "\n")

    DISTANCE_THRESHOLD = 2.0

    use_document = (
        documents
        and len(documents) > 0
        and best_distance < DISTANCE_THRESHOLD
    )

    # ==================================
    # ANSWER FROM DOCUMENT
    # ==================================https://github.com/PremNarwani/documind-ai.git

    if use_document:

        context = "\n".join(documents)

        answer = generate_answer(
            request.question,
            context,
            chat_history
        )

        save_message(
            request.chat_id,
            "assistant",
            answer
        )

        return {
            "source": "document",
            "answer": answer
        }

    # ==================================
    # GOOGLE / WEB FALLBACK
    # ==================================

    print(
        "No relevant document found. Using Google Search."
    )

    google_context = google_search(
        request.question
    )

    print("\nGOOGLE CONTEXT:")
    print(google_context)
    print()

    if (
        not google_context
        or google_context == "No result found"
    ):

        answer = (
            "I could not find information in the uploaded "
            "document or from Web Search."
        )

    else:

        web_context = f"""
The answer was not found in the uploaded document.

Use the following web search results to answer the user's question:

{google_context}
"""

        web_answer = generate_answer(
            request.question,
            web_context,
            chat_history
        )

        answer = f"""
⚠️ Information not found in the uploaded document.

🌐 Answer generated using Web Search:

{web_answer}
"""

    save_message(
        request.chat_id,
        "assistant",
        answer
    )

    return {
        "source": "google",
        "answer": answer
    }