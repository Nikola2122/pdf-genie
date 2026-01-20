import uuid

from qdrant.vector_db import qdrant_instance, QdrantStorage


def store_chunks_in_qdrant(
    chunks: list[str],
    embeddings: list[list[float]],
    source: str,
    qdrant: QdrantStorage
):
    assert len(chunks) == len(embeddings)

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


