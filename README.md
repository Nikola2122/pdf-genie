# RAG Application - PDF-Genie

**PDF-Genie** is a local Retrieval-Augmented Generation (RAG) application that helps you actually use your PDF documents instead of manually searching through them.

Instead of endless scrolling or guessing keywords, you can upload PDFs and ask questions in plain language. PDF-Genie finds the most relevant parts of your documents and generates clear answers based only on their content.

Everything runs locally, so your data never leaves your machine.

---

## Features

- Manage PDFs: upload, view, and delete documents (stored persistently)  
- Ask questions using document-aware context retrieval  
- Clean, intuitive, and responsive user interface  
- Fully local LLM inference using Ollama  
- End-to-end Retrieval-Augmented Generation (RAG)  
- Fully containerized using Docker Compose  

---

## Tech Stack

| Tech                        | Purpose                                                                              |
|-----------------------------|--------------------------------------------------------------------------------------|
| **Python**                  | Core backend language, API logic, data processing                                    |
| **FastAPI**                 | Backend API, async endpoints, PDF upload, RAG orchestration                          |
| **Pydantic**                | Request/response validation, typed schemas (`SearchRequest`, `DeleteDocument`)       |
| **React + Vite**            | Frontend UI, fast dev server, component-based architecture                           |
| **Qdrant**                  | Vector database for storing and querying embeddings                                  |
| **Ollama**                  | Local LLM runtime for embeddings and answer generation                               |
| **Docker + Docker Compose** | Containerization and multi-service orchestration (frontend, backend, vector DB, LLM) |


---

## Models Used

- **Embedding model:** `nomic-embed-text:latest`
- **Generation model:** `gemma3:1b`

Both models are served locally through Ollama.

---

## How It Works (RAG Flow)

1. PDF files are uploaded through the frontend  
2. The backend extracts and chunks text from the PDFs  
3. Each chunk is converted into vector embeddings  
4. Embeddings are stored in Qdrant  
5. When a question is asked:
   - Relevant chunks are retrieved using semantic search  
   - Retrieved context is injected into the prompt  
   - The local LLM generates a response grounded in your documents  

---

## Prerequisites

You only need **Docker** installed.

Download Docker here:  
https://www.docker.com/get-started

---

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Nikola2122/pdf-genie.git
cd pdf-genie
```

---

### 2. Create a `.env` File

Create a `.env` file in the project root with the following content:

```env
EMBED_MODEL=nomic-embed-text:latest
GEN_MODEL=gemma3:1b
UPLOAD_DIR=uploads
VITE_API_URL=http://localhost:8000
OLLAMA_URL=http://ollama:11434
QDRANT_URL=http://qdrant-storage:6333
F_URL=http://localhost:5173
```

---

### 3. Start the Application

```bash
docker compose up
```

Docker will build images, pull required services, and start the full stack.

---

### 4. Open the App

Open your browser and go to:

```text
http://localhost:5173
```

---

## **API Workflow**

**PDF-Genie** uses a simple HTTP-based API to handle document ingestion, management, and Retrieval-Augmented Generation (RAG) queries.

The backend exposes the following endpoints:

- **`POST /upload-pdf`**  
  Uploads a PDF document. The backend extracts text, splits it into chunks, converts each chunk into vector embeddings, and stores them persistently in **Qdrant**.

- **`GET /documents`**  
  Returns a list of all indexed PDF documents currently stored in the system.

- **`POST /delete`**  
  Deletes a PDF document by name and removes all associated vector embeddings from the vector database.

- **`POST /query`**  
  Accepts a natural-language question, retrieves the most relevant document chunks using semantic search, injects them as context, and generates a response using a local LLM.
  When relevant context is found, answers are grounded strictly in the uploaded PDF content.
  
**Hint:**
If a query does not match any uploaded PDF content, the system may still return a response generated without document context. This occurs because the local language model is intentionally small and optimized for performance, not factual breadth. For reliable, document-grounded answers, ensure the information exists in the uploaded PDFs.

This workflow enables end-to-end document-aware question answering using local models, without exposing data outside the user’s machine.


