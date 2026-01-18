#!/bin/sh
# start Ollama server
ollama serve &

# wait a few seconds for server to start
sleep 5

# pull the model into persistent volume
ollama pull gemma3:1b

# keep the container running
wait