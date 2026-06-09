from app.services.chroma_service import (
    client,
    embedding_model
)

def retrieve_context(
    chat_id: str,
    query: str,
    k: int = 8
):

    collection = client.get_collection(chat_id)

    query_embedding = embedding_model.encode(
        query
    ).tolist()

    results = collection.query(
    query_embeddings=[query_embedding],
    n_results=k,
    include=[
        "documents",
        "distances"
    ]
)

    return results