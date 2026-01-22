from qdrant_utils.vector_db import qdrant_instance

def fetch_all_sources():
    """
    Fetch all points from Qdrant and return unique sources as a list of strings.
    Works with Qdrant's current scroll API.
    """
    client = qdrant_instance.client
    collection = qdrant_instance.collection

    sources = set()
    limit = 1000
    offset = 0

    while True:
        # Scroll using limit + offset
        points, next_offset = client.scroll(
            collection_name=collection,
            limit=limit,
            offset=offset
        )

        for point in points:
            payload = getattr(point, "payload", {}) or {}
            source = payload.get("source")
            if source:
                sources.add(source)

        if not points or next_offset is None:
            break

        offset = next_offset

    return list(sources)
