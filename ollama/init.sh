#!/bin/bash

# Check if the MODEL_NAME environment variable is set
if [ -z "$MODEL_NAME" ]; then
  echo "MODEL_NAME environment variable is not set. Please set it to the desired model name."
  exit 1
fi

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
ollama pull $MODEL_NAME
echo "Pulled $MODEL_NAME."

# Wait for Ollama process to finish
wait $OLLAMA_PID
