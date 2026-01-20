#!/bin/sh

# start Ollama server
ollama serve &

# wait a few seconds for server to start
sleep 5

# pull generation model
ollama pull gemma3:1b

# pull embedding model
ollama pull nomic-embed-text:latest

# keep the container running
wait
