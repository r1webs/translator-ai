
  # Language AI assistant 📝  
  An AI assistant to translate text to any language.
  Integrated with Lllama 3.1 LLM by Ollama.
  Please note that, Llama 3.1 supports now English, French, German, Spanish, Portuguese, Italian, Hindi and Thai.
  
  ## Get Started 🚀

  ### Run with Docker (recommended)
  - Install [Docker Desktop](https://www.docker.com/products/docker-desktop/)
  - Copy the env files:
    ```bash
    cp .env.example .env
    cp translator-services/.env.development translator-services/.env
    ```
  - Start all services:
    ```bash
    docker compose up --build
    ```
  - First run will take a few minutes — the model (~4.7GB) is downloaded automatically.
  - Launch http://localhost:3000/translator

  ### Run locally
  - Install the Ollama application to run llama 3 LLM locally.
  - Install the latest NodeJS
  - Copy the env file:
    ```bash
    cp translator-services/.env.development translator-services/.env
    ```
  - cd translator-services && npm run start
  - cd translator-web-app && npm run dev
  - Launch http://localhost:5173/translator
  - To use LangSmith logs console, Get the langchain API key and set
    export LANGCHAIN_TRACING_V2="true"
    export LANGCHAIN_API_KEY="<API_KEY>"

  ## Model management
  To change the model, update `OLLAMA_MODEL` in your `.env` files:

  ```
  # translator-services/.env
  OLLAMA_MODEL=llama3:8b

  # .env (root, used by docker-compose)
  OLLAMA_MODEL=llama3:8b
  ```
  
  ## Ollama references 🔥  
  - https://github.com/ollama/ollama?tab=readme-ov-file
  - https://js.langchain.com/v0.1/docs/integrations/llms/ollama/
  - https://www.datacamp.com/tutorial/run-llama-3-locally
  - https://llama.meta.com/docs/integration-guides/langchain/

  
  ## Ollama curl example

    curl http://localhost:11434/api/generate -d '{
      "model": "llama3.1:latest",
      "prompt":"Why is the ocean blue?"
    }'

  