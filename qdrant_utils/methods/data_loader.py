from llama_index.readers.file import PDFReader
from llama_index.core.node_parser import SentenceSplitter
from llama_index.core import Document
from ollama_model import ollama_client
import os

EMBED_MODEL = os.getenv("EMBED_MODEL")

splitter = SentenceSplitter(
    chunk_size=1000,
    chunk_overlap=200
)

def load_and_chunk_pdf(path: str) -> list[str]:
    if not path:
        raise ValueError("No path provided")

    docs = PDFReader().load_data(file=path)

    documents = [
        Document(text=d.text)
        for d in docs
        if getattr(d, "text", None)
    ]

    nodes = splitter.get_nodes_from_documents(documents)

    return [node.text for node in nodes]

def embed_texts(texts: list[str]) -> list[list[float]]:
    if not texts:
        raise ValueError("No texts provided")

    response = ollama_client.embed(
        model=EMBED_MODEL,
        input=texts
    )
    return response["embeddings"]



