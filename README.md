# CareGuide AI — V1 starter

CareGuide AI is a portfolio-grade, evidence-grounded knowledge assistant for approved healthcare and mental-health operational documents. V1 is an internal knowledge tool, not a diagnostic, therapy, or treatment system.

## V1 product goal

An authorized staff member can upload an approved document, ask a question about the knowledge base, and get an answer supported by verifiable source passages. The application must refuse to overstate answers when evidence is insufficient.

## Repository structure

```text
careguide-ai/
├── backend/           # Java + Spring Boot REST API
├── frontend/          # React + TypeScript UI
├── docs/              # Scope, architecture, API and data model
├── compose.yaml       # Local PostgreSQL + pgvector
└── .env.example
```

## Prerequisites

- Java 21+
- Maven 3.9+
- Node.js 22 LTS and npm
- Docker with Docker Compose

## Run locally

1. Copy `.env.example` to `.env` and change the local credentials if needed.
2. Start PostgreSQL with pgvector:

   ```bash
   docker compose up -d db
   ```

3. Start the API from `backend/`:

   ```bash
   mvn spring-boot:run
   ```

4. Start the frontend from `frontend/` in a second terminal:

   ```bash
   npm install
   npm run dev
   ```

5. Open the Vite URL printed in the terminal. The starter UI calls `GET /api/v1/health` through the Vite development proxy.

The first startup runs Flyway migrations. The API is available at `http://localhost:8080`; the health endpoint is `http://localhost:8080/api/v1/health`.

## Current implementation status

- [x] Spring Boot API skeleton and health endpoint
- [x] React + TypeScript starter screen and API health check
- [x] Local PostgreSQL + pgvector setup
- [x] Initial relational schema for organizations, memberships, knowledge bases, documents, chunks, conversations, sources and audit events
- [x] V1 scope, architecture, API contract and backlog documents
- [ ] Authentication and organization-scoped authorization
- [ ] Knowledge-base CRUD and secure document upload
- [ ] Document parsing and asynchronous ingestion
- [ ] Embeddings and retrieval
- [ ] Grounded answers with citations
- [ ] Evaluation, observability and deployment

## Safety and deployment note

This is an early development scaffold. It is **not ready for public deployment**: authentication and authorization are not implemented yet, and the upload/query endpoints do not exist. Do not put real patient/counselling data into it. Use synthetic or appropriately licensed public documents only.

## Engineering principle

Permissions must be enforced server-side before any document content is retrieved or sent to an LLM. Never rely on the frontend to enforce tenant isolation.
