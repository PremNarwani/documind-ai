import chromadb

from sentence_transformers import SentenceTransformer


client = chromadb.PersistentClient(
    path="chroma_db"
)

embedding_model = SentenceTransformer(
    "BAAI/bge-small-en-v1.5"
)

def create_collection(chat_id: str):

    try:

        collection = client.get_collection(chat_id)

    except:

        collection = client.create_collection(chat_id)

    return collection

def store_chunks(chat_id, chunks):

    collection = create_collection(chat_id)

    texts = []

    ids = []

    embeddings = []

    for i, chunk in enumerate(chunks):

        text = chunk.page_content

        embedding = embedding_model.encode(
            text
        ).tolist()

        texts.append(text)

        embeddings.append(embedding)

        ids.append(f"{chat_id}_{i}")

    collection.add(
        ids=ids,
        documents=texts,
        embeddings=embeddings
    )