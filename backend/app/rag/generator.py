from app.services.gemini_service import llm


def generate_answer(
    question: str,
    context: str,
    chat_history: str = ""
):

    prompt = f"""
You are a helpful assistant.

Use the conversation history and context
to answer the question.

If answer is not present in the context,
say:

I could not find information in the uploaded document.

Conversation History:
{chat_history}

Context:
{context}

Question:
{question}
"""

    response = llm.invoke(prompt)

    return response.content