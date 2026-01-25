#!/bin/sh

ollama serve &

sleep 5

ollama pull gemma3:1b

ollama pull nomic-embed-text:latest

wait
