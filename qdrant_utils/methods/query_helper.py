from custom_models.models import SearchRequest, SearchResponse
from qdrant_utils.methods.data_loader import embed_texts
from qdrant_utils.vector_db import qdrant_instance
from ollama_model import ollama_client
import os

GEN_MODEL = os.getenv("GEN_MODEL")


def query_qdrant(req: SearchRequest) -> SearchResponse:
    embedded_query = embed_texts([req.query])[0]
    search_result = qdrant_instance.search(embedded_query, req.top_k)

    contexts = [{'text': i['text'], 'source': i['source']} for i in search_result['contexts'] if i['score'] >= 0.6]

    return SearchResponse(
        contexts=contexts,
        sources=search_result['sources']) if len(contexts) > 0 else (
        SearchResponse(
            contexts=[],
            sources=[],
        ))


def query_llm(prompt: str):
    if not prompt:
        raise ValueError('Prompt cannot be empty')

    resp = ollama_client.chat(
        model=GEN_MODEL,
        messages=[
            {
                'role': 'user',
                'content': prompt,
            }
        ])

    return resp['message']['content']


def build_context(contexts: list[dict]) -> str:
    parts = []

    for c in contexts:
        source = c.get("source", "unknown")
        text = c.get("text", "").strip()

        if not text:
            continue

        parts.append(f"[Source: {source}]\n{text}")

    return "\n\n".join(parts)


def build_prompt(context: str, question: str) -> str:
    if context:
        return f"""You are a helpful assistant.
                Answer the question with the help of the context below,
                provide us with the answer only.

                --- CONTEXT START ---
                {context}
                --- CONTEXT END ---

                Question:
                {question}
                """
    else:
        return f"""You are a helpful assistant.
                Answer the question. 
                
                Question:
                {question}
                """

