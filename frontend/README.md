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

### Prerequisites
* Docker & Docker Compose
* Node.js (for the frontend)

### 1. Start the Backend Services
Initialize the AI services (n8n, Ollama, Qdrant):

```bash
docker-compose up -d