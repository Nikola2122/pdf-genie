from qdrant.vector_db import qdrant_instance

all_points, _ = qdrant_instance.client.scroll(
    collection_name=qdrant_instance.collection,
    limit=10000  # adjust if needed
)