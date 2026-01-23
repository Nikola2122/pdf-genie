from ollama import Client
import os

URL = os.getenv('OLLAMA_URL')

ollama_client = Client(host=URL)