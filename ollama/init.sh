#!/bin/bash

# Check if MODEL_NAME environment variable is set, if not, set a default value
MODEL=${MODEL_NAME:-"gemma3:1b"}

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

# Pull the model
echo "Pulling..."
ollama pull $MODEL
echo "Pulled $MODEL."

# Wait for Ollama process to finish
wait $OLLAMA_PID
