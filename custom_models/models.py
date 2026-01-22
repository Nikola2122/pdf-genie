from pydantic import BaseModel


class SearchRequest(BaseModel):
    query: str
    top_k: int = 5

class SearchResponse(BaseModel):
    contexts: list[dict]
    sources: list[str]

class DeleteDocument(BaseModel):
    source: str