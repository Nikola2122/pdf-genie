from qdrant_utils.vector_db.vector_db import QdrantStorage
import os
import time
import httpx

URL = os.getenv("QDRANT_URL")

max_retries = 20
retry_interval = 2

for i in range(max_retries):
    try:
        r = httpx.get(f"{URL}/collections", timeout=5)
        if r.status_code == 200:
            print("Qdrant is ready!")
            break
    except Exception as e:
        print(f"Qdrant not ready yet ({i+1}/{max_retries})... retrying in {retry_interval}s")
        time.sleep(retry_interval)

qdrant_instance = QdrantStorage(url=URL)