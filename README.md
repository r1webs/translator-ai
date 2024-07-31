
  # Language AI assistant 📝  
  An AI assistant to translate text to any language.
  Integrated with Lllama 3.1 LLM by Ollama.
  Please note that, Llama 3.1 supports now English, French, German, Spanish, Portuguese, Italian, Hindi and Thai.
  
  ## Get Started 🚀  
  - Install the Ollama application to run llama 3 LLM locally.
  - Install the latest NodeJS
  - cd translator-services && npm run start
  - cd translator-web-app && npm run dev
  - Launch http://localhost:5173/translator
  - To use LangSmith logs console, Get the langchain API key and set
    export LANGCHAIN_TRACING_V2="true"
    export LANGCHAIN_API_KEY="<API_KEY>"

  ## Model manangement
  In case if you wish to change the llama model version, look at translator-services/src/controller/translator.controller.js and update `model`

  ```
    const model = new Ollama({
      baseUrl: 'http://localhost:11434',
      model: 'llama3.1:latest',
      lc_serializable: true,
      temperature: 1,
    });
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

  