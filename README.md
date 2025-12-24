# 🧠 Local RAG & React Chatbot

> A privacy-focused, Dockerized Retrieval-Augmented Generation (RAG) system with a modern React frontend.

This project demonstrates a **Full Stack AI application** that allows users to upload PDF documents and interact with them using a local LLM. It leverages **n8n** for orchestration, **Ollama** for local inference, **Qdrant** for vector storage, and **React** for the user interface.

## 🏗️ Architecture

The system is built on a microservices architecture using Docker Compose:

* **Frontend:** React + Vite (Modern, responsive UI for chat and file uploads).
* **Orchestration:** n8n (Low-code workflow automation).
* **LLM Engine:** Ollama (Running `Qwen 2.5` for reasoning).
* **Vector Database:** Qdrant (storing embeddings via `nomic-embed-text`).
* **Communication:** Webhooks (REST API) between Frontend and Backend.

## ✨ Key Features

* **🔒 100% Local & Private:** No data leaves your machine. No OpenAI API keys required.
* **📄 PDF Ingestion:** Upload PDFs via the UI; the system automatically extracts text, chunks it, and vectorizes it.
* **💬 Context-Aware Chat:** Ask questions about your documents with accurate retrieval.
* **⚡ Modern Stack:** Dockerized environment for easy deployment and reproducibility.

## 🚀 Getting Started

Follow these steps to set up the project from scratch.

### Prerequisites
Before you begin, ensure you have the following installed:
* **Docker Desktop** (Make sure it's running)
* **Node.js** (v24.12 or higher)
* **Git**

### 1. Activation
Clone the repository and start the Docker containers:

```bash
git clone [https://github.com/YOUR_USERNAME/local-rag-chatbot.git](https://github.com/YOUR_USERNAME/local-rag-chatbot.git)
cd local-rag-chatbot
docker-compose up -d

# Download the LLM (Reasoning Model - approx. 4.7GB)
docker exec -it ollama ollama pull qwen2.5

# Download the Embedding Model (Vectorization)
docker exec -it ollama ollama pull nomic-embed-text

⚙️ n8n Configuration
n8n starts with an empty database. You need to load the project logic (workflows):

-Open your browser and navigate to http://localhost:5678.

-Set up the initial admin account (Standard n8n setup).

-On the workflow list, click "Add workflow" (top right) -> "Import from File".

-Select the JSON files located in the workflows/ folder of this project (chat_workflow.json and upload_workflow.json).

-ACTIVATE both workflows by toggling the switch at the top right to Green (Active).

#Start the Frontend
-cd frontend
-npm install
-npm run dev
Open your browser at http://localhost:5173. You are ready to go! 🚀

###🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.
