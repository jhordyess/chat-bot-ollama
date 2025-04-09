#!/bin/bash

# Start Ollama in the background
echo "Starting Ollama..."
ollama serve &
OLLAMA_PID=$!

# Wait for Ollama to start
echo "Waiting for Ollama to start..."
until ollama -v >/dev/null 2>&1; do
  sleep 1
done
echo "Ollama started."

# Pull deepseek-r1 model with 1.5 billion parameters
echo "Pulling deepseek-r1..."
ollama pull deepseek-r1:1.5b

echo "Pulled deepseek-r1:1.5b"

# Wait for Ollama process to finish
wait $OLLAMA_PID
