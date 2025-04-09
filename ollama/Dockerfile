FROM ollama/ollama:latest

ARG MODEL_NAME
ENV MODEL_NAME=${MODEL_NAME}

COPY ./init.sh /scripts/init.sh

# ENV OLLAMA_HOST=0.0.0.0:11434

ENTRYPOINT []

CMD ["/scripts/init.sh"]
