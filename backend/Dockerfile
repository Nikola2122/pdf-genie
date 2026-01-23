FROM python:3.11-slim

WORKDIR /app

COPY ./backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY ./backend ./backend
COPY ./ollama_model ./ollama_model
COPY ./qdrant_utils ./qdrant_utils
COPY ./custom_models ./custom_models

CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]