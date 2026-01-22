from qdrant_client.http import models as rest
from qdrant_utils.vector_db import qdrant_instance

def delete_source(source_value: str):
    qdrant_instance.client.delete(
        collection_name=qdrant_instance.collection,
        points_selector=rest.Filter(
            must=[
                rest.FieldCondition(
                    key="source",
                    match=rest.MatchValue(value=source_value)
                )
            ]
        )
    )