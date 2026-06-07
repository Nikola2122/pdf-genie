#!/bin/sh

ollama serve &

sleep 5

ollama pull qwen2.5:0.5b

ollama pull all-minilm:latest

wait
