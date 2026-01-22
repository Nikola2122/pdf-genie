from fastapi import FastAPI, UploadFile, File, HTTPException
import shutil
import uuid
import os
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware

from custom_models.models import SearchRequest, DeleteDocument
from qdrant_utils.methods.data_ingester import store_chunks_in_qdrant
from qdrant_utils.methods.data_loader import load_and_chunk_pdf, embed_texts
from qdrant_utils.methods.documents_counter import fetch_all_sources
from qdrant_utils.methods.documents_deleter import delete_source
from qdrant_utils.methods.query_helper import query_qdrant, build_context, build_prompt, query_llm

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
    """
    Upload a PDF file, process it and store it in Qdrant.
    """
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
async def get_all_sources():
    """
    Return a list of unique source filenames stored in Qdrant.
    """
    sources = fetch_all_sources()

    return {"documents": list(sources), "count": len(sources)}

@app.post("/query")
async def query(req: SearchRequest):

    search_resp = query_qdrant(req)
    contexts = search_resp.contexts
    sources = search_resp.sources
    context = build_context(contexts)
    prompt = build_prompt(context, req.query)
    llm_answer = query_llm(prompt)

    print(llm_answer)
    return {
        'status': 'ok',
        'answer': llm_answer,
        'sources': sources,
    }

@app.post("/delete/")
async def delete_source_endpoint(doc: DeleteDocument):
    try:
        delete_source(doc.source)
        return {
            'status': 'ok'
        }
    except:
        raise HTTPException(status_code=404, detail="Source not found")
