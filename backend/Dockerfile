FROM python:3.11-slim

WORKDIR /app

# Install deps first (better caching)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy ONLY needed files
COPY . ./backend
COPY ../ollama_model ./ollama_model
COPY ../qdrant_utils ./qdrant_utils
COPY ../custom_models ./custom_models

CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]