from fastapi import FastAPI, UploadFile, File, HTTPException
import shutil
import uuid
import os
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware

from qdrant.methods.data_ingester import store_chunks_in_qdrant
from qdrant.methods.data_loader import load_and_chunk_pdf, embed_texts
from qdrant.methods.documents_counter import all_points

load_dotenv()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = os.getenv("UPLOAD_DIR")
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.post("/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Only PDFs allowed")

    file_id = f"{uuid.uuid4()}.pdf"
    file_path = os.path.join(UPLOAD_DIR, file_id)

    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        chunks = load_and_chunk_pdf(file_path)
        embeddings = embed_texts(chunks)

        store_chunks_in_qdrant(
            chunks=chunks,
            embeddings=embeddings,
            source=file.filename
        )

        return {
            "status": "ok",
            "chunks_stored": len(chunks)
        }

    finally:
        if os.path.exists(file_path):
            os.remove(file_path)

@app.get("/documents")
def get_all_sources():
    """
    Return a list of unique source filenames stored in Qdrant
    """
    points = all_points

    sources = set()
    for point in points:
        payload = getattr(point, "payload", {}) or {}
        source = payload.get("source", "")

        if source:
            sources.add(source)

    return {"documents": list(sources), "count": len(sources)}