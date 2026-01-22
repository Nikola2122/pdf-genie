import uuid

from qdrant_utils.vector_db import qdrant_instance

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


