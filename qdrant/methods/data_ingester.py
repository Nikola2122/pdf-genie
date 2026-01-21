import uuid

from qdrant.vector_db import qdrant_instance

def store_chunks_in_qdrant(
    chunks: list[str],
    embeddings: list[list[float]],
    source: str
):
    assert len(chunks) == len(embeddings)

    if not chunks:
        raise ValueError("No chunks to store")

    if not embeddings:
        raise ValueError("No embeddings to store")

    if len(chunks) != len(embeddings):
        raise ValueError("Chunks and embeddings length mismatch")

    ids = []
    payloads = []

    for chunk in chunks:
        ids.append(str(uuid.uuid4()))
        payloads.append({
            "text": chunk,
            "source": source
        })

    qdrant_instance.upsert(
        ids=ids,
        vectors=embeddings,
        payloads=payloads
    )


